<script lang="ts">
	import { onMount } from 'svelte';
	import { Spring, prefersReducedMotion } from 'svelte/motion';
	import { site } from '$lib/config';
	import { beak, belly, body, box, eyes, lazy, pupils, toward } from './penguin';

	type Tag = 'ok' | 'warn' | 'retry';
	type Entry = [Tag, string];
	type Part = 'eye' | 'beak' | 'body' | 'belly' | '';
	type Point = { x: number; y: number };
	type Cell = Point & { part: Part; ch: string };
	type Run = { part: Part; text: string };

	const cols = 72;
	const reach = 14;
	const backlog = 14;
	const keep = 16;
	// 'ow far round the pointer the letters get restless, in characters
	const stir = 6;
	// 'ow wide 'is eye patches are, end to end
	const span = 126;
	const name = site.github.toLowerCase();
	const abc = 'abcdefghijklmnopqrstuvwxyz';
	const born = new Date('2026-09-18T08:02:00').getTime();
	// 'e 'ops when this one comes up
	const flight: Entry = ['warn', 'tried to fly. did not fly.'];
	const journal: Entry[] = [
		['ok', 'awake. it is cold. good.'],
		['ok', "fixed a typo in someone's README"],
		['ok', 'opened PR #212: handle empty input'],
		flight,
		['ok', 'reported a security issue, quietly'],
		['retry', 'tests failing. probably me. retrying (1/3)'],
		['ok', 'tests passing. it was me.'],
		['ok', 'fish break'],
		['warn', 'PR #212: changes requested. fair enough.'],
		['ok', 'PR #212: pushed the fixes'],
		['ok', "answered someone's question about their config"],
		['retry', 'CI timed out. retrying (2/3)'],
		['ok', 'wrote a test for the thing that broke'],
		['warn', 'fly: not supported on this hardware'],
		['ok', 'PR #212: merged. noot.'],
		['ok', 'bumped a dependency. nothing caught fire.'],
		['ok', 'closed a duplicate issue, politely'],
		['warn', 'looked at the sky for a bit'],
		['ok', 'back to it']
	];

	let ascii: HTMLDivElement;
	let ratio = $state(0.6);
	let lines = $state.raw<Run[][]>([]);
	let log = $state<{ id: number; time: string; tag: Tag; text: string }[]>([]);
	let now = $state(0);
	let hopping = $state(false);
	let cells: Cell[] = [];
	let heat = new Float32Array(0);
	let jit = new Int8Array(0);
	let rows = 0;
	let w = 0;
	let h = 0;
	let frame = 0;
	let raf = 0;
	const look = new Spring({ x: 0, y: 0 }, lazy);

	const uptime = $derived.by(() => {
		const s = Math.floor((now - born) / 1000);
		const pad = (n: number) => String(n).padStart(2, '0');
		return `${Math.floor(s / 86400)}d ${pad(Math.floor(s / 3600) % 24)}h ${pad(Math.floor(s / 60) % 60)}m ${pad(s % 60)}s`;
	});

	// nine spots spread over a character, so 'is edges come out proper smooth
	const samples = (x: number, y: number): Point[] =>
		Array.from({ length: 9 }, (_, i) => ({ x: x + ((i % 3) + 0.5) * (w / 3), y: y + (Math.floor(i / 3) + 0.5) * (h / 3) }));
	const count = (list: Part[], item: Part) => list.filter((x) => x === item).length;

	function trace() {
		const ctx = document.createElement('canvas').getContext('2d')!;
		const style = getComputedStyle(ascii);
		ctx.font = `100px ${style.fontFamily}`;
		ctx.lineWidth = parseFloat(style.getPropertyValue('--beak-outline'));
		ratio = ctx.measureText('n').width / 100;
		const [outline, white, bill, patches] = [body, belly, beak, eyes.join(' ')].map((d) => new Path2D(d));
		// the beak's outline counts as body, same as it's drawn
		const part = ({ x, y }: Point): Part => {
			if (ctx.isPointInPath(patches, x, y)) return 'eye';
			if (ctx.isPointInPath(bill, x, y)) return 'beak';
			if (ctx.isPointInStroke(bill, x, y)) return 'body';
			if (ctx.isPointInPath(white, x, y)) return 'belly';
			return ctx.isPointInPath(outline, x, y) ? 'body' : '';
		};

		w = box.w / cols;
		rows = Math.round(box.h / (w / ratio));
		h = box.h / rows;
		const spelt = { body: 0, belly: 0 };
		cells = Array.from({ length: cols * rows }, (_, i) => {
			const x = box.x + (i % cols) * w;
			const y = Math.floor(i / cols) * h;
			const hits = samples(x, y).map(part).filter(Boolean);
			const parts: Part[] = ['eye', 'beak', 'belly', 'body'];
			const most = parts.reduce<Part>((best, p) => (count(hits, p) > count(hits, best) ? p : best), '');
			return { x, y, part: most, ch: glyph(most, hits.length / 9, spelt) };
		});
		heat = new Float32Array(cells.length);
		jit = new Int8Array(cells.length);
	}

	// 'is dark bits spell out 'is name, the belly just says noot
	function glyph(part: Part, fill: number, spelt: { body: number; belly: number }) {
		if (!part) return ' ';
		if (part === 'eye') return fill < 0.3 ? 'o' : '@';
		if (fill < 0.5) return fill < 0.3 ? '.' : ':';
		if (part === 'body') return name[spelt.body++ % name.length];
		if (part === 'belly') return 'noot'[spelt.belly++ % 4];
		return 'V';
	}

	// letters shuffle to their next-door neighbours in the alphabet, anyfin' else stays put
	function shuffle(ch: string, by: number) {
		const i = abc.indexOf(ch.toLowerCase());
		if (!by || i < 0) return ch;
		const next = abc[(i + by + abc.length) % abc.length];
		return ch === ch.toLowerCase() ? next : next.toUpperCase();
	}

	function render() {
		const moved = pupils.map((p) => ({ ...p, x: p.x + look.current.x * reach, y: p.y + look.current.y * reach }));
		const inside = (s: Point) => moved.some((p) => Math.hypot(s.x - p.x, s.y - p.y) < p.r);
		const next: Run[][] = [];
		cells.forEach((cell, i) => {
			if (i % cols === 0) next.push([]);
			const line = next[next.length - 1];
			// 'ow much of a character the pupils are sat over
			const covered = cell.part === 'eye' ? samples(cell.x, cell.y).filter(inside).length / 9 : 0;
			const ch = covered > 0.45 ? ' ' : covered > 0.15 ? 'o' : shuffle(cell.ch, jit[i]);
			const part = cell.part === 'eye' ? 'belly' : cell.part;
			const last = line.at(-1);
			if (last?.part === part) last.text += ch;
			else line.push({ part, text: ch });
		});
		lines = next;
	}

	// keeps redrawin' while there's letters still restless or eyes still movin', then 'as a rest
	function tick() {
		frame++;
		let warm = false;
		heat.forEach((warmth, i) => {
			if (warmth < 0.05) {
				heat[i] = 0;
				jit[i] = 0;
				return;
			}
			warm = true;
			heat[i] *= 0.93;
			if (frame % 3 === 0) jit[i] = Math.random() < warmth ? Math.round(Math.random() * 4 - 2) : 0;
		});
		render();
		const moving = Math.abs(look.current.x - look.target.x) + Math.abs(look.current.y - look.target.y) > 0.001;
		raf = warm || moving ? requestAnimationFrame(tick) : 0;
	}

	function follow(event: PointerEvent) {
		if (!cells.length) return;
		const area = ascii.getBoundingClientRect();
		const x = event.clientX - area.x - area.width / 2;
		const y = event.clientY - area.y - (area.height * pupils[0].y) / box.h;
		look.set(toward(x, y, (area.width * span) / box.w), { instant: prefersReducedMotion.current });
		if (prefersReducedMotion.current) return render();
		stirUp(((event.clientX - area.x) / area.width) * cols, ((event.clientY - area.y) / area.height) * rows);
		if (!raf) raf = requestAnimationFrame(tick);
	}

	// anyfin' near the pointer gets a bit restless, then calms down again
	function stirUp(col: number, row: number) {
		if (col < -stir || row < -stir || col > cols + stir || row > rows + stir) return;
		cells.forEach((_, i) => {
			const d = Math.hypot((i % cols) + 0.5 - col, (Math.floor(i / cols) + 0.5 - row) / ratio) / stir;
			if (d < 1) heat[i] = Math.max(heat[i], 1 - d);
		});
	}

	function append([tag, text]: Entry, time: number, id: number) {
		log = [...log, { id, time: new Date(time).toTimeString().slice(0, 5), tag, text }].slice(-keep);
	}

	onMount(() => {
		trace();
		render();
		now = Date.now();
		journal.slice(0, backlog).forEach((entry, i) => append(entry, now - (backlog - i) * 4 * 60000, i));

		const ticker = setInterval(() => (now = Date.now()), 1000);
		if (prefersReducedMotion.current) return () => clearInterval(ticker);

		let id = backlog;
		let timer: ReturnType<typeof setTimeout>;
		const write = () => {
			timer = setTimeout(() => {
				const entry = journal[id % journal.length];
				append(entry, Date.now(), id++);
				if (entry === flight) hopping = true;
				write();
			}, 2500 + Math.random() * 2000);
		};
		write();

		return () => {
			clearInterval(ticker);
			clearTimeout(timer);
			cancelAnimationFrame(raf);
		};
	});
</script>

<svelte:window onpointermove={follow} />

<figure
	class="terminal"
	role="img"
	aria-label="Our penguin drawn in text characters, next to the live log of penguin.service, a process that is him going about his day"
>
	<header>
		<span>● penguin.service</span>
		<span>active (running), up {now ? uptime : ''}</span>
	</header>

	<div class="screen">
		<div class="ascii" bind:this={ascii} style:--cols={cols} style:--ratio={ratio}>
			<pre class:hopping onanimationend={() => (hopping = false)}>{#each lines as line, row (row)}{#each line as { part, text }, i (i)}<span class={part}>{text}</span>{/each}<br />{/each}</pre>
		</div>

		<div class="log">
			<ol>
				{#each log as { id, time, tag, text } (id)}
					<li><time>{time}</time><span class={tag}>[{tag}]</span><span>{text}</span></li>
				{/each}
			</ol>
			<span class="cursor"></span>
		</div>
	</div>
</figure>

<style>
	.terminal {
		container-type: inline-size;
		margin: 0;
		overflow: hidden;
		border-radius: var(--radius);
		background: var(--card);
		box-shadow: var(--panel-shadow);
		font: var(--term-size) / var(--term-leading) var(--mono);
	}

	header {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: 0 var(--gap);
		padding: var(--term-header-padding);
		background: var(--primary);
		color: var(--primary-text);
		font-weight: var(--button-weight);
	}

	.screen {
		display: grid;
		grid-template-columns: var(--term-columns);
		align-items: end;
		gap: var(--term-gap);
		padding: var(--term-padding);
	}

	.ascii {
		container-type: inline-size;
		align-self: center;
	}

	pre {
		margin: 0;
		font-size: calc(100cqi / (var(--cols) * var(--ratio)));
		line-height: 1;
		user-select: none;
	}

	.body {
		color: var(--term-body);
	}

	.belly,
	.beak {
		color: var(--white);
		font-weight: var(--term-bold);
	}

	.beak {
		color: var(--primary);
	}

	/* sized by the penguin, not by 'ow much 'e's been up to */
	.log {
		display: flex;
		flex-direction: column;
		justify-content: end;
		align-self: stretch;
		overflow: hidden;
		contain: size;
	}

	.log > * {
		flex-shrink: 0;
	}

	ol {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	li {
		display: grid;
		grid-template-columns: auto var(--term-tag-width) 1fr;
		gap: var(--term-tag-gap);
	}

	time,
	.ok {
		color: var(--term-dim);
	}

	.warn,
	.retry {
		color: var(--primary);
	}

	.cursor {
		width: var(--term-cursor-width);
		height: 1lh;
		background: var(--text);
	}

	@container (width < 36rem) {
		.screen {
			grid-template-columns: 1fr;
		}

		.log {
			height: calc(var(--term-log-lines) * 1lh);
			contain: none;
		}
	}

	@media (prefers-reduced-motion: no-preference) {
		.cursor {
			animation: blink var(--term-cursor-blink) steps(1) infinite;
		}

		.hopping {
			animation: hop var(--term-hop-duration) var(--bounce);
		}
	}

	@keyframes blink {
		50% {
			opacity: 0;
		}
	}

	/* gives it a go, gets about a line off the ground */
	@keyframes hop {
		40% {
			translate: 0 var(--term-hop);
		}
	}
</style>
