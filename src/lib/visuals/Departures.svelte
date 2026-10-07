<script lang="ts">
	import { onMount } from 'svelte';
	import { Spring, prefersReducedMotion } from 'svelte/motion';
	import { page } from '$app/state';
	import Plane from '~icons/tabler/plane-departure-filled';
	import type { Contribution } from '$lib/content';
	import Actor, { type Act, type Face } from './Actor.svelte';
	import { box, lazy, pupils, toward } from './penguin';

	type Tile = { now: string; was: string; flips: number; queue: string[] };
	type Spot = { x: number; y: number };
	type Timer = ReturnType<typeof setTimeout>;

	const charset = ' ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789:-._()';
	const columns = [
		{ name: 'time', label: 'Merged', width: 6 },
		{ name: 'to', label: 'Destination', width: 14 },
		{ name: 'flight', label: 'Flight', width: 7 },
		{ name: 'remarks', label: 'Remarks', width: 9 }
	];
	// 'is PRs on the top rows, 'is own flight on the one under
	const OWN = 3;
	// a new one rolls on every PAGE, but every TURNth go it finks it's 'is turn instead
	const PAGE = 5000;
	const TURN = 3;
	const BOARDING = 2600;
	const LINGER = 1200;
	const FOCUS = 1800;
	const reactions = {
		hello: { face: 'happy', act: 'hello' },
		proud: { face: 'happy', act: 'nod' },
		boarding: { face: 'wow', act: 'flap' },
		poked: { face: 'shock', act: 'jump' },
		GROUNDED: { face: 'meh', act: 'shrug' },
		DELAYED: { face: 'worried', act: 'peer' },
		CANCELLED: { face: 'cross', act: 'huff' }
	} satisfies Record<string, { face: Face; act: Act }>;
	type Reaction = keyof typeof reactions;
	const excuses = ['GROUNDED', 'DELAYED', 'CANCELLED'] as const;
	// 'e stands SINK down be'ind the floor, wiv room round 'im to flap
	const SINK = 50;
	const VIEW = { x: -340, y: -520, w: 680, h: 520 };
	const EYES = (SINK - box.h + pupils[0].y - VIEW.y) / VIEW.h;

	// the PRs on the page, newest first
	const contributions: Contribution[] = page.data.contributions ?? [];
	const flights = contributions
		.flatMap(({ repo, threads }) => threads.map((pr) => ({ ...pr, to: repo.split('/')[1] })))
		.sort((a, b) => (b.merged ?? '').localeCompare(a.merged ?? ''));

	const clockTime = () => new Date().toTimeString().slice(0, 5);
	// UTC so the build an' the browser agree, it comes out like 03 OCT
	const date = (iso?: string) => (iso ? new Date(iso).toUTCString().slice(5, 11).toUpperCase() : '');
	const fit = (text: string, width: number) => text.toUpperCase().padEnd(width).slice(0, width);
	const tiles = (text: string, width: number) =>
		Array.from(fit(text, width), (now): Tile => ({ now, was: now, flips: 0, queue: [] }));

	let offset = 0;
	let remark: string = excuses[0];
	// what each row should say right now
	function texts() {
		const prs = flights.length ? Array.from({ length: OWN }, (_, r) => flights[(offset + r) % flights.length]) : [];
		const ours = prs.map(({ merged, to, number }) => [date(merged), to, `PR ${number}`, 'MERGED']);
		return [...ours, ['SOON', 'THE SKY', 'NOOT 01', remark]];
	}

	let root: HTMLElement;
	let display: HTMLElement;
	let svg: SVGSVGElement;
	const rows = $state<HTMLElement[]>([]);
	let board = $state(texts().map((row) => row.map((text, c) => tiles(text, columns[c].width))));
	let clock = $state(tiles('--:--', 5));
	let face = $state<Face>('calm');
	let act = $state<Act>();
	let take = $state(0);
	// startin' off gazin' up at the board, till you give 'im summat else to look at
	const look = new Spring({ x: -0.7, y: -0.5 }, lazy);
	let pointer: Spot | undefined;
	let subject: HTMLElement | undefined;
	let flip = 80;
	let flipping: ReturnType<typeof setInterval> | undefined;
	let mood: Timer;
	let focus: Timer;
	let excuse: Timer;

	// spins frough a few letters on the drum, after waitin' its turn ('' is a tick off)
	function send(tile: Tile, target: string, wait: number) {
		if (prefersReducedMotion.current) {
			tile.now = target;
			tile.was = target;
			return;
		}
		const end = charset.indexOf(target);
		const spin = 2 + Math.floor(Math.random() * 6);
		const drum = Array.from({ length: spin }, (_, i) => charset.at(end - spin + i) ?? ' ');
		tile.queue = [...Array(wait).fill(''), ...drum, target];
		flipping ??= setInterval(step, flip);
	}

	// only the letters that change get flipped, unless it's told to go again
	function write(column: Tile[], text: string, delay = 0, again = false) {
		const letters = fit(text, column.length);
		column.forEach((tile, i) => {
			if (again || letters[i] !== (tile.queue.at(-1) ?? tile.now)) send(tile, letters[i], delay + i);
		});
	}

	function flipRow(r: number, delay = 0, again = false) {
		board[r].forEach((column, c) => write(column, texts()[r][c], delay, again));
	}

	// it only ticks over while summat's still spinnin'
	function step() {
		let busy = false;
		for (const tile of [...clock, ...board.flat(2)]) {
			const next = tile.queue.shift();
			// settled, so the bottom 'alf catches up an' nuffin' peeks frough the seam
			if (next === undefined) {
				tile.was = tile.now;
				continue;
			}
			busy = true;
			if (!next) continue;
			tile.was = tile.now;
			tile.now = next;
			tile.flips++;
		}
		if (busy) return;
		clearInterval(flipping);
		flipping = undefined;
	}

	const centre = (el: Element) => {
		const r = el.getBoundingClientRect();
		return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
	};

	// whatever's just changed on the board, else you, else just the board
	function glance() {
		const spot = subject ? centre(subject) : (pointer ?? centre(display));
		const him = svg.getBoundingClientRect();
		const eyes = { x: him.x + him.width / 2, y: him.y + him.height * EYES };
		look.set(toward(spot.x - eyes.x, spot.y - eyes.y, him.width * 2), { instant: prefersReducedMotion.current });
	}

	function watch(r: number) {
		subject = rows[r];
		glance();
		clearTimeout(focus);
		focus = setTimeout(() => ((subject = undefined), glance()), FOCUS);
	}

	function follow(event: PointerEvent) {
		pointer = { x: event.clientX, y: event.clientY };
		glance();
	}

	function react(name: Reaction) {
		clearTimeout(mood);
		face = reactions[name].face;
		if (prefersReducedMotion.current) return calm();
		act = reactions[name].act;
		take++;
	}

	// 'is face 'angs about a bit after 'e's done
	function calm() {
		act = undefined;
		mood = setTimeout(() => (face = 'calm'), LINGER);
	}

	// the next one of 'is rolls on an' they all shuffle up
	function roll() {
		offset++;
		for (let r = 0; r < OWN; r++) flipRow(r, r * 3);
		watch(OWN - 1);
		if (Math.random() < 0.4) react('proud');
	}

	// 'e gets 'is 'opes up, then it's anuvver excuse
	function boarding() {
		remark = 'BOARDING';
		flipRow(OWN);
		watch(OWN);
		react('boarding');
		excuse = setTimeout(() => {
			const why = excuses[Math.floor(Math.random() * excuses.length)];
			remark = why;
			flipRow(OWN);
			watch(OWN);
			react(why);
		}, BOARDING);
	}

	onMount(() => {
		flip = parseFloat(getComputedStyle(root).getPropertyValue('--dep-flip'));
		let beat = 0;
		let greeted = false;
		let paging: Timer;
		const tick = () => write(clock, clockTime());
		const next = () => (++beat % TURN ? roll() : boarding());

		// it only gets on wiv it while you can see it, an' 'e waves the first time you turn up
		const seen = new IntersectionObserver(([{ isIntersecting }]) => {
			clearInterval(paging);
			if (!isIntersecting) return;
			paging = setInterval(next, PAGE);
			if (greeted) return;
			greeted = true;
			board.forEach((_, r) => flipRow(r, r * 3, true));
			react('hello');
		});
		seen.observe(root);
		tick();
		const ticking = setInterval(tick, 1000);
		return () => {
			seen.disconnect();
			[paging, ticking, flipping, mood, focus, excuse].forEach(clearTimeout);
		};
	});
</script>

<svelte:window onpointermove={follow} onpointerdown={follow} />

{#snippet flap(tile: Tile)}
	<span class="tile">
		<span class="top">{tile.now}</span>
		<span class="bottom">{tile.was}</span>
		{#key tile.flips}
			<span class="top fall">{tile.was}</span>
			<span class="bottom land">{tile.now}</span>
		{/key}
	</span>
{/snippet}

<figure
	class="departures"
	bind:this={root}
	role="img"
	aria-label="A departures board of his latest merged pull requests. His own flight, to the sky, never gets off the ground."
>
	<div class="hall">
		<div class="board" bind:this={display}>
			<div class="head">
				<span class="title"><Plane /> Departures</span>
				<span class="column">
					{#each clock as tile, i (i)}{@render flap(tile)}{/each}
				</span>
			</div>

			<div class="row labels">
				{#each columns as { name, label, width } (name)}
					<span class="column {name}" style:--width={width}>{label}</span>
				{/each}
			</div>

			{#each board as row, r (r)}
				<div class="row" class:own={r === OWN} bind:this={rows[r]}>
					{#each row as column, c (c)}
						<span class="column {columns[c].name}">
							{#each column as tile, i (i)}{@render flap(tile)}{/each}
						</span>
					{/each}
				</div>
			{/each}
		</div>

		<svg
			class="penguin"
			bind:this={svg}
			viewBox="{VIEW.x} {VIEW.y} {VIEW.w} {VIEW.h}"
			aria-hidden="true"
			onpointerdown={() => react('poked')}
		>
			<g transform="translate(0 {SINK})">
				<Actor {face} {act} {take} look={look.current} onend={calm} />
			</g>
		</svg>
	</div>
</figure>

<style>
	/* same quiet floor as the uvver pictures, so it reads as part o' the page */
	.departures {
		margin: 0;
		padding: 0 var(--gutter);
		border-bottom: var(--separator);
	}

	.hall {
		display: flex;
		align-items: end;
		gap: var(--dep-gap);
		max-width: calc(var(--page-width) - 2 * var(--gutter));
		margin-inline: auto;
	}

	.board {
		container-type: inline-size;
		flex: 0 1 var(--dep-width);
		margin-bottom: var(--dep-lift);
	}

	/* the width of one flap, so a full row fits wall to wall. Chars is the column widths added up */
	.head,
	.row {
		--chars: 36;
		--cols: 4;
		--tile: calc(
			(100cqi - (var(--cols) - 1) * var(--dep-col-gap) - (var(--chars) - var(--cols)) * var(--dep-tile-gap)) /
				var(--chars)
		);
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: var(--dep-row-gap);
	}

	.own {
		margin-top: var(--dep-own-gap);
		color: var(--primary);
	}

	.title {
		display: flex;
		align-items: center;
		gap: var(--dep-title-gap);
		color: var(--muted);
		font-size: calc(var(--tile) * var(--dep-title-scale));
		font-weight: var(--button-weight);
	}

	.column {
		display: flex;
		gap: var(--dep-tile-gap);
	}

	.labels .column {
		width: calc(var(--width) * var(--tile) + (var(--width) - 1) * var(--dep-tile-gap));
		color: var(--muted);
		font-size: calc(var(--tile) * var(--dep-label-scale));
		line-height: 1;
	}

	.tile {
		position: relative;
		width: var(--tile);
		height: calc(var(--tile) * var(--dep-tile-ratio));
		perspective: calc(var(--tile) * var(--dep-depth));
		font-size: calc(var(--tile) * var(--dep-char-scale));
		font-weight: var(--title-weight);
		line-height: 1;
	}

	/* each 'alf's the full flap wiv the uvver bit clipped off, so it swings on the middle */
	.top,
	.bottom {
		position: absolute;
		inset: 0;
		display: grid;
		place-items: center;
		border-radius: var(--radius);
		background: var(--card);
		white-space: pre;
		clip-path: inset(calc(50% + var(--dep-seam)) 0 0);
	}

	.top {
		background: var(--card-hover);
		clip-path: inset(0 0 calc(50% + var(--dep-seam)));
	}

	.fall,
	.land {
		visibility: hidden;
	}

	.penguin {
		flex-shrink: 0;
		width: var(--dep-penguin);
		cursor: pointer;
	}

	/* a skinny board only 'as room for where an' 'ow it went */
	@container (width < 30rem) {
		.head,
		.row {
			--chars: 23;
			--cols: 2;
		}

		.time,
		.flight {
			display: none;
		}
	}

	@media (prefers-reduced-motion: no-preference) {
		.fall,
		.land {
			visibility: visible;
		}

		.fall {
			animation: fall var(--dep-flip) ease-in both;
		}

		.land {
			animation: land var(--dep-flip) ease-out both;
		}
	}

	/* edge-on flaps still leave a sliver of letter on the 'inge, so they're 'idden there */
	@keyframes fall {
		50%,
		to {
			transform: rotateX(-90deg);
			visibility: hidden;
		}
	}

	@keyframes land {
		from,
		50% {
			transform: rotateX(90deg);
			visibility: hidden;
		}
	}
</style>
