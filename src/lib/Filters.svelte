<script lang="ts">
	import { page } from '$app/state';
	import { pages } from '$lib/config';
	import type { Moment } from '$lib/content';
	import { icons, tally } from '$lib/Moments.svelte';
	import Chevron from '~icons/tabler/chevron-down';

	// the layout drops this in, so the dots come off the page
	const moments: Moment[] = $derived(page.data.moments);
	const kinds = Object.entries(pages.timeline.filters) as [Moment['kind'], string][];

	// a tap anywhere else puts it away
	const shut = `<script>{
		const filters = document.querySelector('.filters');
		addEventListener('pointerdown', ({ target }) => {
			if (!filters.contains(target)) filters.open = false;
		});
	}<\/script>`;
</script>

<details class="fold filters">
	<summary>Filter<Chevron aria-hidden="true" /></summary>
	<!-- a reload starts fresh, wiv everyfin' ticked -->
	<form autocomplete="off">
		{#each kinds as [kind, label] (kind)}
			{@const Icon = icons[kind]}
			<label>
				<input type="checkbox" name="kind" value={kind} checked />
				<Icon aria-hidden="true" />{label} ({tally(moments.filter((moment) => moment.kind === kind))})
			</label>
		{/each}
	</form>
</details>

{@html shut}

<style>
	details {
		position: relative;

		/* drops down over the timeline, so nuffin' shifts */
		&::details-content {
			position: absolute;
			top: calc(100% + var(--gap));
			right: 0;
			z-index: 1;
			width: max-content;
			border-radius: var(--radius);
			background: var(--card);
			box-shadow: var(--hero-shadow);
		}

		/* it's the script that does the filterin' */
		@media (scripting: none) {
			display: none;
		}
	}

	/* stays lit while anyfin's unticked, even shut */
	details:has(input:not(:checked)) summary {
		color: var(--primary);
	}

	form {
		display: grid;
		gap: var(--gap);
		padding: var(--gap);
	}

	/* unticked ones fade back a bit */
	label {
		display: flex;
		align-items: center;
		gap: var(--gap);
		padding: var(--button-padding);
		border-radius: var(--radius);
		color: var(--muted);
		font-size: var(--small-size);
		cursor: pointer;
		transition:
			background-color var(--hover-transition),
			color var(--hover-transition);

		&:hover {
			background: var(--card-hover);
		}

		&:has(:checked) {
			color: var(--text);
		}
	}

	input {
		width: var(--small-icon-size);
		height: var(--small-icon-size);
		margin: 0;
		accent-color: var(--primary);
		cursor: inherit;
	}
</style>
