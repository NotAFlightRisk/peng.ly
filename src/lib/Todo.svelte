<script lang="ts">
	let { text }: { text: string } = $props();
</script>

<p>// TODO: {text}</p>

<style>
	p {
		margin: 0;
		color: var(--muted);
		font-family: var(--mono);
	}
</style>
