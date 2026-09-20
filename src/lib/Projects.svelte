<script lang="ts">
	import { projects } from '$lib/content';
	import IconLink from '$lib/IconLink.svelte';
</script>

<ul>
	{#each projects as { name, description, url, logo } (url)}
		<li>
			<IconLink href={url} icon={logo}>{name}</IconLink>
			<p>{description}</p>
		</li>
	{/each}
</ul>

<style>
	ul {
		display: flex;
		flex-direction: column;
		gap: var(--list-gap);
	}

	p {
		margin: 0;
		color: var(--muted);
		font-size: var(--small-size);
	}
</style>
