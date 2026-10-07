<script lang="ts">
	import Todo from '$lib/Todo.svelte';
	import Mugshot from '$lib/visuals/Mugshot.svelte';
</script>

<div>
	<Mugshot />
	<Todo text="write the about page" />
</div>

<style>
	div {
		display: grid;
		gap: var(--gutter);
	}
</style>
