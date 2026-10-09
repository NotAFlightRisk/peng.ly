<script lang="ts">
	import { projects } from '$lib/content';
	import IconLink from '$lib/IconLink.svelte';
	import Github from '~icons/tabler/brand-github';

	// only the big 'uns make the front page
	const featured = projects.filter((project) => project.featured);
</script>

<ul>
	{#each featured as { name, title, description, repo, logo } (repo)}
		{@const source = `https://github.com/${repo}`}
		<li>
			<IconLink href="/projects/{name}" icon={logo}>{name}</IconLink>
			<a href={source} target="_blank" title="Source: {source}" aria-label="{title} on GitHub"><Github aria-hidden="true" /></a>
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

	/* name on the left, GitHub on the right, blurb underneath */
	li {
		display: grid;
		grid-template-columns: 1fr auto;
		align-items: center;
		column-gap: var(--gap);
	}

	a {
		display: grid;
		place-items: center;
		width: var(--target-size);
		height: var(--target-size);
		color: var(--muted);
		transition: color var(--hover-transition);

		&:hover {
			color: var(--primary);
		}
	}

	p {
		grid-column: 1 / -1;
		margin: 0;
		color: var(--muted);
		font-size: var(--small-size);
	}
</style>
