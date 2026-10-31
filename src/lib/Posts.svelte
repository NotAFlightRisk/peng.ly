<script lang="ts">
	import { site } from '#lib/config.js';
	import type { Post } from '#lib/content.js';

	// full is the /blog page, wiv the blurb an' tags under each one
	let { posts, full = false }: { posts: Post[]; full?: boolean } = $props();

	const dates = new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium', timeZone: 'UTC' });
</script>

{#snippet published(date: string)}
	<time datetime={date}>{dates.format(new Date(date))}</time>
{/snippet}

<ul class:full>
	{#each posts as { title, description, url, date, tags, readingMinutes, image }, i (url)}
		<li>
			{#if full}
				{#if image}
					<!-- same link as the title, just for clickin' -->
					<a class="screenshot" href={url} tabindex="-1" aria-hidden="true">
						<img src={image} alt="" loading={i ? 'lazy' : 'eager'} fetchpriority={i ? 'auto' : 'high'} />
					</a>
				{/if}
				<div>
					<h2><a href={url}>{title}</a></h2>
					<p>{description}</p>
					<p class="meta">
						{@render published(date)}
						<span>{readingMinutes} min read</span>
						{#each tags as tag (tag)}
							<a href="{site.blog}/tags/{tag}/">#{tag}</a>
						{/each}
					</p>
				</div>
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
		display: grid;

		/* two a row on a tablet */
		@media (40rem <= width < 64rem) {
			grid-template-columns: 1fr 1fr;
		}

		li {
			flex-direction: column;
			align-items: stretch;
			justify-content: start;
			gap: 0;
			overflow: hidden;
			border-radius: var(--radius);
			background: var(--card);
			box-shadow: var(--panel-shadow);

			/* one a row on a phone, but not too wide */
			@media (width < 40rem) {
				width: 100%;
				max-width: var(--featured-width);
				margin-inline: auto;
			}

			/* tucked in down the side, so 'eights don't matter */
			@media (width >= 64rem) {
				flex-direction: row;
				align-items: start;
				gap: var(--list-gap);
				padding: var(--panel-padding);
			}
		}

		div {
			display: grid;
			gap: var(--gap);
			padding: var(--panel-padding);

			@media (width >= 64rem) {
				padding: 0;
			}
		}
	}

	/* the border's on the link, so it don't zoom */
	.screenshot {
		flex-shrink: 0;
		aspect-ratio: var(--post-image-ratio);
		border-bottom: var(--separator);

		@media (width >= 64rem) {
			width: var(--post-image-width);
			border: var(--separator);
			border-radius: var(--radius);
		}

		@media (prefers-reduced-motion: no-preference) {
			img {
				transition: scale var(--zoom-transition);
			}

			&:hover img {
				scale: var(--screenshot-zoom);
			}
		}
	}

	h2 {
		margin: 0;
		font-size: var(--post-title-size);
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
