<script lang="ts">
	import { page } from '$app/state';
	import { site } from '$lib/config';
	import Menu from '$lib/Menu.svelte';
	import Penguin from '$lib/Penguin.svelte';

	let { children } = $props();

	// came from a page wiv this same bar? then 'e's already sat up in it
	const settled = `<script>{
		const from = document.referrer && new URL(document.referrer);
		if (from.origin === location.origin && from.pathname !== '/') document.documentElement.classList.add('settled');
	}<\/script>`;
</script>

<svelte:head>{@html settled}</svelte:head>

<header>
	<a href="/">{site.name}</a>
	<Menu />
	<Penguin />
</header>

<main class:wide={page.data.wide} class:bare={page.data.bare}>
	{#if !page.data.bare}
		<h1>{page.data.title}</h1>
		<div class="intro">
			<p>
				{page.data.description}{#if page.data.rss}, also available <a href={page.data.rss}>via RSS</a>{/if}
			</p>
			<!-- some pages bring a gadget to sit on the end o' the description -->
			{#if page.data.beside}
				<page.data.beside />
			{/if}
		</div>
	{/if}
	{@render children()}
</main>

<!-- some pages bring a picture to sit on top o' the footer -->
{#if page.data.footer}
	<page.data.footer />
{/if}

<style>
	header {
		--avatar-size: var(--nav-avatar-size);
		/* where the links' right edge sits, so an open menu can park itself there */
		--menu-right: calc(var(--nav-gutter) + var(--nav-avatar-size) + var(--list-gap));
		position: sticky;
		top: 0;
		z-index: 1;
		/* stays put while the page under it swaps */
		view-transition-name: header;
		display: flex;
		align-items: end;
		gap: var(--list-gap);
		height: var(--nav-height);
		padding: 0 var(--nav-gutter);
		overflow: hidden;
		background: var(--primary);
		color: var(--primary-text);
		box-shadow: var(--hero-shadow);
	}

	/* the front page's big title shrinks into this one */
	header > a {
		view-transition-name: brand;
		margin: 0 auto var(--nav-title-gap) 0;
		font-size: var(--nav-title-size);
		font-weight: var(--title-weight);
		line-height: var(--title-leading);
		letter-spacing: var(--title-tracking);
		text-decoration: none;
	}

	/* the big title shrinks down crisp, 'stead o' this one blown up blurry */
	:global(::view-transition-old(brand)) {
		animation: none;
	}

	:global(::view-transition-new(brand)) {
		display: none;
	}

	/* no big title to shrink? then this one turns up as normal */
	:global(::view-transition-new(brand):only-child) {
		display: block;
	}

	/* 'e was already sat up on the last page */
	:global(.settled) header > :global(svg) {
		animation: none;
	}

	main {
		/* soaks up the slack, so a picture under it stays stuck to the footer */
		flex-grow: 1;
		/* anyfin' floatin' in 'ere still slides under the header */
		isolation: isolate;
		width: 100%;
		max-width: var(--page-width);
		margin-inline: auto;
		padding: var(--gutter);
	}

	.wide {
		max-width: var(--grid-width);
	}

	/* only a little breadcrumb up top, so it don't need the full gutter */
	.bare {
		max-width: none;
		padding-top: var(--bare-top);
	}

	h1 {
		margin: 0;
		font-size: var(--page-title-size);
		font-weight: var(--title-weight);
		line-height: var(--page-title-leading);
		letter-spacing: var(--title-tracking);
	}

	/* the gadget 'ugs the right, even on a line of its own */
	.intro {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		justify-content: end;
		column-gap: var(--list-gap);
		margin: var(--gap) 0 var(--gutter);
	}

	p {
		flex-grow: 1;
		margin: 0;
		color: var(--muted);

		a {
			color: var(--primary);
			text-decoration: underline;
		}
	}
</style>
