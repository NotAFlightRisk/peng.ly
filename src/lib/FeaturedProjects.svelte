<script lang="ts">
	import type { ComponentProps } from 'svelte';
	import type { Project } from '$lib/content';
	import ProjectLinks from '$lib/ProjectLinks.svelte';
	import Stats from '$lib/Stats.svelte';

	type Featured = Project & { stats: ComponentProps<typeof Stats> };
	let { projects }: { projects: Featured[] } = $props();
</script>

<ul>
	{#each projects as { name, title, description, repo, site, logo, screenshot, stats }, i (repo)}
		<li>
			<div>
				<h2>
					<a href="/projects/{name}"><img src={logo} alt="" />{title}</a>
				</h2>
				<p>{description}</p>
				<ProjectLinks {repo} {site} />
				<Stats {...stats} />
			</div>

			{#if screenshot}
				<!-- same link as the first button, just for clickin' -->
				<a class="screenshot" href={site ?? `https://github.com/${repo}`} target="_blank" tabindex="-1" aria-hidden="true">
					<img
						src={screenshot}
						alt="Screenshot of {title}"
						loading={i ? 'lazy' : 'eager'}
						fetchpriority={i ? 'auto' : 'high'}
					/>
				</a>
			{/if}
		</li>
	{/each}
</ul>

<style>
	ul {
		display: flex;
		flex-wrap: wrap;
		gap: var(--gutter);
	}

	li {
		/* a shade lighter than the card */
		--raised: var(--card-hover);
		display: grid;
		/* lines the screenshots up along the bottom */
		grid-template-rows: 1fr;
		width: 100%;
		overflow: hidden;
		border-radius: var(--radius);
		background: var(--card);
		box-shadow: var(--panel-shadow);

		/* one a row, but not too wide */
		@media (width < 40rem) {
			max-width: var(--featured-width);
			margin-inline: auto;
		}

		@media (40rem <= width < 55rem) {
			width: calc(50% - var(--gutter) / 2);
		}

		/* side by side, half an' half */
		@media (width >= 55rem) {
			&:has(.screenshot) {
				grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
			}
		}
	}

	div {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--list-gap);
		padding: var(--panel-padding);
		text-align: center;

		@media (width >= 55rem) {
			justify-content: center;
		}
	}

	h2 {
		margin: 0;
		font-size: var(--panel-title-size);
		font-weight: var(--title-weight);
		line-height: var(--page-title-leading);
		letter-spacing: var(--title-tracking);

		/* the logo hops up top when it's tight */
		a {
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			justify-content: center;
			gap: var(--gap) var(--list-gap);

			&:hover {
				color: var(--primary);
			}
		}

		img {
			flex-shrink: 0;
			width: var(--card-icon-size);
			height: var(--card-icon-size);
			border-radius: var(--radius);
		}
	}

	p {
		margin: 0;
		color: var(--muted);
		text-wrap: balance;
	}

	/* the border's on the link, so it don't zoom */
	.screenshot {
		overflow: hidden;
		border-top: var(--separator);

		@media (width >= 55rem) {
			border-top: 0;
			border-left: var(--separator);
		}

		img {
			display: block;
			width: 100%;
			height: 100%;
			aspect-ratio: var(--screenshot-ratio);
			object-fit: cover;
			object-position: left top;
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
</style>
