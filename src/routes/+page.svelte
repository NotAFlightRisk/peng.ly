<script lang="ts">
	import { site, panels } from '$lib/config';
	import { contributions, reports } from '$lib/content';
	import Penguin from '$lib/Penguin.svelte';
	import Panel from '$lib/Panel.svelte';
	import Contributions from '$lib/Contributions.svelte';
	import Reports from '$lib/Reports.svelte';
	import Projects from '$lib/Projects.svelte';
	import Posts from '$lib/Posts.svelte';

	// the front page only gets reports with a CVE number on 'em
	const featured = reports.filter(({ cve }) => cve);
</script>

<header>
	<h1>{site.name}</h1>
	<Penguin />
</header>

<main>
	<Panel {...panels.openSource}><Contributions {contributions} /></Panel>
	<Panel {...panels.security}><Reports reports={featured} /></Panel>
	<Panel {...panels.projects}><Projects /></Panel>
	<Panel {...panels.writing}><Posts /></Panel>
</main>

<style>
	header {
		display: flex;
		flex-wrap: wrap;
		align-items: end;
		align-content: end;
		justify-content: end;
		min-height: var(--hero-height);
		padding: 0 var(--gutter);
		overflow: hidden;
		background: var(--primary);
		color: var(--primary-text);
		box-shadow: var(--hero-shadow);
	}

	h1 {
		margin: 0 auto var(--title-gap) 0;
		font-size: var(--title-size);
		font-weight: var(--title-weight);
		line-height: var(--title-leading);
		letter-spacing: var(--title-tracking);
	}

	main {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, max(var(--panel-width), 40%)), 1fr));
		gap: var(--gutter);
		padding: var(--gutter);
	}

	@supports (animation-timeline: scroll()) {
		@media (prefers-reduced-motion: no-preference) {
			header {
				position: sticky;
				top: calc(var(--nav-height) - var(--hero-height));
				z-index: 1;
				animation: shrink linear both;
				animation-timeline: scroll();
				animation-range: 0 calc(var(--hero-height) - var(--nav-height));
			}
		}
	}

	@keyframes shrink {
		to {
			padding-inline: var(--nav-gutter);
			--title-size: var(--nav-title-size);
			--title-gap: var(--nav-title-gap);
			--avatar-size: var(--nav-avatar-size);
		}
	}
</style>
