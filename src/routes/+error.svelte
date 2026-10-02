<script lang="ts">
	import { page } from '$app/state';
	import Oops from '$lib/Oops.svelte';
</script>

<Oops status={page.status} />
