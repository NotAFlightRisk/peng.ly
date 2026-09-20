<script lang="ts">
	import Contributions from '$lib/Contributions.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<Contributions contributions={data.contributions} />
