<script lang="ts">
	import Github from '~icons/tabler/brand-github';
	import World from '~icons/tabler/world';

	let { repo, site }: { repo: string; site?: string } = $props();
</script>

<ul>
	{#if site}
		<li><a class="button" href={site} target="_blank"><World aria-hidden="true" />Website</a></li>
	{/if}
	<li><a class="button" href="https://github.com/{repo}" target="_blank"><Github aria-hidden="true" />Source</a></li>
</ul>

<style>
	ul {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: var(--gap);
	}

	.button {
		display: flex;
		align-items: center;
		gap: var(--gap);
		min-height: var(--action-height);
		padding-inline: var(--list-gap);
		background: var(--raised);
	}

	/* the first one's where most folk want to go, so it gets the yellow */
	li:first-child .button {
		background: var(--primary);
		color: var(--primary-text);
	}

	/* wiv its dark text the ring'd go proper invisible against the dark behind it */
	li:first-child .button:focus-visible {
		outline-color: var(--primary);
	}
</style>
