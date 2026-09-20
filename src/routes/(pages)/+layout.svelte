<script lang="ts">
	import { page } from '$app/state';
	import { site } from '$lib/config';
	import Penguin from '$lib/Penguin.svelte';

	let { children } = $props();
</script>

<header>
	<a href="/">{site.name}</a>
	<Penguin />
</header>

<main class:wide={page.data.wide}>
	<h1>{page.data.title}</h1>
	<p>{page.data.description}</p>
	{@render children()}
</main>

<style>
	header {
		--avatar-size: var(--nav-avatar-size);
		position: sticky;
		top: 0;
		z-index: 1;
		display: flex;
		align-items: end;
		justify-content: space-between;
		height: var(--nav-height);
		padding: 0 var(--nav-gutter);
		overflow: hidden;
		background: var(--primary);
		color: var(--primary-text);
		box-shadow: var(--hero-shadow);
	}

	a {
		margin-bottom: var(--nav-title-gap);
		font-size: var(--nav-title-size);
		font-weight: var(--title-weight);
		line-height: var(--title-leading);
		letter-spacing: var(--title-tracking);
		text-decoration: none;
	}

	main {
		width: 100%;
		max-width: var(--page-width);
		margin-inline: auto;
		padding: var(--gutter);
	}

	.wide {
		max-width: var(--grid-width);
	}

	h1 {
		margin: 0;
		font-size: var(--page-title-size);
		font-weight: var(--title-weight);
		line-height: var(--page-title-leading);
		letter-spacing: var(--title-tracking);
	}

	p {
		margin: var(--gap) 0 var(--gutter);
		color: var(--muted);
	}
</style>
