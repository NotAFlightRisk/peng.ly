<script lang="ts">
	import { site } from '#lib/config.js';
	import Posts from '#lib/Posts.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<link rel="alternate" type="application/rss+xml" title="{site.name} Blog" href={data.rss} />
</svelte:head>

<Posts posts={data.posts} full />
