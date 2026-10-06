<script lang="ts">
	import '../app.css';
	import { page } from '$app/state';
	import { site, links } from '$lib/config';
	import Footer from '$lib/Footer.svelte';
	import { schema } from '$lib/schema';
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
	// a page can bring its own picture for sharin', uvverwise it's the logo card
	const card = {
		src: new URL(og, site.url).href,
		alt: `The ${site.name} logo, next to a cartoon penguin`,
		width: '1200',
		height: '630'
	};
	const image = $derived(page.data.image ?? card);
	const person = schema({
		'@type': 'Person',
		name: site.author,
		url: site.url,
		image: photo,
		sameAs: links.map((link) => link.url)
	});
	// Most pages ship no JS at all, so the tracker has to load from the HTML itself
	const plausible = import.meta.env.PUBLIC_PLAUSIBLE_SCRIPT;
	const tracker = plausible && `<script>{
		const src = ${JSON.stringify(plausible)};
		const script = Object.assign(document.createElement('script'), { src, async: true });
		script.onload = () => plausible.init({ endpoint: new URL('/api/event', src).href });
		document.head.append(script);
	}<\/script>`;
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta name="author" content={site.author} />
	<link rel="canonical" href={url} />
	<meta name="theme-color" content={site.color} />
	<link rel="icon" href="/favicon.ico" sizes="16x16 32x32 48x48" />
	<link rel="icon" href={favicon} type="image/svg+xml" />
	<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={site.name} />
	<meta property="og:locale" content="en_GB" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={url} />
	<meta property="og:image" content={image.src} />
	{#if image.width}
		<meta property="og:image:width" content={image.width} />
		<meta property="og:image:height" content={image.height} />
	{/if}
	<meta property="og:image:alt" content={image.alt} />
	<meta name="twitter:card" content="summary_large_image" />
	{@html person}
	{@html tracker}
</svelte:head>

{@render children()}

<Footer />
