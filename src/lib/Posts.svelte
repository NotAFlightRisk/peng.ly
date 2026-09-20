<script lang="ts">
	import { posts } from '$lib/content';

	const dates = new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium', timeZone: 'UTC' });
</script>

<ul>
  {#if !posts.length}
    <p class="temp-todo">// TODO: link to posts</p>
  {/if}
	{#each posts as { title, date, url } (url)}
		<li>
			<a href={url} target="_blank">{title}</a>
			<time datetime={date}>{dates.format(new Date(date))}</time>
		</li>
	{/each}
</ul>

<style>
  .temp-todo {
    margin: 0;
    opacity: 0.8;
    font-family: monospace;
  }
	ul {
		display: flex;
		flex-direction: column;
		gap: var(--list-gap);
		li {
			display: flex;
			justify-content: space-between;
			gap: var(--gap);
			time {
				white-space: nowrap;
				color: var(--muted);
				font-size: var(--small-size);
			}
		}
	}
</style>
