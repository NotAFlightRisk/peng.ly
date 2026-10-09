<script lang="ts">
	import { miniApps } from '$lib/config';
	import FeaturedProjects from '$lib/FeaturedProjects.svelte';
	import ProjectCards from '$lib/ProjectCards.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<FeaturedProjects projects={data.featured} />

<section>
	<h2>{miniApps.title}</h2>
	<p>{miniApps.description}</p>
	<ProjectCards projects={data.mini} />
</section>

<style>
	section {
		margin-top: var(--section-gap);
	}

	h2 {
		margin: 0;
		font-size: var(--section-title-size);
		font-weight: var(--title-weight);
		line-height: var(--page-title-leading);
		letter-spacing: var(--title-tracking);
	}

	p {
		margin: var(--gap) 0 var(--gutter);
		color: var(--muted);
	}
</style>
