<script lang="ts">
	import type { Snippet } from 'svelte';

	let { href, icon, children }: { href: string; icon?: string; children: Snippet } = $props();

	const target = $derived(href.startsWith('/') ? undefined : '_blank');
</script>

<a {href} {target}>
	{#if icon}<img src={icon} alt="" loading="lazy" />{/if}
	{@render children()}
</a>

<style>
	a {
		display: flex;
		width: fit-content;
		align-items: start;
		gap: var(--gap);
		overflow-wrap: anywhere;
	}

	a:hover {
		color: var(--primary);
	}

	img {
		width: var(--icon-size);
		height: var(--icon-size);
		border-radius: var(--radius);
	}
</style>
