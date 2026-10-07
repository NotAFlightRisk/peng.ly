<script lang="ts">
	import { onMount } from 'svelte';
	import { Spring, prefersReducedMotion } from 'svelte/motion';
	import Plane from '~icons/tabler/plane-departure-filled';
	import { beak, belly, body, eyes, gaze, lazy, pupils } from './penguin';

	type Tile = { now: string; was: string; flips: number; queue: string[] };

	const charset = ' ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789:-()';
	const columns = [
		{ name: 'time', label: 'Time', width: 5 },
		{ name: 'to', label: 'Destination', width: 12 },
		{ name: 'flight', label: 'Flight', width: 7 },
		{ name: 'pilot', label: 'Pilot', width: 4 },
		{ name: 'remarks', label: 'Remarks', width: 9 }
	];
	// due's in minutes from now, so the board always matches the clock
	const flights = [
		{ due: -35, to: 'UPSTREAM', flight: 'PR 412', remarks: 'MERGED' },
		{ due: -20, to: 'THE DOCS', flight: 'PR 88', remarks: 'DEPARTED' },
		{ due: -5, to: 'A MAINTAINER', flight: 'PR 1046', remarks: 'IN REVIEW' },
		{ due: 10, to: 'MAIN', flight: 'PR 2540', remarks: 'DELAYED' },
		{ due: 15, to: 'MAIN (AGAIN)', flight: 'PR 2541', remarks: 'ON TIME' }
	];
	// 'is own flight's the last row, an' it never quite gets off
	const own = flights.length;
	const excuses = ['GROUNDED', 'CANCELLED'];
	const minute = 60 * 1000;

	const clockTime = (time = Date.now()) => new Date(time).toTimeString().slice(0, 5);

	// the times stay blank till it's in a browser, uvverwise you'd get the clock from whenever the site was built
	function rows(live = true) {
		const now = Math.floor(Date.now() / (5 * minute)) * 5 * minute;
		const at = (due: number) => (live ? clockTime(now + due * minute) : '--:--');
		const texts = flights.map(({ due, to, flight, remarks }) => [at(due), to, flight, 'AUTO', remarks]);
		return [...texts, ['SOON', 'THE SKY', 'NOOT 01', '', excuses[0]]];
	}

	const tiles = (text: string, width: number) =>
		Array.from(text.padEnd(width), (now): Tile => ({ now, was: now, flips: 0, queue: [] }));

	let root: HTMLElement;
	let patches: SVGGElement;
	let hopeful = $state(false);
	let board = $state(rows(false).map((row) => row.map((text, c) => tiles(text, columns[c].width))));
	let clock = $state(tiles('--:--', 5));
	// startin' off gazin' up at the board, till you give 'im summat else to look at
	const look = new Spring({ x: -0.4, y: -0.9 }, lazy);

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
	}

	function write(column: Tile[], text: string, delay = 0) {
		column.forEach((tile, i) => send(tile, text.padEnd(column.length)[i], delay + i));
	}

	function flipRow(r: number, delay = 0) {
		const row = board[r];
		if (row.flat().some((tile) => tile.queue.length)) return;
		const texts = rows()[r];
		// 'is own remark stays on whatever excuse it's got to
		if (r === own) texts[4] = row[4].map((tile) => tile.now).join('');
		row.forEach((column, c) => write(column, texts[c], delay));
	}

	function step() {
		for (const tile of [...clock, ...board.flat(2)]) {
			const next = tile.queue.shift();
			// settled, so the bottom 'alf catches up an' nuffin' peeks frough the seam
			if (next === undefined) tile.was = tile.now;
			if (!next) continue;
			tile.was = tile.now;
			tile.now = next;
			tile.flips++;
		}
	}

	function follow(event: PointerEvent) {
		look.set(gaze(event, patches.getBoundingClientRect()), { instant: prefersReducedMotion.current });
	}

	onMount(() => {
		const flip = parseFloat(getComputedStyle(root).getPropertyValue('--dep-flip'));
		let shown = '';
		let tries = 0;
		let revert: ReturnType<typeof setTimeout>;
		const tick = () => {
			if (clockTime() === shown) return;
			shown = clockTime();
			write(clock, shown);
		};

		board.forEach((_, r) => flipRow(r, r * 2));
		tick();
		const timers = [
			setInterval(step, flip),
			setInterval(tick, 1000),
			// every so often 'e finks it's 'is turn, then it ain't
			setInterval(() => {
				hopeful = true;
				write(board[own][4], 'BOARDING');
				revert = setTimeout(() => {
					hopeful = false;
					write(board[own][4], excuses[++tries % excuses.length]);
				}, 2600);
			}, 9000)
		];
		return () => [...timers, revert].forEach(clearTimeout);
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
	aria-label="A departures board. His pull requests leave for upstream on time, but his own flight, to the sky, is grounded."
>
	<div class="board">
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
			<div class="row" class:own={r === own} role="presentation" onpointerenter={() => flipRow(r)}>
				{#each row as column, c (c)}
					<span class="column {columns[c].name}">
						{#each column as tile, i (i)}{@render flap(tile)}{/each}
					</span>
				{/each}
			</div>
		{/each}
	</div>

	<svg class="floor" viewBox="-480 0 735 465" aria-hidden="true">
		<path class="handle" d="M-415 342 V324 H-355 V342" />
		<rect x="-475" y="339" width="180" height="126" rx="15" />
		<rect class="strap" x="-442" y="339" width="18" height="126" />
		<rect class="strap" x="-346" y="339" width="18" height="126" />
		<g class="penguin" class:hopeful>
			<path d={body} />
			<path class="white" d={belly} />
			<path class="beak" d={beak} />
			<g bind:this={patches} style:--look-x={look.current.x} style:--look-y={look.current.y}>
				{#each eyes as d (d)}<path class="white" {d} />{/each}
				{#each pupils as { x, y, r } (x)}<circle class="pupil" cx={x} cy={y} {r} />{/each}
			</g>
		</g>
	</svg>
</figure>

<style>
	.departures {
		display: grid;
		grid-template-columns: minmax(0, var(--dep-width)) auto;
		align-items: end;
		justify-content: center;
		gap: 0 var(--gutter);
		margin: 0;
		padding: 0 var(--gutter);
		background: var(--primary);
	}

	.board {
		container-type: inline-size;
		margin-block: var(--gutter);
		padding: var(--list-gap);
		border-radius: var(--radius);
		background: var(--bg);
	}

	/* the width of one flap, so a full row fits wall to wall. Chars is the column widths added up */
	.head,
	.row {
		--chars: 37;
		--cols: 5;
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
	}

	.title {
		display: flex;
		align-items: center;
		gap: var(--dep-title-gap);
		color: var(--text);
		font-size: calc(var(--tile) * var(--dep-title-scale));
		font-weight: var(--title-weight);
		line-height: var(--title-leading);
		letter-spacing: var(--title-tracking);
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
		color: var(--primary);
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

	.floor {
		width: var(--dep-floor);
		fill: var(--primary-text);
	}

	.handle {
		fill: none;
		stroke: var(--primary-text);
		stroke-width: var(--dep-handle);
	}

	.strap,
	.beak {
		fill: var(--primary);
	}

	.beak {
		stroke: var(--primary-text);
		stroke-width: var(--beak-outline);
		paint-order: stroke;
	}

	.white {
		fill: var(--white);
	}

	.penguin {
		transform-box: fill-box;
		transform-origin: bottom;
	}

	.pupil {
		translate: calc(var(--look-x) * var(--dep-gaze-reach)) calc(var(--look-y) * var(--dep-gaze-reach));
	}

	/* a skinny board only 'as room for where an' 'ow it went */
	@container (width < 40rem) {
		.head,
		.row {
			--chars: 21;
			--cols: 2;
		}

		.time,
		.flight,
		.pilot {
			display: none;
		}
	}

	/* not enough room beside the board, so 'e waits underneath it */
	@media (width < 62rem) {
		.departures {
			grid-template-columns: minmax(0, var(--dep-width));
		}

		.board {
			margin-bottom: var(--gap);
		}

		.floor {
			width: var(--dep-floor-narrow);
			justify-self: end;
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

		.penguin {
			transition: scale var(--dep-hope-out);
		}

		/* stands up a bit taller when 'e finks 'e's off, feet still firmly on the ground */
		.hopeful {
			scale: var(--dep-hope);
			transition: scale var(--dep-hope-in);
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
