<script lang="ts">
	import { page } from '$app/state';
	import { site } from '$lib/config';
	import Menu from '$lib/Menu.svelte';
	import Penguin from '$lib/Penguin.svelte';

	let { children } = $props();
</script>

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

	header > a {
		margin: 0 auto var(--nav-title-gap) 0;
		font-size: var(--nav-title-size);
		font-weight: var(--title-weight);
		line-height: var(--title-leading);
		letter-spacing: var(--title-tracking);
		text-decoration: none;
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
