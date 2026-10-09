<script lang="ts">
	import Chevron from '~icons/tabler/chevron-right';

	let { trail }: { trail: [name: string, href: string][] } = $props();
</script>

<nav aria-label="Breadcrumb">
	<ol>
		{#each trail as [name, href], i (href)}
			<li>
				{#if i}<Chevron aria-hidden="true" />{/if}
				<a {href} aria-current={i === trail.length - 1 ? 'page' : undefined}>{name}</a>
			</li>
		{/each}
	</ol>
</nav>

<style>
	nav {
		max-width: var(--panels-width);
		margin: 0 auto var(--list-gap);
		color: var(--muted);
		font-size: var(--small-size);
	}

	ol {
		display: flex;
		flex-wrap: wrap;
		gap: var(--gap);
		margin: 0;
		padding: 0;
		list-style: none;
	}

	li {
		display: flex;
		align-items: center;
		gap: var(--gap);
	}

	a {
		&:hover {
			color: var(--primary);
		}

		&[aria-current] {
			color: var(--text);
		}
	}
</style>
