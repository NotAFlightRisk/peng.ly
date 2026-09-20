<script lang="ts">
	import IconLink from '$lib/IconLink.svelte';

	let { repo }: { repo: string } = $props();
</script>

<IconLink href="https://github.com/{repo}" icon="https://github.com/{repo.split('/')[0]}.png?size=64">
	{repo}
</IconLink>
