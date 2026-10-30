<script lang="ts">
	import { miniApps } from '#lib/config.js';
	import FeaturedProjects from '#lib/FeaturedProjects.svelte';
	import ProjectGrid from '#lib/ProjectGrid.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<FeaturedProjects projects={data.featured} />
<ProjectGrid {...miniApps} projects={data.mini} />
