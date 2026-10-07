<script lang="ts">
	import { onMount } from 'svelte';
	import { Spring, prefersReducedMotion } from 'svelte/motion';
	import { beak, belly, body, box, eyes, pupils } from './penguin';

	type Block = { x: number; w: number; shade: number; turn?: number; label?: string };

	// bottom up, x is from the middle. The bottom row's just a block for the tiny one to sit next to
	const plan: { h: number; blocks: Block[] }[] = [
		{ h: 64, blocks: [{ x: -150, w: 80, shade: 0 }] },
		{ h: 34, blocks: [{ x: -150, w: 192, shade: 1, label: 'a library that library needed' }] },
		{ h: 46, blocks: [{ x: -118, w: 130, shade: 2, turn: -1.5, label: 'another library' }] },
		{ h: 40, blocks: [{ x: -136, w: 196, shade: 0, turn: 1, label: 'a library' }] },
		{ h: 58, blocks: [{ x: -118, w: 44, shade: 1, turn: 2 }, { x: 2, w: 50, shade: 2, turn: -1 }] },
		{ h: 44, blocks: [{ x: -128, w: 198, shade: 1, turn: -1, label: 'a framework' }] },
		{ h: 56, blocks: [{ x: -84, w: 120, shade: 0, turn: 1.5, label: 'your app' }] },
		{ h: 18, blocks: [{ x: -112, w: 164, shade: 2, turn: -2, label: 'a yaml file' }] },
		{ h: 70, blocks: [{ x: -132, w: 204, shade: 1, turn: 1, label: 'the internet' }] },
		{ h: 34, blocks: [{ x: -36, w: 70, shade: 2, label: 'the cloud' }] }
	];
	const uid = $props.id();
	const floor = 530;
	const most = 1.2;
	const tipping = 0.85;
	// past this 'e starts to sweat
	const sweat = 0.55;
	// the 'igher up a row, the further it swings, an' the top one slips an' slumps when you push too far
	const swing = { across: 30, turn: 4 };
	const slip = { across: 28, turn: 6, slump: 3 };
	// where 'e stands, 'ow big, an' 'ow much 'e leans against it
	const spot = 104;
	const size = 0.2;
	const brace = 3;
	const reach = 14;
	const rest = { x: -0.35, y: -0.75 };
	const down = { x: -0.9, y: 0.6 };
	const steps: Record<string, number> = { ArrowLeft: -0.4, ArrowRight: 0.4 };

	let top = floor;
	const rows = plan.map((row) => {
		const y = top - row.h;
		const lift = floor - top;
		top = y;
		return { ...row, y, lift, mid: row.blocks[0].x + row.blocks[0].w / 2 };
	});
	const height = floor - top;
	const last = rows.length - 1;

	const tilt = new Spring(0, { stiffness: 0.05, damping: 0.2 });
	const slide = new Spring(0, { stiffness: 0.08, damping: 0.3 });
	const look = new Spring(rest, { stiffness: 0.1, damping: 0.5 });
	let patting = $state(false);
	let fixing: ReturnType<typeof setTimeout>;
	let calming: ReturnType<typeof setTimeout>;

	function bend(row: (typeof rows)[number], i: number) {
		const k = row.lift / height;
		const nudge = i === last ? slide.current : 0;
		const x = tilt.current * swing.across * k * k + nudge * slip.across;
		const turn = tilt.current * swing.turn * k + nudge * slip.turn - (i === last ? slip.slump : 0);
		return `translate(${x} 0) rotate(${turn} ${row.mid} ${row.y + row.h})`;
	}

	function lean(amount: number) {
		const instant = prefersReducedMotion.current;
		tilt.set(Math.max(-most, Math.min(most, amount)), { instant });
		look.set(Math.abs(tilt.target) > 0.1 ? { x: tilt.target * 0.8, y: -1 } : rest, { instant });
		if (Math.abs(tilt.target) < tipping) return;
		slide.set(Math.sign(tilt.target), { instant });
		clearTimeout(fixing);
		fixing = setTimeout(fix, 1500);
	}

	// 'e sorts it 'imself, no one asked
	function fix() {
		slide.set(0, { instant: prefersReducedMotion.current });
		pat();
	}

	function pat() {
		if (prefersReducedMotion.current) return;
		patting = true;
		look.set(down);
	}

	function sway(event: PointerEvent & { currentTarget: HTMLElement }) {
		const box = event.currentTarget.getBoundingClientRect();
		lean(((event.clientX - box.left) / box.width - 0.5) * 2 * most);
	}

	function nudge(event: KeyboardEvent) {
		if (!steps[event.key]) return;
		event.preventDefault();
		lean(tilt.target + steps[event.key]);
		clearTimeout(calming);
		calming = setTimeout(() => lean(0), 900);
	}

	onMount(() => {
		const idle = setInterval(() => Math.abs(tilt.target) < 0.1 && pat(), 8000);
		return () => {
			clearInterval(idle);
			clearTimeout(fixing);
			clearTimeout(calming);
		};
	});
</script>

<div
	class="tower"
	role="slider"
	tabindex="0"
	aria-label="Wobble the tower"
	aria-describedby="{uid}-about"
	aria-valuemin={-most * 10}
	aria-valuemax={most * 10}
	aria-valuenow={Math.round(tilt.target * 10)}
	aria-valuetext={Math.abs(tilt.target) < 0.1 ? 'steady, for now' : 'wobbling'}
	onpointermove={sway}
	onpointerleave={() => lean(0)}
	onkeydown={nudge}
>
	<svg viewBox="-170 0 340 {floor}" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
		<desc id="{uid}-about">
			A tall, wobbly tower of software resting on one tiny block, which a penguin is looking after. Arrow keys wobble it.
		</desc>
		<g class="stack">
			{#each rows as row, i (i)}
				<g transform={bend(row, i)}>
					{#each row.blocks as block (block.x)}
						{@const middle = block.x + block.w / 2}
						<g transform="rotate({block.turn ?? 0} {middle} {row.y + row.h / 2})">
							<rect class="block shade-{block.shade}" x={block.x} y={row.y} width={block.w} height={row.h} />
							{#if block.label}
								<text class:small={row.h < 24} x={middle} y={row.y + row.h / 2}>{block.label}</text>
							{/if}
						</g>
					{/each}
				</g>
			{/each}

			<!-- the one 'olding it all up, on a folded bit o' paper -->
			<path class="paper" d="M14 530 L48 530 L47 523 L19 526.5 Z M14 530 L17 524.5 L21 527" />
			<rect class="tiny" x="26" y="466" width="16" height="57" />
			<path class="string" d="M27 470 Q17 475 12 487" />
			<g transform="translate(-66 488) rotate(-6)">
				<rect class="paper" width="84" height="28" rx="3" />
				<circle class="hole" cx="78" cy="7" r="2" />
				<text class="tag" x="6" y="11">maintained by</text>
				<text class="tag" x="6" y="21">one penguin</text>
			</g>
		</g>

		<g transform="rotate({-tilt.current * brace} {spot} {floor}) translate({spot} {floor - box.h * size}) scale({size})">
			<path
				class="flipper"
				class:patting
				onanimationend={() => {
					patting = false;
					look.set(rest);
				}}
				d="M-105 180 C-190 195 -280 240 -335 282 C-342 290 -332 300 -318 298 C-250 290 -180 280 -112 268 Z"
			/>
			<path d={body} />
			<path class="white" d={belly} />
			<path class="beak" d={beak} />
			{#each eyes as d (d)}
				<path class="white" {d} />
			{/each}
			{#each pupils as { x, y, r } (x)}
				<circle cx={x + look.current.x * reach} cy={y + look.current.y * reach} {r} />
			{/each}
			{#if Math.abs(tilt.current) > sweat}
				<path class="drop" d="M150 10 C150 10 178 50 178 66 A28 28 0 0 1 122 66 C122 50 150 10 150 10 Z" />
			{/if}
		</g>
	</svg>
</div>

<style>
	.tower {
		container-type: inline-size;
		overflow: hidden;
		border-radius: var(--radius);
		background: var(--primary);
		touch-action: pan-y;
	}

	.tower:focus-visible {
		outline-color: var(--primary);
	}

	svg {
		display: block;
		width: 100%;
		aspect-ratio: var(--tower-ratio);
		fill: var(--primary-text);
	}

	.block {
		stroke: var(--primary);
		stroke-width: var(--tower-seam);
	}

	.shade-0 {
		fill: var(--bg);
	}

	.shade-1 {
		fill: var(--card);
	}

	.shade-2 {
		fill: var(--card-hover);
	}

	text {
		fill: var(--muted);
		font: var(--tower-label-weight) var(--tower-label-size) var(--font);
		text-anchor: middle;
		dominant-baseline: central;
	}

	.small {
		font-size: var(--tower-small-size);
	}

	.tag {
		fill: var(--primary-text);
		font-size: var(--tower-tag-size);
		font-weight: var(--button-weight);
		text-anchor: start;
	}

	.tiny {
		fill: var(--white);
		stroke: var(--primary-text);
		stroke-width: var(--tower-seam);
	}

	.paper,
	.string {
		fill: var(--white);
		stroke: var(--primary-text);
		stroke-width: var(--tower-line);
		stroke-linejoin: round;
	}

	.string {
		fill: none;
	}

	.hole {
		fill: var(--primary);
	}

	.white {
		fill: var(--white);
	}

	.beak,
	.drop {
		fill: var(--primary);
		stroke: var(--primary-text);
		stroke-width: var(--beak-outline);
		paint-order: stroke;
	}

	.drop {
		fill: var(--white);
	}

	.flipper {
		transform-box: fill-box;
		transform-origin: right center;
	}

	@container (width < 40rem) {
		svg {
			aspect-ratio: var(--tower-narrow-ratio);
		}
	}

	@media (prefers-reduced-motion: no-preference) {
		.stack {
			transform-box: view-box;
			transform-origin: var(--tower-foot);
			animation: breathe var(--tower-breathe) ease-in-out infinite alternate;
		}

		.patting {
			animation: pat var(--tower-pat) var(--ease);
		}

		.drop {
			animation: drip var(--tower-drip) ease-in infinite;
		}
	}

	@keyframes breathe {
		from {
			rotate: calc(var(--tower-breathe-tilt) * -1);
		}

		to {
			rotate: var(--tower-breathe-tilt);
		}
	}

	/* two little pats, like checkin' the tyres */
	@keyframes pat {
		20%,
		60% {
			rotate: var(--tower-pat-lift);
		}

		40%,
		80% {
			rotate: 0deg;
		}
	}

	@keyframes drip {
		to {
			translate: 0 var(--tower-drip-fall);
			opacity: 0;
		}
	}
</style>
