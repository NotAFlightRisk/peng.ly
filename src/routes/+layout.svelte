<script lang="ts">
	import '../app.css';
	import { page } from '$app/state';
	import { site, links } from '$lib/config';
	import favicon from '$lib/assets/favicon.svg';
	import avatar from '$lib/assets/avatar.jpg';

	let { children } = $props();

	const title = $derived(page.data.title ? `${page.data.title} | ${site.name}` : site.name);
	const description = $derived(page.data.description ?? site.description);
	const url = $derived(new URL(page.url.pathname, site.url).href);
	const image = new URL(avatar, site.url).href;
	const person = JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: site.author,
		url: site.url,
		image,
		sameAs: links.map((link) => link.url)
	});
	// that backslash stops Svelte finkin' our script's done a runner
	const schema = `<script type="application/ld+json">${person}<\/script>`;
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={url} />
	<link rel="icon" href={favicon} />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={site.name} />
	<meta property="og:locale" content="en_GB" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={url} />
	<meta property="og:image" content={image} />
	<meta name="twitter:card" content="summary" />
	{@html schema}
</svelte:head>

<main>{@render children()}</main>

<footer>
	<ul>
		{#each links as link (link.url)}
			<li><a href={link.url}>{link.name}</a></li>
		{/each}
	</ul>
</footer>

<style>
	footer {
		padding: var(--gutter);
	}

	ul {
		display: flex;
		flex-wrap: wrap;
		gap: var(--gutter);
		margin: 0;
		padding: 0;
		list-style: none;
	}

	a:hover {
		color: var(--primary);
	}
</style>
