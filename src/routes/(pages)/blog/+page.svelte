<script lang="ts">
	import { site } from '$lib/config';
	import Posts from '$lib/Posts.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<link rel="alternate" type="application/rss+xml" title="{site.name} Blog" href="{site.blog}/rss.xml" />
</svelte:head>

<Posts posts={data.posts} full />
