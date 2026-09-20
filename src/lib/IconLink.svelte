<script lang="ts">
	import type { Snippet } from 'svelte';

	let { href, icon, children }: { href: string; icon?: string; children: Snippet } = $props();
</script>

<a {href} target="_blank">
	{#if icon}<img src={icon} alt="" loading="lazy" />{/if}
	{@render children()}
</a>

<style>
	a {
		display: flex;
		width: fit-content;
		align-items: center;
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
