<script lang="ts">
	import Repo from '$lib/Repo.svelte';
	import type { Report } from '$lib/content';

	let { reports, idFirst = false }: { reports: Report[]; idFirst?: boolean } = $props();
</script>

<ul class:featured={idFirst}>
	{#each reports as { ghsa, cve, title, repo } (ghsa)}
		{@const href = `https://github.com/${repo}/security/advisories/${ghsa}`}
		{#snippet id()}<a {href} target="_blank"><code>{cve ?? ghsa}</code></a>{/snippet}
		{#snippet name()}<a class="title" {href} target="_blank" {title}>{title}</a>{/snippet}
		<li>
			{#if idFirst}
				{@render id()}
				<p><Repo {repo} /></p>
				{@render name()}
			{:else}
				{@render name()}
				<p><Repo {repo} />{@render id()}</p>
			{/if}
		</li>
	{/each}
</ul>

<style>
	ul {
		display: flex;
		flex-direction: column;
		gap: var(--list-gap);
	}

	li {
		display: flex;
		flex-direction: column;
	}

	/* on the front page the CVE an' repo share a line, so the title gets one to itself, innit */
	.featured li {
		flex-flow: row wrap;
		align-items: center;
		justify-content: space-between;
		column-gap: var(--gap);
	}

	/* avatars on the far right, so they line up proper down the edge */
	.featured p > :global(a) {
		flex-direction: row-reverse;
	}

	.featured p > :global(a:hover) {
		color: inherit;
	}

	.featured .title {
		flex-basis: 100%;
		color: var(--muted);
		font-size: var(--small-size);
	}

	p {
		--icon-size: var(--small-icon-size);
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0 var(--list-gap);
		margin: 0;
		color: var(--muted);
		font-size: var(--small-size);
	}

	a:hover code {
		color: var(--primary);
	}

	code {
		font-family: var(--mono);
		white-space: nowrap;
	}

	.title {
		flex: 1;
		min-width: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>
