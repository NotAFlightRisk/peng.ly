<script lang="ts">
	import { site } from '$lib/config';
	import type { Post } from '$lib/content';

	// full is the /blog page, wiv the blurb an' tags under each one
	let { posts, full = false }: { posts: Post[]; full?: boolean } = $props();

	const dates = new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium', timeZone: 'UTC' });
</script>

{#snippet published(date: string)}
	<time datetime={date}>{dates.format(new Date(date))}</time>
{/snippet}

<ul class:full>
	{#each posts as { title, description, url, date, tags, readingMinutes } (url)}
		<li>
			{#if full}
				<h2><a href={url}>{title}</a></h2>
				<p>{description}</p>
				<p class="meta">
					{@render published(date)}
					<span>{readingMinutes} min read</span>
					{#each tags as tag (tag)}
						<a href="{site.blog}/tags/{tag}/">#{tag}</a>
					{/each}
				</p>
			{:else}
				<a href={url}>{title}</a>
				{@render published(date)}
			{/if}
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
		align-items: baseline;
		justify-content: space-between;
		gap: var(--gap);
	}

	time {
		white-space: nowrap;
	}

	time,
	.meta {
		color: var(--muted);
		font-size: var(--small-size);
	}

	.full {
		gap: var(--gutter);

		li {
			flex-direction: column;
			align-items: start;
		}
	}

	h2 {
		margin: 0;
		font-size: var(--card-title-size);
		font-weight: var(--title-weight);

		a:hover {
			color: var(--primary);
		}
	}

	p {
		margin: 0;
	}

	.meta {
		display: flex;
		flex-wrap: wrap;
		gap: 0 var(--list-gap);

		a:hover {
			color: var(--text);
		}
	}
</style>
