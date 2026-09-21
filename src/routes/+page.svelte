<script lang="ts">
	import { site, panels, pages } from '$lib/config';
	import { reports } from '$lib/content';
	import Penguin from '$lib/Penguin.svelte';
	import Panel from '$lib/Panel.svelte';
	import Contributions from '$lib/Contributions.svelte';
	import Reports from '$lib/Reports.svelte';
	import Projects from '$lib/Projects.svelte';
	import Posts from '$lib/Posts.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	// the front page only gets reports with a CVE number on 'em
	const featured = reports.filter(({ cve }) => cve);
</script>

<header>
	<nav aria-label="Pages">
		<ul>
			{#each Object.values(pages) as { title, href } (href)}
				<li><a class="button" {href}>{title}</a></li>
			{/each}
		</ul>
	</nav>

	<h1>{site.name}</h1>
	<Penguin />
</header>

<main>
	<Panel {...panels.openSource}><Contributions contributions={data.contributions} /></Panel>
	<Panel {...panels.security}><Reports reports={featured} /></Panel>
	<Panel {...panels.projects}><Projects /></Panel>
	<Panel {...panels.writing}><Posts /></Panel>
</main>
<img class="pingu" width="48" src="https://pixelflare.cc/iain/gif/penguin-dance.gif" alt="noot" />

<style>
	header {
		position: sticky;
		top: 0;
		z-index: 1;
		display: flex;
		flex-wrap: wrap;
		align-items: end;
		align-content: end;
		justify-content: end;
		min-height: var(--nav-height);
		padding: 0 var(--gutter);
		overflow: hidden;
		background: var(--primary);
		color: var(--primary-text);
		box-shadow: var(--hero-shadow);
		/* no scroll animation to be had? then it sits at the nav end of the shrink */
		animation: shrink 0s linear both;
	}

	nav {
		display: none;
		width: 100%;
		justify-content: end;
		padding-top: var(--gap);
	}

	ul {
		display: flex;
		flex-wrap: wrap;
		justify-content: end;
		gap: var(--gap);
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
		width: 100%;
		max-width: var(--panels-width);
		margin-inline: auto;
		gap: var(--gutter);
		padding: var(--gutter);
	}

	.pingu {
	  margin: 0 auto;
	}

	@supports (animation-timeline: scroll()) {
		@media (prefers-reduced-motion: no-preference) {
			header {
				top: calc(var(--nav-height) - var(--hero-height));
				min-height: var(--hero-height);
				align-content: space-between;
				animation-duration: auto;
				animation-timeline: scroll();
				animation-range: 0 calc(var(--hero-height) - var(--nav-height));
			}

			/* only worth showin' these while there's an open hero to sit in */
			nav {
				display: flex;
			}
		}
	}

	@keyframes shrink {
		to {
			padding-inline: var(--nav-gutter);
			--title-size: var(--nav-title-size);
			--title-gap: var(--nav-title-gap);
			--avatar-size: var(--nav-avatar-size);
			--gaze-reach: var(--nav-gaze-reach);
		}
	}
</style>
