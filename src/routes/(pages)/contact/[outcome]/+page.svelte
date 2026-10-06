<script lang="ts">
	import Home from '~icons/tabler/home';
</script>

<svelte:head>
	<meta name="robots" content="noindex" />
</svelte:head>

<a class="button" href="/"><Home aria-hidden="true" />Back home</a>

<style>
	a {
		display: inline-flex;
		align-items: center;
		gap: var(--gap);
		min-height: var(--action-height);
		padding-inline: var(--list-gap);
		background: var(--card);
	}
</style>
