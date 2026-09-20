<script lang="ts">
	import Repo from '$lib/Repo.svelte';
	import type { Contribution } from '$lib/content';

	let { contributions }: { contributions: Contribution[] } = $props();
</script>

<ul>
	{#each contributions as { repo, prs } (repo)}
		<li>
			<Repo {repo} />
			<ul>
				{#each prs as { number, title } (number)}
					<li>
						<a href="https://github.com/{repo}/pull/{number}" target="_blank">
							<span {title}>{title}</span>
							#{number}
						</a>
					</li>
				{/each}
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
		text-decoration: none;
	}

	a:hover {
		text-decoration: underline;
	}

	span {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>
