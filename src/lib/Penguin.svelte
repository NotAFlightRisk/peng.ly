<script lang="ts">
	import { Spring, prefersReducedMotion } from 'svelte/motion';
	import { site } from '$lib/config';
	import { beak, belly, body, eyes, gaze, lazy, pupils, viewBox } from '$lib/visuals/penguin';

	let patches: SVGGElement;
	let pointer: PointerEvent | undefined;
	let pressed = $state(false);
	let nooting = $state(false);
	const look = new Spring({ x: 0, y: 0 }, lazy);

	function follow(event: PointerEvent) {
		pointer = event;
		look.set(gaze(event, patches.getBoundingClientRect()), { instant: prefersReducedMotion.current });
		pressed = event.buttons > 0;
	}
</script>

<svelte:window
	onpointermove={follow}
	onpointerdown={follow}
	onpointerup={follow}
	onpointercancel={follow}
	onscroll={() => pointer && follow(pointer)}
/>

<svg
	{viewBox}
	role="img"
	aria-label="{site.author}'s avatar, a cartoon penguin"
	class:pressed
	class:nooting
	onpointerdown={() => (nooting = true)}
	style:--look-x={look.current.x}
	style:--look-y={look.current.y}
>
	<path d={body} />
	<path class="white" d={belly} />
	<path class="beak" onanimationend={() => (nooting = false)} d={beak} />
	<g bind:this={patches}>
		<path class="white" d={eyes[0]} />
		<path class="white" d={eyes[1]} />
		<!-- the sizes come from the css, so pressin' can swap 'em over -->
		{#each pupils as { x, y }, i (x)}
			<circle class="pupil {i ? 'small' : 'big'}" cx={x} cy={y} />
		{/each}
	</g>
</svg>

<style>
	svg {
		display: block;
		width: var(--avatar-size);
		height: auto;
		/* sat a touch low so his flat bottom never lifts off the header */
		translate: 0 var(--peek-sink);
		fill: var(--primary-text);
	}

	.white {
		fill: var(--white);
	}

	.beak {
		transform-box: fill-box;
		/* hinged where it meets 'is face, so only the tip drops */
		transform-origin: top;
		fill: var(--primary);
		stroke: var(--primary-text);
		stroke-width: var(--beak-outline);
		paint-order: stroke;
	}

	.pupil {
		translate: calc(var(--look-x) * var(--gaze-reach)) calc(var(--look-y) * var(--gaze-reach));
	}

	.big,
	.pressed .small {
		r: var(--pupil-big);
	}

	.small,
	.pressed .big {
		r: var(--pupil-small);
	}

	@media (prefers-reduced-motion: no-preference) {
		svg {
			animation: peek var(--peek-duration) var(--peek-ease) both;
		}

		.nooting .beak {
			animation: noot var(--noot-duration) var(--bounce);
		}

		.pupil {
			transition: r var(--swap-back-duration) ease-in-out;
		}

		.pressed .pupil {
			transition: r var(--swap-duration) var(--bounce);
		}
	}

	@keyframes peek {
		from {
			translate: 0 100%;
		}
	}

	@keyframes noot {
		50% {
			scale: 1 var(--noot-open);
		}
	}
</style>
