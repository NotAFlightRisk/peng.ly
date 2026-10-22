<script lang="ts">
	import { pages } from '$lib/config';
	import type { Moment } from '$lib/content';
	import Dot from '$lib/Dot.svelte';
	import Moments from '$lib/Moments.svelte';
	import Panel from '$lib/Panel.svelte';
	import Egg from '~icons/tabler/egg-cracked';

	let { moments }: { moments: Moment[] } = $props();

	const month = new Intl.DateTimeFormat('en-GB', { month: 'long', year: 'numeric', timeZone: 'UTC' }).format;

	// each panel gets an id like october-2026, for the links to jump to
	const months = $derived(
		[...Map.groupBy(moments, ({ date }) => month(new Date(date)))].map(([title, dots]) => ({
			title,
			id: title.toLowerCase().replace(' ', '-'),
			dots
		}))
	);

	// the page ships no JS, so the bit that lights up the month you're lookin' at comes in the HTML
	const spy = `<script>{
		const links = [...document.querySelectorAll('.timeline nav a')];
		const watch = new IntersectionObserver((seen) => {
			for (const { isIntersecting, target } of seen) {
				if (isIntersecting) for (const link of links) link.ariaCurrent = link.hash === '#' + target.id ? 'true' : null;
			}
		}, { rootMargin: '-30% 0px -70%' });
		for (const link of links) watch.observe(document.querySelector(link.hash));
	}<\/script>`;
</script>

<div class="timeline">
	<nav aria-label="Months">
		<ul>
			{#each months as { title, id } (id)}
				<li><a href="#{id}">{title}</a></li>
			{/each}
		</ul>
	</nav>

	<div class="months">
		{#each months as { title, id, dots } (id)}
			<Panel {id} {title}><Moments moments={dots} /></Panel>
		{/each}
		<p><Dot icon={Egg} />{pages.timeline.end}</p>
	</div>
</div>

{@html spy}

<style>
	/* a click on a month glides there, unless you'd rather it didn't */
	:global(html:has(.timeline)) {
		@media (prefers-reduced-motion: no-preference) {
			scroll-behavior: smooth;
		}
	}

	/* on big screens the months 'ang off to the left, so the panels stay put */
	.timeline {
		@media (width >= 80rem) {
			display: grid;
			grid-template-columns: var(--timeline-months) minmax(0, 1fr);
			gap: var(--gutter);
			margin-left: calc(-1 * (var(--timeline-months) + var(--gutter)));
		}
	}

	nav {
		display: none;

		@media (width >= 80rem) {
			position: sticky;
			top: calc(var(--nav-height) + var(--gutter));
			display: block;
			align-self: start;
			max-height: calc(100svh - var(--nav-height) - 2 * var(--gutter));
			overflow-y: auto;
		}

		a {
			display: block;
			padding: var(--button-padding);
			border-left: var(--timeline-line);
			color: var(--muted);
			font-size: var(--small-size);
			transition:
				color var(--hover-transition),
				border-color var(--hover-transition);

			&:hover {
				color: var(--primary);
				text-decoration: none;
			}

			/* lit up by the spy, for the month you're in */
			&:global([aria-current]) {
				border-color: var(--primary);
				color: var(--text);
			}

			/* ring goes on the inside, or the scrollin' would lop it off */
			&:focus-visible {
				outline-offset: calc(var(--outline-offset) * -1);
			}
		}
	}

	.months {
		display: grid;
		gap: var(--gutter);
	}

	/* lines its egg up wiv the dots above */
	p {
		display: flex;
		align-items: center;
		gap: var(--list-gap);
		margin: 0;
		padding-inline: var(--panel-padding);
		color: var(--muted);
		font-size: var(--small-size);
	}
</style>
