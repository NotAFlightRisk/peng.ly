<script lang="ts">
	import type { Project } from '$lib/content';
	import ProjectCards from '$lib/ProjectCards.svelte';

	let { title, description, projects }: { title: string; description: string; projects: Project[] } = $props();
</script>

<section>
	<h2>{title}</h2>
	<p>{description}</p>
	<ProjectCards {projects} />
</section>

<style>
	section {
		max-width: var(--grid-width);
		margin: var(--section-gap) auto 0;
	}

	h2 {
		margin: 0;
		font-size: var(--section-title-size);
		font-weight: var(--title-weight);
		line-height: var(--page-title-leading);
		letter-spacing: var(--title-tracking);
	}

	p {
		margin: var(--gap) 0 var(--list-gap);
		color: var(--muted);
	}
</style>
