<script lang="ts">
	import Repo from '$lib/Repo.svelte';
	import type { Report } from '$lib/content';

	let { reports }: { reports: Report[] } = $props();
</script>

<ul>
	{#each reports as { ghsa, cve, title, repo } (ghsa)}
		<li>
			<a href="https://github.com/{repo}/security/advisories/{ghsa}" target="_blank">{cve ?? ghsa}</a>
			<Repo {repo} />
			<p>{title}</p>
		</li>
	{/each}
</ul>

<style>
	ul {
		display: flex;
		flex-direction: column;
		gap: var(--list-gap);
	}

	a:hover {
		color: var(--primary);
	}

	li {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		column-gap: var(--gap);
	}

	p {
		flex-basis: 100%;
		margin: 0;
		color: var(--muted);
		font-size: var(--small-size);
	}
</style>
