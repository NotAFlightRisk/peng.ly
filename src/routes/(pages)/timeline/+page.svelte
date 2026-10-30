<script lang="ts">
	import Timeline from '#lib/Timeline.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<Timeline moments={data.moments} />
