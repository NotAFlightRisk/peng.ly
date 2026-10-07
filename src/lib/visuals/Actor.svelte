<svelte:options namespace="svg" />

<script module lang="ts">
	// lid an' under close the eye from the top an' bottom (it's about 90 tall), tilt slants it, then pupil size an' beak drop
	const faces = {
		calm: { lid: 4, tilt: 0, under: 0, pupil: 1, beak: 1 },
		curious: { lid: 0, tilt: 0, under: 0, pupil: 1.18, beak: 1 },
		focus: { lid: 28, tilt: 11, under: 10, pupil: 0.9, beak: 1 },
		happy: { lid: 0, tilt: 0, under: 76, pupil: 1, beak: 1.18 },
		wow: { lid: 0, tilt: -6, under: 0, pupil: 1.35, beak: 1.32 },
		shock: { lid: 0, tilt: 0, under: 0, pupil: 0.55, beak: 1.3 },
		wince: { lid: 42, tilt: 18, under: 46, pupil: 1, beak: 1.08 },
		meh: { lid: 40, tilt: -2, under: 10, pupil: 1, beak: 1 },
		worried: { lid: 16, tilt: -18, under: 0, pupil: 1.08, beak: 1.06 },
		cross: { lid: 32, tilt: 24, under: 20, pupil: 0.85, beak: 1 }
	};
	export type Face = keyof typeof faces;
	const SHOULDER = { x: 100, y: 245 };
	// 'is flipper's TIP long, so whatever 'e's 'oldin' sits on the end of it
	const TIP = 285;
	const FLIPPER = `M-36 0 A36 36 0 0 1 36 0 C46 100 24 240 0 ${TIP} C-24 240 -46 100 -36 0 Z`;
	// where the tip of 'is throwin' flipper is 'alfway frough the fling, from the bottom middle of 'is bust
	export const GRIP = { x: 368, y: -318 };
	export type Act =
		| 'throw'
		| 'hurl'
		| 'cheer'
		| 'flap'
		| 'shrug'
		| 'wince'
		| 'jump'
		| 'gasp'
		| 'peer'
		| 'nod'
		| 'giggle'
		| 'huff'
		| 'hello';
</script>

<script lang="ts">
	import { onMount, type Snippet } from 'svelte';
	import { beak, belly, body, box, eyes, pupils } from './penguin';

	type Props = {
		face?: Face;
		act?: Act;
		// bump it to play the same act again from the top
		take?: number;
		look: { x: number; y: number };
		// whatever 'e's got in 'is throwin' flipper
		hand?: Snippet;
		onend?: () => void;
	};
	let { face = 'calm', act, take = 0, look, hand, onend }: Props = $props();

	const uid = $props.id();
	const REACH = 16;

	let blinking = $state(false);
	const f = $derived(faces[face]);

	// a body animation finishin' means the act's done, the flippers 'ave their own so they're ignored
	function ended(event: AnimationEvent) {
		if (event.target === event.currentTarget) onend?.();
	}

	onMount(() => {
		let timer: ReturnType<typeof setTimeout>;
		// blinks every few seconds, an' now an' then twice in a row
		const blink = () => {
			blinking = true;
			timer = setTimeout(blink, Math.random() < 0.2 ? 350 : 1800 + Math.random() * 4200);
		};
		timer = setTimeout(blink, 1500);
		return () => clearTimeout(timer);
	});
</script>

<g
	class="actor"
	style:--lid="{f.lid}px"
	style:--tilt="{f.tilt}deg"
	style:--under="{-f.under}px"
	style:--pupil={f.pupil}
	style:--beak={f.beak}
>
	<defs>
		<!-- a touch bigger than the eye, so a shut lid don't leave a white rim round it -->
		{#each eyes as d, i (d)}
			{@const { x } = pupils[i]}
			<clipPath id="{uid}-eye{i}">
				<path {d} transform="translate({x} 122) scale(1.08) translate({-x} -122)" />
			</clipPath>
		{/each}
	</defs>

	{#key take}
		<g class="body {act ?? ''}" onanimationend={ended}>
			<!-- 'e's only ever 'alf a penguin, drawn wiv the bottom of 'is bust on nought so it can be 'idden -->
			<g transform="translate(0 -{box.h})">
				<g transform="translate({SHOULDER.x} {SHOULDER.y})">
					<g class="flipper arm">
						<path class="rim" d={FLIPPER} />
						{#if hand}
							<g transform="translate(0 {TIP})">{@render hand()}</g>
						{/if}
					</g>
				</g>
				<g transform="translate({-SHOULDER.x} {SHOULDER.y}) scale(-1 1)">
					<path class="flipper rim" d={FLIPPER} />
				</g>
				<path class="rim" d={body} />
				<path class="white" d={belly} />
				<path class="beak" d={beak} />
				{#each eyes as d, i (d)}
					{@const { x, y, r } = pupils[i]}
					<g class:right={i === 1} clip-path="url(#{uid}-eye{i})">
						<path class="white" {d} />
						<circle class="pupil" cx={x + look.x * REACH} cy={y + look.y * REACH} {r} />
						<rect
							class="lid"
							class:blinking
							x={x - 60}
							y="-50"
							width="120"
							height="120"
							onanimationend={() => (blinking = false)}
						/>
						<ellipse class="under" cx={x} cy="212" rx="40" ry="49" />
					</g>
				{/each}
			</g>
		</g>
	{/key}
</g>

<style>
	.actor {
		fill: var(--primary-text);
	}

	/* a faint edge round 'is outline an' flippers, so 'e don't vanish on a dark background */
	.rim {
		stroke: var(--actor-rim);
		stroke-width: var(--actor-rim-width);
		paint-order: stroke;
	}

	.white {
		fill: var(--white);
	}

	.beak {
		fill: var(--primary);
		stroke: var(--primary-text);
		stroke-width: var(--beak-outline);
		paint-order: stroke;
		transform-box: fill-box;
		transform-origin: top;
		scale: 1 var(--beak);
	}

	.pupil {
		transform-box: fill-box;
		transform-origin: center;
		scale: var(--pupil);
	}

	.lid {
		transform-box: fill-box;
		transform-origin: bottom;
		translate: 0 var(--lid);
		rotate: var(--tilt);
	}

	.right .lid {
		rotate: calc(var(--tilt) * -1);
	}

	.under {
		translate: 0 var(--under);
	}

	/* tucked out o' sight unless an act's usin' 'em, uvverwise they poke out like a lumpy neck */
	.flipper {
		rotate: var(--actor-rest);
		visibility: hidden;
	}

	.throw .arm,
	.hurl .arm,
	.hello .arm,
	.cheer .flipper,
	.flap .flipper,
	.shrug .flipper,
	.wince .flipper,
	.jump .flipper,
	.huff .flipper {
		visibility: visible;
	}

	@media (prefers-reduced-motion: no-preference) {
		.beak,
		.pupil,
		.lid,
		.under {
			transition:
				scale var(--actor-face),
				translate var(--actor-face),
				rotate var(--actor-face);
		}

		.blinking {
			animation: blink var(--actor-blink) ease-in-out;
		}

		.throw {
			animation: lean var(--actor-throw) ease-in-out;
		}

		.throw .arm {
			animation: fling var(--actor-throw) ease-in-out;
		}

		.hurl {
			animation: heave var(--actor-throw) ease-in-out;
		}

		.hurl .arm {
			animation: fling var(--actor-throw) ease-in-out;
		}

		.cheer {
			animation: bounce var(--actor-slow) ease-in-out;
		}

		.cheer .flipper {
			animation: wave var(--actor-slow) ease-in-out;
		}

		.flap {
			animation: flutter var(--actor-slow) ease-in-out;
		}

		.flap .flipper {
			animation: flap calc(var(--actor-slow) / 5) ease-in-out 5;
		}

		.shrug {
			animation: hop var(--actor-quick) ease-in-out;
		}

		.shrug .flipper {
			animation: shrug var(--actor-quick) ease-in-out;
		}

		.wince {
			animation: flinch var(--actor-quick) ease-out;
		}

		.wince .flipper,
		.jump .flipper {
			animation: brace var(--actor-quick) ease-out;
		}

		.jump {
			animation: jump var(--actor-quick) ease-out;
		}

		.gasp {
			animation: gasp var(--actor-slow) ease-out;
		}

		.peer {
			animation: peer var(--actor-slow) ease-in-out;
		}

		.nod {
			animation: nod var(--actor-quick) ease-in-out;
		}

		.giggle {
			animation: giggle var(--actor-quick) linear;
		}

		.huff {
			animation: huff var(--actor-slow) ease-in-out;
		}

		.huff .flipper {
			animation: brace var(--actor-slow) ease-in-out;
		}

		.hello {
			animation: nod var(--actor-slow) ease-in-out;
		}

		.hello .arm {
			animation: hello var(--actor-slow) ease-in-out;
		}
	}

	@keyframes blink {
		50% {
			translate: 0 var(--actor-shut);
		}
	}

	/* reach back, 'old it, chuck it, settle down */
	@keyframes lean {
		30%,
		36% {
			rotate: calc(var(--actor-lean) * -0.6);
		}

		49% {
			rotate: var(--actor-lean);
		}
	}

	@keyframes fling {
		30%,
		36% {
			rotate: var(--actor-reach);
		}

		49% {
			rotate: var(--actor-fling);
		}
	}

	/* same again but puttin' 'is 'ole back into it, so 'e comes off the ground */
	@keyframes heave {
		30%,
		38% {
			rotate: calc(var(--actor-lean) * -1.2);
		}

		50% {
			rotate: calc(var(--actor-lean) * 1.6);
			translate: 0 var(--actor-hop);
		}

		70% {
			rotate: calc(var(--actor-lean) * 0.6);
		}
	}

	@keyframes bounce {
		20%,
		60% {
			translate: 0 var(--actor-hop);
		}

		40%,
		80% {
			translate: 0 0;
		}
	}

	@keyframes wave {
		15%,
		55%,
		85% {
			rotate: var(--actor-raise);
		}

		35%,
		70% {
			rotate: calc(var(--actor-raise) + var(--actor-flap) / 2);
		}
	}

	/* givin' it a go, it never works */
	@keyframes flutter {
		10%,
		30%,
		50%,
		70% {
			translate: 0 calc(var(--actor-hop) * 0.7);
			scale: var(--actor-stretch);
		}

		20%,
		40%,
		60%,
		80% {
			translate: 0 0;
			scale: 1;
		}

		90% {
			scale: var(--actor-squash);
		}
	}

	@keyframes flap {
		50% {
			rotate: calc(var(--actor-out) - var(--actor-flap));
		}
	}

	@keyframes hop {
		50% {
			translate: 0 calc(var(--actor-hop) * 0.6);
		}
	}

	@keyframes shrug {
		50% {
			rotate: var(--actor-out);
		}
	}

	@keyframes flinch {
		15%,
		55% {
			rotate: calc(var(--actor-lean) * -0.8);
			scale: var(--actor-squash);
		}
	}

	@keyframes brace {
		15%,
		60% {
			rotate: var(--actor-out);
		}
	}

	@keyframes jump {
		15% {
			scale: var(--actor-squash);
		}

		40% {
			translate: 0 var(--actor-jump);
			scale: var(--actor-stretch);
		}

		70% {
			translate: 0 0;
			scale: var(--actor-squash);
		}
	}

	/* rocks back an' stands up tall, like 'e can't believe it */
	@keyframes gasp {
		15%,
		70% {
			rotate: calc(var(--actor-lean) * -0.8);
			scale: var(--actor-stretch);
		}
	}

	/* leans over to see where it went */
	@keyframes peer {
		25%,
		75% {
			rotate: calc(var(--actor-lean) * 1.8);
		}
	}

	@keyframes nod {
		30% {
			scale: var(--actor-squash);
		}

		60% {
			scale: var(--actor-stretch);
		}
	}

	@keyframes giggle {
		12%,
		37%,
		62%,
		87% {
			rotate: calc(var(--actor-lean) * 0.5);
			translate: 0 calc(var(--actor-hop) * 0.2);
		}

		25%,
		50%,
		75% {
			rotate: calc(var(--actor-lean) * -0.5);
			translate: 0 0;
		}
	}

	/* one flipper up an' a little wave, like 'e's seen you across the road */
	@keyframes hello {
		20%,
		80% {
			rotate: var(--actor-raise);
		}

		35%,
		65% {
			rotate: calc(var(--actor-raise) + var(--actor-flap) / 2);
		}

		50% {
			rotate: var(--actor-raise);
		}
	}

	/* puffs 'imself up an' leans back, arms out, proper put out */
	@keyframes huff {
		20%,
		80% {
			rotate: calc(var(--actor-lean) * -0.8);
			scale: var(--actor-stretch);
		}
	}
</style>
