<script lang="ts">
	import Todo from '#lib/Todo.svelte';
	import Mugshot from '#lib/visuals/Mugshot.svelte';
</script>

<div class="about">
	<div class="profile"><Mugshot /></div>
	<Todo text="write the about page" />
</div>

<style>
	.about {
		display: grid;
		align-items: start;
		gap: var(--gutter);
	}

	.profile {
		width: min(100%, var(--profile-width));
	}

	/* the mugshot shuffles off to the right once there's room for the words */
	@media (width >= 40rem) {
		.about {
			grid-template-columns: minmax(0, 1fr) var(--profile-width);
		}

		.profile {
			grid-area: 1 / 2;
		}
	}
</style>
