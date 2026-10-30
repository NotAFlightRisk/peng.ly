<script lang="ts">
	import Repo from '#lib/Repo.svelte';
	import type { Contribution } from '#lib/content.js';

	// path is the bit of the GitHub URL between the repo an' the number
	let { contributions, path = 'pull' }: { contributions: Contribution[]; path?: string } = $props();

	// any more than this from one repo an' the rest just get counted
	const limit = 8;
</script>

<ul>
	{#each contributions as { repo, threads } (repo)}
		<li>
			<Repo {repo} />
			<ul>
				{#each threads.slice(0, limit) as { number, title } (number)}
					<li>
						<a href="https://github.com/{repo}/{path}/{number}" target="_blank">
							<span {title}>{title}</span>
							#{number}
						</a>
					</li>
				{/each}
				{#if threads.length > limit}
					<li class="more">+{threads.length - limit} more</li>
				{/if}
			</ul>
		</li>
	{/each}
</ul>

<style>
	ul {
		display: flex;
		flex-direction: column;
		gap: var(--list-gap);
	}

	li ul {
		gap: var(--pr-gap);
	}

	a {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		min-height: var(--target-size);
		gap: var(--gap);
		color: var(--muted);
		font-size: var(--small-size);
	}

	.more {
		color: var(--muted);
		font-size: var(--small-size);
	}

	span {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>
