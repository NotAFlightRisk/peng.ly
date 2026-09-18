<script lang="ts">
	import { Spring, prefersReducedMotion } from 'svelte/motion';
	import { site } from '$lib/config';

	let eyes: SVGGElement;
	let pointer: PointerEvent | undefined;
	let pressed = $state(false);
	// nice 'n' lazy, and the damping's matched so 'is eyes don't go all wobbly
	const look = new Spring({ x: 0, y: 0 }, { stiffness: 0.04, damping: 0.36 });

	function follow(event: PointerEvent) {
		pointer = event;
		const box = eyes.getBoundingClientRect();
		const x = event.clientX - box.x - box.width / 2;
		const y = event.clientY - box.y - box.height / 2;
		const angle = Math.atan2(y, x);
		const reach = Math.tanh(Math.hypot(x, y) / box.width);
		const target = { x: Math.cos(angle) * reach, y: Math.sin(angle) * reach };
		look.set(target, { instant: prefersReducedMotion.current });
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
	viewBox="-255 0 510 465"
	role="img"
	aria-label="{site.author}'s avatar, a cartoon penguin"
	class:pressed
	style:--look-x={look.current.x}
	style:--look-y={look.current.y}
>
	<path
		d="M0 0 C98 0 119 67 119 134 C119 238 127 259 227 375 C242 393 255 427 255 450 V465 H-255 V450 C-255 427 -242 393 -227 375 C-127 259 -119 238 -119 134 C-119 67 -98 0 0 0 Z"
	/>
	<path class="white" d="M-171 465 V405 A171 171 0 0 1 171 405 V465 Z" />
	<path
		class="beak"
		stroke-width="32"
		paint-order="stroke"
		d="M0 176 C55 176 98 184 98 197 C98 221 20 276 0 276 C-20 276 -98 221 -98 197 C-98 184 -55 176 0 176 Z"
	/>
	<g bind:this={eyes}>
		<path class="white" d="M-63 160 A37 49 0 1 1 -17 158 Z" />
		<path class="white" d="M17 158 A37 49 0 1 1 63 160 Z" />
		<circle class="pupil big" cx="-40" cy="128" />
		<circle class="pupil small" cx="40" cy="128" />
	</g>
</svg>

<style>
	svg {
		display: block;
		width: var(--avatar-size);
		height: auto;
		fill: var(--primary-text);
	}

	.white {
		fill: var(--white);
	}

	.beak {
		fill: var(--primary);
		stroke: var(--primary-text);
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
			animation: peek var(--peek-duration) var(--bounce) both;
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
</style>
