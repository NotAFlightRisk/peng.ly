<script lang="ts">
	import { onMount } from 'svelte';
	import { site, panels, pages } from '$lib/config';
	import { projects, reports } from '$lib/content';
	import Penguin from '$lib/Penguin.svelte';
	import Panel from '$lib/Panel.svelte';
	import Contributions from '$lib/Contributions.svelte';
	import Reports from '$lib/Reports.svelte';
	import Projects from '$lib/Projects.svelte';
	import Posts from '$lib/Posts.svelte';
	import { schema } from '$lib/schema';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	// the front page only gets reports with a CVE number on 'em
	const featured = reports.filter(({ cve }) => cve);

	// what Google calls the site
	const website = schema({ '@type': 'WebSite', name: site.name, url: new URL('/', site.url).href });

	let header: HTMLElement;
	let shrink: Animation | undefined;

	// no scroll timelines? then the shrink sits paused an' we wind it along by 'and
	function wind() {
		if (shrink?.playState !== 'paused') return;
		const range = Math.max(-parseFloat(getComputedStyle(header).top), 1);
		shrink.currentTime = Math.min(scrollY / range, 1) * 1000;
	}

	onMount(() => {
		[shrink] = header.getAnimations();
		wind();
	});
</script>

<svelte:head>{@html website}</svelte:head>
<svelte:window onscroll={wind} onresize={wind} />

<header bind:this={header}>
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
	<Panel {...panels.projects} count={projects.length}><Projects /></Panel>
	<Panel {...panels.writing} count={data.postCount}><Posts posts={data.posts} /></Panel>
	<Panel {...panels.security} count={reports.length}><Reports reports={featured} idFirst /></Panel>
	<Panel {...panels.contributions} count={data.total}>
		<Contributions contributions={data.contributions} />
	</Panel>
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
		padding: 0 var(--nav-gutter);
		overflow: hidden;
		background: var(--primary);
		color: var(--primary-text);
		box-shadow: var(--hero-shadow);
		--title-size: var(--nav-title-size);
		--title-gap: var(--nav-title-gap);
		--avatar-size: var(--nav-avatar-size);
		--gaze-reach: var(--nav-gaze-reach);
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

	@media (prefers-reduced-motion: no-preference) {
		header {
			top: calc(var(--nav-height) - var(--hero-height));
			min-height: var(--hero-height);
			align-content: space-between;
			animation: shrink linear both;
		}

		/* only worth showin' these while there's an open hero to sit in */
		nav {
			display: flex;
		}

		@supports (animation-timeline: scroll()) {
			header {
				animation-duration: auto;
				animation-timeline: scroll();
				animation-range: 0 calc(var(--hero-height) - var(--nav-height));
			}
		}

		/* no scroll timeline (hiya Firefox)? then it sits paused for wind() to move */
		@supports not (animation-timeline: scroll()) {
			header {
				animation-duration: 1s;
				animation-play-state: paused;
			}
		}
	}

	/* the hero sizes come down from :root, the nav ones are the header's own */
	@keyframes shrink {
		from {
			padding-inline: var(--gutter);
			--title-size: inherit;
			--title-gap: inherit;
			--avatar-size: inherit;
			--gaze-reach: inherit;
		}
	}
</style>
