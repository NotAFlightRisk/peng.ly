<script lang="ts">
	import { Spring, prefersReducedMotion } from 'svelte/motion';
	import { site } from '$lib/config';
	import { beak, belly, body, eyes, gaze, lazy, pupils } from './penguin';

	const uid = $props.id();
	const profile =
		'M15 0 C110 0 128 70 128 135 C128 238 135 262 228 372 C243 390 250 425 250 450 V465 H-235 V450 C-235 425 -225 395 -210 375 C-120 262 -108 236 -108 140 C-108 60 -80 0 15 0 Z';
	const marks = Array.from({ length: 20 }, (_, i) => i * 5);
	const grooves = Array.from({ length: 10 }, (_, i) => 378 + i * 9);
	const level = (cm: number) => 500 - cm * 5;

	let patches = $state<SVGGElement>();
	let shots = $state(0);
	let side = $state(false);
	let oops = $state(false);
	const look = new Spring({ x: 0, y: 0 }, lazy);

	function snap() {
		shots += 1;
		side = !side;
		// shots two an' five always catch 'im out, after that it's pot luck
		oops = shots === 2 || shots === 5 || (shots > 5 && Math.random() < 0.2);
	}

	function follow(event: PointerEvent) {
		if (!patches) return;
		look.set(gaze(event, patches.getBoundingClientRect()), { instant: prefersReducedMotion.current });
	}
</script>

<svelte:window onpointermove={follow} />

<!-- the 'ole photo's the button, so there's nuffin' extra to see but you can still tab to it -->
<button
	class="mugshot"
	onclick={snap}
	aria-label="Booking photo of a penguin against a height chart, holding a placard that says not a flight risk. Press to take another."
>
	<svg
		viewBox="0 0 800 500"
		preserveAspectRatio="xMidYMax slice"
		aria-hidden="true"
		style:--look-x={look.current.x}
		style:--look-y={look.current.y}
	>
		<defs>
			<clipPath id="{uid}-side"><path d={profile} /></clipPath>
		</defs>

		{#each marks as cm (cm)}
			<line class:bold={cm % 10 === 0} x2="800" y1={level(cm)} y2={level(cm)} />
			{#if cm % 10 === 0 && cm}
				<text x="160" y={level(cm) - 6}>{cm}</text>
			{/if}
		{/each}

		<g transform="translate(400 128) scale(0.8)">
			{#if !side}
				<path d={body} />
				<path class="white" d={belly} />
				<path class="beak" d={beak} />
				<g class:awake={!oops} bind:this={patches}>
					{#each eyes as d (d)}
						<path class="white" {d} />
					{/each}
					{#each pupils as { x, y, r } (x)}
						<circle class="pupil" cx={x} cy={y} {r} />
					{/each}
					{#if oops}
						<!-- caught 'im mid-blink, typical -->
						<path class="lid" d="M-74.4 140 A37 49 0 1 1 -5.6 140 Z" />
						<path class="lid" d="M5.6 140 A37 49 0 1 1 74.4 140 Z" />
					{/if}
				</g>
			{:else if oops}
				<!-- turned right round, all we've got is the back of 'is 'ead -->
				<path d={body} />
			{:else}
				<path class="beak" d="M40 172 C120 168 200 180 236 208 C200 228 120 240 40 238 Z" />
				<path d={profile} />
				<ellipse class="white" cx="185" cy="470" rx="150" ry="185" clip-path="url(#{uid}-side)" />
				<g class="awake" bind:this={patches}>
					<ellipse class="white" cx="62" cy="118" rx="30" ry="44" />
					<circle class="pupil" cx="72" cy="124" r="15.5" />
				</g>
			{/if}
		</g>

		<g class="placard">
			<rect class="frame" x="230" y="362" width="340" height="112" rx="4" />
			<rect class="felt" x="238" y="370" width="324" height="96" />
			{#each grooves as groove (groove)}
				<line class="groove" x1="238" x2="562" y1={groove} y2={groove} />
			{/each}
			<text x="252" y="390">{site.name}</text>
			<text x="548" y="390" text-anchor="end">0001</text>
			<text class="big" x="400" y="427" text-anchor="middle">Not a <tspan rotate="14">f</tspan>light risk</text>
			<text x="400" y="455" text-anchor="middle">Good deeds, acted alone</text>
			<path d="M220 378 C238 382 251 398 251 417 C251 432 240 438 232 431 C225 424 220 404 220 378 Z" />
			<path d="M580 378 C562 382 549 398 549 417 C549 432 560 438 568 431 C575 424 580 404 580 378 Z" />
		</g>
	</svg>

	{#key shots}
		{#if shots}
			<span class="flash"></span>
		{/if}
	{/key}
</button>

<style>
	.mugshot {
		container-type: inline-size;
		position: relative;
		display: block;
		width: 100%;
		padding: 0;
		overflow: hidden;
		border: 0;
		border-radius: var(--radius);
		background: none;
		box-shadow: var(--panel-shadow);
		cursor: pointer;
	}

	svg {
		display: block;
		width: 100%;
		height: auto;
		aspect-ratio: var(--mug-ratio);
		background: var(--mug-wall);
		fill: var(--primary-text);
		user-select: none;
	}

	line {
		stroke: var(--mug-rule);
		stroke-width: var(--mug-rule-width);
	}

	.bold {
		stroke: var(--mug-rule-bold);
		stroke-width: var(--mug-rule-bold-width);
	}

	text {
		font: var(--mug-label-weight) var(--mug-label-size) var(--font);
	}

	.white {
		fill: var(--white);
	}

	.beak {
		fill: var(--primary);
		stroke: var(--primary-text);
		stroke-width: var(--beak-outline);
		paint-order: stroke;
	}

	.lid {
		stroke: var(--primary-text);
		stroke-width: var(--mug-lid-overlap);
	}

	.pupil {
		translate: calc(var(--look-x) * var(--mug-gaze-reach)) calc(var(--look-y) * var(--mug-gaze-reach));
	}

	.placard {
		transform-box: fill-box;
		transform-origin: center;
		rotate: var(--mug-tilt);
	}

	.frame {
		fill: var(--primary);
	}

	.felt {
		fill: var(--mug-felt);
	}

	.groove {
		stroke: var(--mug-groove);
	}

	.placard text {
		fill: var(--white);
		font-weight: var(--mug-letter-weight);
		font-size: var(--mug-letter-small);
		letter-spacing: var(--mug-letter-spacing);
		text-transform: uppercase;
	}

	.placard .big {
		font-size: var(--mug-letter-big);
	}

	.flash {
		position: absolute;
		inset: 0;
		background: var(--white);
		opacity: 0;
		pointer-events: none;
	}

	/* a phone gets a squarer crop, still bang in the middle on 'im */
	@container (width < 32rem) {
		svg {
			aspect-ratio: var(--mug-narrow-ratio);
		}
	}

	@media (prefers-reduced-motion: no-preference) {
		.awake {
			transform-box: fill-box;
			transform-origin: center;
			animation: blink var(--mug-blink-every) infinite;
		}

		.flash {
			animation: flash var(--mug-flash-duration) var(--ease);
		}
	}

	@keyframes flash {
		from {
			opacity: var(--mug-flash);
		}
	}

	@keyframes blink {
		94%,
		100% {
			scale: 1;
		}

		97% {
			scale: 1 0.1;
		}
	}
</style>
