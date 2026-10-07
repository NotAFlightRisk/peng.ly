<script lang="ts">
	import { onMount } from 'svelte';
	import { Spring, prefersReducedMotion } from 'svelte/motion';
	import { site } from '$lib/config';
	import { beak, belly, body, eyes, gaze, lazy, lids, pupils, viewBox } from '$lib/visuals/penguin';

	// every 5 to 10 seconds 'e blinks, an' about one time in three 'e does one o' these instead
	const FACES = ['double', 'wink', 'beam', 'yawn', 'shake'];

	const uid = $props.id();
	let patches: SVGGElement;
	let pointer: PointerEvent | undefined;
	let pressed = $state(false);
	let nooting = $state(false);
	let tic = $state<string>();
	const look = new Spring({ x: 0, y: 0 }, lazy);

	function follow(event: PointerEvent) {
		pointer = event;
		look.set(gaze(event, patches.getBoundingClientRect()), { instant: prefersReducedMotion.current });
		pressed = event.buttons > 0;
	}

	onMount(() => {
		let timer: ReturnType<typeof setTimeout>;
		const later = () => {
			timer = setTimeout(() => {
				tic = Math.random() < 0.65 ? 'blink' : FACES[Math.floor(Math.random() * FACES.length)];
				later();
			}, 5000 + Math.random() * 5000);
		};
		later();
		return () => clearTimeout(timer);
	});
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
	class={tic}
	class:pressed
	class:nooting
	onpointerdown={() => (nooting = true)}
	style:--look-x={look.current.x}
	style:--look-y={look.current.y}
>
	<g class="body">
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
		<!-- every tic moves 'is lids, so they're the ones what say when it's done -->
		{#each lids as { socket, top, bottom }, i (socket)}
			<mask id="{uid}-eye{i}"><path class="socket" d={socket} /></mask>
			<g class:left={i === 0} mask="url(#{uid}-eye{i})" onanimationend={() => (tic = undefined)}>
				<rect class="lid" {...top} />
				<ellipse class="under" {...bottom} />
			</g>
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
		/* so 'is 'ead don't get chopped off when 'e stretches */
		overflow: visible;
		fill: var(--primary-text);
	}

	/* 'e leans an' stretches from where 'e sits */
	.body {
		transform-box: fill-box;
		transform-origin: bottom;
	}

	.white {
		fill: var(--white);
	}

	/* a pixel past the eye all round, so shut lids don't leave a white rim however small 'e is */
	.socket {
		fill: var(--white);
		stroke: var(--white);
		stroke-width: var(--lid-overlap);
		vector-effect: non-scaling-stroke;
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

		.blink .lid {
			animation: blink var(--tic-blink);
		}

		.double .lid {
			animation: blink var(--tic-blink) 2;
		}

		.wink .left .lid {
			animation: shut var(--tic-pose);
		}

		.wink .body {
			animation: tilt var(--tic-pose);
		}

		.wink .beak,
		.beam .beak {
			animation: noot var(--tic-pose);
		}

		.beam .under {
			animation: beam var(--tic-pose);
		}

		.beam .body {
			animation: stretch var(--tic-pose);
		}

		.yawn .lid {
			animation: drowse var(--tic-slow);
		}

		.yawn .beak {
			animation: yawn var(--tic-slow);
		}

		.yawn .body {
			animation: stretch var(--tic-slow);
		}

		.shake .lid {
			animation: shut var(--tic-quick);
		}

		.shake .body {
			animation: shake var(--tic-quick);
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

	@keyframes blink {
		40%,
		50% {
			translate: 0 var(--lid-shut);
		}
	}

	/* shuts 'em an' 'olds it a mo */
	@keyframes shut {
		15%,
		75% {
			translate: 0 var(--lid-shut);
		}
	}

	/* 'ead on one side, towards the eye 'e's winkin' */
	@keyframes tilt {
		15%,
		75% {
			rotate: calc(var(--tic-tilt) * -1);
		}
	}

	/* cheeks right up, so 'is eyes go all smiley */
	@keyframes beam {
		15%,
		75% {
			translate: 0 var(--tic-beam);
		}
	}

	@keyframes stretch {
		30%,
		65% {
			scale: var(--tic-stretch);
		}
	}

	/* eyes go 'eavy, shut for the big one, then droop a bit before 'e comes round */
	@keyframes drowse {
		20%,
		85% {
			translate: 0 var(--tic-drowsy);
		}

		35%,
		65% {
			translate: 0 var(--lid-shut);
		}
	}

	@keyframes yawn {
		35%,
		65% {
			scale: 1 var(--tic-yawn);
		}
	}

	/* shakes 'imself off like 'e's just got out the sea */
	@keyframes shake {
		15%,
		45% {
			rotate: calc(var(--tic-tilt) * -1);
		}

		30%,
		60% {
			rotate: var(--tic-tilt);
		}

		75% {
			rotate: 0deg;
		}
	}
</style>
