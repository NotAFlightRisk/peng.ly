<script lang="ts">
	import type { Component } from 'svelte';
	import type { SvelteHTMLElements } from 'svelte/elements';

	let { icon: Icon }: { icon: Component<SvelteHTMLElements['svg']> } = $props();
</script>

<span><Icon aria-hidden="true" /></span>

<style>
	span {
		display: grid;
		flex-shrink: 0;
		place-items: center;
		width: var(--timeline-dot);
		height: var(--timeline-dot);
		border-radius: 50%;
		background: var(--primary);
		color: var(--primary-text);
		font-size: var(--timeline-icon);
	}
</style>
