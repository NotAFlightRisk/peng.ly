<script lang="ts">
	import { page } from '$app/state';
	import { moreApps, panels, site } from '$lib/config';
	import { schema } from '$lib/schema';
	import ProjectGrid from '$lib/ProjectGrid.svelte';
	import ProjectLinks from '$lib/ProjectLinks.svelte';
	import Readme from '$lib/Readme.svelte';
	import Stats from '$lib/Stats.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const { title, description, repo, site: website, logo, image, stats, topics, readme, more } = $derived(data);
	const source = $derived(`https://github.com/${repo}`);
	const url = $derived(new URL(page.url.pathname, site.url).href);

	// what it is an' where it sits, both in the one lump for the search engines
	const code = $derived(
		schema({
			'@graph': [
				{
					'@type': 'SoftwareSourceCode',
					name: title,
					description,
					url,
					codeRepository: source,
					programmingLanguage: stats.language,
					license: stats.licence && `https://spdx.org/licenses/${stats.licence}`,
					keywords: topics,
					image: image?.src ?? new URL(logo, site.url).href,
					dateModified: stats.updated,
					author: { '@type': 'Person', name: site.author, url: site.url }
				},
				{
					'@type': 'BreadcrumbList',
					itemListElement: [
						[site.name, '/'],
						[panels.projects.title, panels.projects.href],
						[title, page.url.pathname]
					].map(([name, path], i) => ({
						'@type': 'ListItem',
						position: i + 1,
						name,
						item: new URL(path, site.url).href
					}))
				}
			]
		})
	);
</script>

<svelte:head>{@html code}</svelte:head>

<div class="hero">
	<div class="intro">
		<img class="logo" src={logo} alt="" />
		<h1>{title}</h1>
		<p>{description}</p>
		<ProjectLinks {repo} site={website} />
		<Stats {...stats} />
	</div>

	{#if image}
		<div class="screenshot"><img src={image.src} alt={image.alt} fetchpriority="high" /></div>
	{/if}
</div>

<Readme {...readme} />
<ProjectGrid title={moreApps.title} description={moreApps.description} projects={more} />

<style>
	.hero {
		display: grid;
		align-items: center;
		gap: var(--gutter);
		max-width: var(--panels-width);
		margin: 0 auto var(--gutter);
	}

	/* the title's sized off this column, not the whole screen, so it fits either way */
	.intro {
		container-type: inline-size;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-self: center;
		gap: var(--list-gap);
		width: 100%;
		max-width: var(--page-width);
		text-align: center;
	}

	.logo {
		width: var(--hero-logo-size);
		height: var(--hero-logo-size);
		border-radius: var(--radius);
	}

	h1 {
		margin: 0;
		font-size: var(--hero-title-size);
		font-weight: var(--title-weight);
		line-height: var(--page-title-leading);
		letter-spacing: var(--title-tracking);
	}

	p {
		margin: 0;
		color: var(--muted);
	}

	/* same frame for every shot, an' never so tall the hero runs off the screen */
	.screenshot {
		width: 100%;
		max-height: calc(100svh - var(--nav-height) - 2 * var(--gutter) - 2 * var(--hero-padding));
		aspect-ratio: var(--screenshot-ratio);
		border-radius: var(--radius);
		box-shadow: var(--panel-shadow);
	}

	@media (width >= 55rem) {
		.hero {
			padding-block: var(--hero-padding);
		}

		/* side by side once there's room, wiv the screenshot gettin' the lion's share */
		.hero:has(.screenshot) {
			grid-template-columns: minmax(0, 2fr) minmax(0, 3fr);
		}
	}
</style>
