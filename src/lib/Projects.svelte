<script lang="ts">
	import { projects } from '$lib/content';
	import IconLink from '$lib/IconLink.svelte';

	// only the big 'uns make the front page
	const featured = projects.filter((project) => project.featured);
</script>

<ul>
	{#each featured as { name, description, repo, logo } (repo)}
		<li>
			<IconLink href="https://github.com/{repo}" icon={logo}>{name}</IconLink>
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
