<script lang="ts">
	import { posts } from '$lib/content';

	const dates = new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium', timeZone: 'UTC' });
</script>

<ul>
	{#each posts as { title, date, url } (url)}
		<li>
			<a href={url} target="_blank">{title}</a>
			<time datetime={date}>{dates.format(new Date(date))}</time>
		</li>
	{/each}
</ul>

<style>
	ul {
		display: flex;
		flex-direction: column;
		gap: var(--list-gap);
	}

	li {
		display: flex;
		justify-content: space-between;
		gap: var(--gap);
	}

	time {
		white-space: nowrap;
		color: var(--muted);
		font-size: var(--small-size);
	}
</style>
