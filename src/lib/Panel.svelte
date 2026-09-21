<script lang="ts">
	import type { Snippet } from 'svelte';

	let { title, href, children }: { title: string; href: string; children: Snippet } = $props();
</script>

<section>
	<header>
		<h2>{title}</h2>
		<a class="button" {href} aria-label="View all {title}">View all</a>
	</header>
	<div>{@render children()}</div>
</section>

<style>
	section {
		overflow: hidden;
		border-radius: var(--radius);
		background: var(--card);
		box-shadow: var(--panel-shadow);
	}

	header {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: var(--gap);
		padding: var(--panel-title-padding);
		background: var(--primary);
		color: var(--primary-text);
	}

	h2 {
		margin: 0;
		font-size: var(--panel-title-size);
		font-weight: var(--title-weight);
		line-height: var(--title-leading);
		letter-spacing: var(--title-tracking);
	}

	div {
		padding: var(--panel-padding);
	}
</style>
