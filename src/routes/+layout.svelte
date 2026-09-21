<script lang="ts">
	import '../app.css';
	import { page } from '$app/state';
	import { site, links } from '$lib/config';
	import Footer from '$lib/Footer.svelte';
	import favicon from '$lib/assets/favicon.svg';
	import avatar from '$lib/assets/avatar.jpg';
	import og from '$lib/assets/og.png';

	let { children } = $props();

	const title = $derived(
		page.data.title ? `${page.data.title} | ${site.name}` : `${site.name} | ${site.tagline}`
	);
	const description = $derived(page.data.meta ?? page.data.description ?? site.description);
	const url = $derived(new URL(page.url.pathname, site.url).href);
	const photo = new URL(avatar, site.url).href;
	const card = new URL(og, site.url).href;
	const person = JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: site.author,
		url: site.url,
		image: photo,
		sameAs: links.map((link) => link.url)
	});
	// that backslash stops Svelte finkin' our script's done a runner
	const schema = `<script type="application/ld+json">${person}<\/script>`;
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta name="author" content={site.author} />
	<link rel="canonical" href={url} />
	<link rel="icon" href={favicon} />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={site.name} />
	<meta property="og:locale" content="en_GB" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={url} />
	<meta property="og:image" content={card} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content="The {site.name} logo, next to a cartoon penguin" />
	<meta name="twitter:card" content="summary_large_image" />
	{@html schema}
</svelte:head>

{@render children()}

<Footer />
