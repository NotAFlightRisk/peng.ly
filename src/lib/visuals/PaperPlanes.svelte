<script lang="ts">
	import { onMount } from 'svelte';
	import { Spring, prefersReducedMotion } from 'svelte/motion';
	import Actor, { GRIP, type Act, type Face } from './Actor.svelte';
	import { bonk, glide, TRIM, type Box, type Plane, type Point } from './flight';
	import { box, pupils, toward } from './penguin';

	type Timer = ReturnType<typeof setTimeout>;
	type Pointing = PointerEvent & { currentTarget: SVGSVGElement };

	const uid = $props.id();
	// all in the drawin's own units, it's always H tall an' as wide as the band. The bottom edge is 'is table
	const H = 290;
	const X = 150;
	const SIZE = 0.48;
	// 'e stands this far down be'ind the table, so 'oppin' about never shows where 'e's cut off
	const BASE = H + 50;
	const EYES = BASE - (box.h - pupils[0].y) * SIZE;
	// where 'e lets go
	const HAND = { x: X + GRIP.x * SIZE, y: BASE + GRIP.y * SIZE };
	// just before the fling peaks, about 'alfway frough --actor-throw
	const RELEASE = 380;
	const DUD = 0.25;
	const FIRST = 1800;
	const PATIENCE = [5000, 9000];
	const DREAMS = [2500, 6000];
	const GREETED = 30000;
	const SUBSTEPS = 4;
	// the bits o' page a plane can clatter into once it's out, padded by 'alf a plane
	const SOLID = 'header, button, .button';
	const PAD = 20;
	// gone once they're too 'igh to see, same as --planes-ceiling
	const CEILING = -4 * H;
	const PILE = 8;
	// as far along the table as 'e can reach, an' where a scrunched one sits on it
	const NEARBY = X + 450;
	const TABLE = H - 13;
	// 'ow 'e takes fings: 'is face, what 'is body does, an' whether it trumps what 'e's already at
	const REACTIONS = {
		throw: { face: 'focus', act: 'throw', rank: 9 },
		hurl: { face: 'focus', act: 'hurl', rank: 9 },
		bonk: { face: 'wince', act: 'wince', rank: 7 },
		loop: { face: 'wow', act: 'gasp', rank: 6 },
		follow: { face: 'focus', act: 'flap', rank: 5 },
		cheer: { face: 'happy', act: 'cheer', rank: 4 },
		drop: { face: 'worried', act: 'peer', rank: 3 },
		dud: { face: 'meh', act: 'shrug', rank: 3 },
		hello: { face: 'happy', act: 'hello', rank: 2 },
		proud: { face: 'happy', act: 'nod', rank: 1 }
	} satisfies Record<string, { face: Face; act: Act; rank: number }>;
	type Reaction = keyof typeof REACTIONS;

	let svg: SVGSVGElement;
	let width = $state(0);
	let height = $state(0);
	let throws = 0;
	let take = $state(0);
	let doing = $state<Reaction>();
	let near = $state(false);
	let held = $state(false);
	let flying = $state<Plane[]>([]);
	let pile = $state<(Point & { spin: number })[]>([]);
	let placed = $state<Point[]>([]);
	let aim: Point | undefined;
	let subject: Point | undefined;
	let queued: { target: Point; manual: boolean } | undefined;
	let pointer: Point | undefined;
	let wander: Point | undefined;
	let seen = false;
	let greeted = -Infinity;
	let frame = 0;
	let last = 0;
	let idle: Timer;
	let release: Timer;
	let dream: Timer;

	// before it's been measured it's drawn extra wide, an' the right just gets cropped off
	const w = $derived(height ? (H * width) / height : 2400);
	const face = $derived<Face>(doing ? REACTIONS[doing].face : near ? 'curious' : 'calm');
	const throwing = $derived(doing === 'throw' || doing === 'hurl');
	const look = new Spring({ x: 0, y: 0 }, { stiffness: 0.08, damping: 0.4 });

	const random = (min: number, max: number) => min + Math.random() * (max - min);
	const clamp = (n: number, min: number, max: number) => Math.min(Math.max(n, min), max);
	const somewhere = () => ({ x: random(X + 250, w - 80), y: random(H * 0.1, H * 0.5) });
	// lands on the table if it comes down by 'im, anywhere else it just drops out o' sight be'ind it
	const grounded = (p: Plane) => p.x < NEARBY && p.y > H - 10;
	const lost = (p: Plane) => p.x < -60 || p.x > w + 60 || p.y > H + 40 || p.y < CEILING || p.age > 20;
	const onHim = (at: Point) => Math.abs(at.x - X) < (box.w / 2) * SIZE && at.y > BASE - box.h * SIZE;

	// 'e only does summat if it matters more than what 'e's already doin'
	function react(name: Reaction, about?: Point) {
		if (prefersReducedMotion.current) return;
		if (doing && REACTIONS[doing].rank > REACTIONS[name].rank) return;
		doing = name;
		subject = about;
		take++;
		glance();
	}

	function done() {
		const was = doing;
		doing = undefined;
		subject = undefined;
		if (was === 'throw' || was === 'hurl') finish();
		glance();
	}

	// true the first time summat 'appens to a plane, so 'e only makes a fuss the once
	function once(p: Plane, what: string) {
		if (p.seen.includes(what)) return false;
		p.seen.push(what);
		return true;
	}

	// 'ow 'ard an' which way. You chuck 'em 'arder than 'e does, an' 'arder still the further off you aim
	function thrust(target: Point, manual: boolean, dud: boolean) {
		if (dud) return { heading: 0.7, power: random(0.4, 0.62) };
		const dx = target.x - HAND.x;
		const dy = HAND.y - target.y;
		const angle = Math.atan2(dy, dx);
		if (manual) return { heading: clamp(angle, -0.4, 1.3), power: 2.4 + 2.4 * Math.min(Math.hypot(dx, dy) / (1.5 * H), 1) };
		return { heading: clamp(angle, -0.1, 0.35), power: random(1.1, 1.4) };
	}

	// where the page's bits are right now, in the drawin's units
	function solids(): Box[] {
		const band = svg.getBoundingClientRect();
		const k = H / band.height;
		return [...document.querySelectorAll(SOLID)].map((el) => {
			const r = el.getBoundingClientRect();
			return {
				left: (r.left - band.left) * k - PAD,
				right: (r.right - band.left) * k + PAD,
				top: (r.top - band.top) * k - PAD,
				bottom: (r.bottom - band.top) * k + PAD
			};
		});
	}

	function step(p: Plane, dt: number, boxes: Box[]) {
		const was = { x: p.x, y: p.y };
		glide(p, dt);
		// the ones 'e chucks on 'is own stay in the band, so they only bump into what's in it
		for (const b of boxes) if ((p.free || b.top > 0) && bonk(p, was, b)) react('bonk', p);
	}

	// the big moments in a flight, so 'e can make a fuss of 'em
	function notice(p: Plane) {
		if (Math.abs(p.heading - p.start) > 5.5 && once(p, 'loop')) react('loop', p);
		if (p.y < -H && once(p, 'high')) react(Math.random() < 0.6 ? 'follow' : 'cheer', p);
		if (p.y < 0 && once(p, 'out')) react('cheer', p);
	}

	// dropped be'ind the table where 'e can still see, or sailed off out the side all on its own
	function gone(p: Plane) {
		if (p.y > H && p.x < X + 700) react('drop', { x: p.x, y: H });
		else if (p.x > w && !p.free && Math.random() < 0.5) react('proud');
	}

	function tick(at: number) {
		const dt = Math.min((at - last) / 1000, 1 / 30) / SUBSTEPS;
		last = at;
		const boxes = solids();
		for (const p of flying) {
			for (let i = 0; i < SUBSTEPS; i++) step(p, dt, boxes);
			notice(p);
			if (grounded(p)) crumple(p);
			else if (lost(p)) gone(p);
		}
		flying = flying.filter((p) => !grounded(p) && !lost(p));
		glance();
		frame = flying.length ? requestAnimationFrame(tick) : 0;
	}

	// comes down on the table an' scrunches up, on top of any that's already there
	function crumple(p: Plane) {
		const x = clamp(p.x, X + 150, NEARBY - 10);
		const under = pile.filter((c) => Math.abs(c.x - x) < 24).length;
		if (pile.length < PILE) pile.push({ x, y: TABLE - under * 16, spin: random(0, 360) });
		react('dud', { x, y: H });
	}

	function launch(target: Point, manual: boolean, dud: boolean) {
		held = false;
		aim = undefined;
		const { heading, power } = thrust(target, manual, dud);
		const plane = { ...HAND, id: throws, speed: TRIM * power, heading, start: heading, trim: random(0.8, 1.2) };
		flying.push({ ...plane, spin: 0, stun: 0, age: 0, free: manual, dud, seen: [] });
		if (frame) return;
		last = performance.now();
		frame = requestAnimationFrame(tick);
	}

	// what 'e's lookin' at, most important first
	function glance() {
		const spot = aim ?? subject ?? flying.at(-1) ?? pointer ?? wander ?? { x: X, y: EYES };
		look.set(toward(spot.x - X, spot.y - EYES, 200), { instant: prefersReducedMotion.current });
	}

	function begin(target: Point, manual = false) {
		clearTimeout(idle);
		if (prefersReducedMotion.current) {
			placed = [...placed, target].slice(-2);
			return;
		}
		if (throwing) {
			queued = { target, manual };
			return;
		}
		const dud = throws++ > 0 && Math.random() < DUD;
		held = true;
		aim = target;
		// you get the full wind-up, 'e saves 'is energy
		react(manual ? 'hurl' : 'throw');
		release = setTimeout(() => launch(target, manual, dud), RELEASE);
	}

	function finish() {
		const next = queued;
		queued = undefined;
		if (next) begin(next.target, next.manual);
		else later();
	}

	// 'e gets on wiv it 'imself after a bit, but only while someone can see 'im
	function later(wait = random(PATIENCE[0], PATIENCE[1])) {
		clearTimeout(idle);
		if (seen && !prefersReducedMotion.current) idle = setTimeout(() => begin(somewhere()), wait);
	}

	// looks about a bit when there's nuffin' on: up at the sky, down at 'is pile, or right at you
	function daydream() {
		const spots = [{ x: X + 260, y: -40 }, pile.at(-1), { x: X, y: EYES }, { x: w * 0.7, y: H * 0.3 }];
		wander = spots[Math.floor(Math.random() * spots.length)];
		if (!frame) glance();
		dream = setTimeout(daydream, random(DREAMS[0], DREAMS[1]));
	}

	function point(event: Pointing): Point {
		const rect = event.currentTarget.getBoundingClientRect();
		return { x: ((event.clientX - rect.left) / rect.height) * H, y: ((event.clientY - rect.top) / rect.height) * H };
	}

	// 'e only chucks forwards, an' never straight into the table
	function aimAt({ x, y }: Point): Point {
		return { x: Math.max(x, X + 200), y: Math.min(y, H - 30) };
	}

	// clickin' 'im chucks one wherever 'e fancies, clickin' anywhere else aims it there
	function press(event: Pointing) {
		const at = point(event);
		begin(onHim(at) ? somewhere() : aimAt(at), true);
	}

	// waves when you turn up, but not every time you wander in an' out
	function arrive() {
		if (performance.now() - greeted < GREETED) return;
		greeted = performance.now();
		react('hello');
	}

	function hover(event?: Pointing) {
		pointer = event && point(event);
		near = !!pointer && Math.hypot(pointer.x - X, pointer.y - EYES) < 150;
		if (!frame) glance();
	}

	onMount(() => {
		const watching = new IntersectionObserver(([entry]) => {
			seen = entry.isIntersecting;
			later(FIRST);
		});
		watching.observe(svg);
		dream = setTimeout(daydream, DREAMS[0]);
		return () => {
			watching.disconnect();
			[idle, release, dream].forEach(clearTimeout);
			cancelAnimationFrame(frame);
		};
	});
</script>

{#snippet plane()}
	<path class="paper" d="M32 0 L-30 -16 L-12 2 Z" />
	<path class="paper" d="M32 0 L-12 2 L-26 14 Z" />
	<path class="note" d="M14 -2.5 L-12 -8.5 M8 -0.5 L-16 -4.5" />
{/snippet}

{#snippet inHand()}
	<g transform="rotate(70) scale(2.4)">{@render plane()}</g>
{/snippet}

{#snippet flight(p: Plane)}
	<g class="flying" transform="translate({p.x} {p.y}) rotate({(-(p.heading + p.spin) * 180) / Math.PI})">
		{@render plane()}
	</g>
{/snippet}

<div class="planes" bind:clientWidth={width} bind:clientHeight={height}>
	<svg
		bind:this={svg}
		viewBox="0 0 {w} {H}"
		preserveAspectRatio="xMinYMax slice"
		role="img"
		aria-label="A penguin peeking up from behind the footer, throwing paper planes. Most fly off, a few end up crumpled beside him."
		onpointerdown={press}
		onpointerenter={arrive}
		onpointermove={hover}
		onpointerleave={() => hover()}
	>
		<defs>
			<clipPath id="{uid}-band"><rect width={w} height={H} /></clipPath>
		</defs>

		{#each pile as { x, y, spin }, i (i)}
			<g transform="translate({x} {y}) rotate({spin})">
				<g class="squash">
					<path class="paper" d="M-15 -2 L-11 -10 L-4 -12 L1 -16 L8 -11 L14 -9 L15 -1 L13 7 L5 12 L-3 11 L-9 13 L-14 6 Z" />
					<path class="note" d="M-11 -10 L-2 -3 L1 -16 M-2 -3 L15 -1 M-2 -3 L-3 11 M-14 6 L-2 -3" />
				</g>
			</g>
		{/each}

		<g class="penguin" transform="translate({X} {BASE}) scale({SIZE})">
			<Actor
				{face}
				act={doing && REACTIONS[doing].act}
				{take}
				look={look.current}
				hand={held ? inHand : undefined}
				onend={done}
			/>
		</g>

		<!-- 'is own stay in the band, only the ones you chuck get out over the page -->
		<g clip-path="url(#{uid}-band)">
			{#each flying.filter((p) => !p.free) as p (p.id)}
				{@render flight(p)}
			{/each}
		</g>
		{#each flying.filter((p) => p.free) as p (p.id)}
			{@render flight(p)}
		{/each}

		{#if prefersReducedMotion.current}
			{#each placed as at, i (i)}
				<g transform="translate({at.x} {at.y}) rotate(-12) scale({1 - i * 0.3})">{@render plane()}</g>
			{/each}
		{/if}
	</svg>
</div>

<style>
	/* nice an' quiet so it don't shout over the form, wiv a line along the bottom for 'is table */
	.planes {
		height: var(--planes-height);
		border-bottom: var(--separator);
		background: var(--planes-sky);
	}

	svg {
		display: block;
		width: 100%;
		height: 100%;
		/* the sides an' bottom stay put, but the top's open so planes can get out over the page */
		overflow: visible;
		clip-path: inset(var(--planes-ceiling) 0 0);
		fill: var(--primary-text);
		cursor: crosshair;
		touch-action: manipulation;
		user-select: none;
	}

	.penguin {
		cursor: pointer;
	}

	/* so one sailin' over the form don't get in the way of it */
	.flying {
		pointer-events: none;
	}

	.paper,
	.note {
		fill: var(--white);
		stroke: var(--primary-text);
		stroke-width: var(--planes-line);
		stroke-linejoin: round;
		stroke-linecap: round;
	}

	.note {
		fill: none;
		opacity: var(--planes-fold);
	}

	.squash {
		transform-box: fill-box;
		transform-origin: bottom;
	}

	/* once 'e fits left o' the form, 'e chucks 'em over it, so the band takes up no space at all */
	@media (width >= 90rem) {
		/* positioned so it's drawn on top o' the form, but the form still gets the clicks, only 'e don't */
		.planes {
			position: relative;
			margin-top: calc(-1 * var(--planes-height));
			border: 0;
			background: none;
			pointer-events: none;
		}

		.penguin {
			pointer-events: auto;
		}
	}

	@media (prefers-reduced-motion: no-preference) {
		.squash {
			animation: squash var(--planes-land) var(--bounce);
		}
	}

	@keyframes squash {
		from {
			scale: var(--planes-squash);
		}
	}
</style>
