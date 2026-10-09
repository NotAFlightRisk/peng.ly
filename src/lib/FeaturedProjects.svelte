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
				<!-- goes where the first button does, so it's only 'ere for clickin' -->
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
		/* already sat on a card, so the buttons go a shade lighter */
		--raised: var(--card-hover);
		display: grid;
		/* the words take up any slack, so screenshots in a row line up along the bottom */
		grid-template-rows: 1fr;
		width: 100%;
		overflow: hidden;
		border-radius: var(--radius);
		background: var(--card);
		box-shadow: var(--panel-shadow);
	}

	div {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--list-gap);
		padding: var(--panel-padding);
		text-align: center;
	}

	h2 {
		margin: 0;
		font-size: var(--panel-title-size);
		font-weight: var(--title-weight);
		line-height: var(--page-title-leading);
		letter-spacing: var(--title-tracking);
	}

	/* the logo hops up top when there's no room for it beside the title */
	h2 a {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		gap: var(--gap) var(--list-gap);
	}

	h2 a:hover {
		color: var(--primary);
	}

	h2 img {
		flex-shrink: 0;
		width: var(--card-icon-size);
		height: var(--card-icon-size);
		border-radius: var(--radius);
	}

	p {
		margin: 0;
		color: var(--muted);
		text-wrap: balance;
	}

	/* the line sits on the link, so it stays put while the picture zooms */
	.screenshot {
		overflow: hidden;
		border-top: var(--separator);
	}

	.screenshot img {
		display: block;
		width: 100%;
		height: 100%;
		aspect-ratio: var(--screenshot-ratio);
		object-fit: cover;
		object-position: left top;
	}

	@media (prefers-reduced-motion: no-preference) {
		.screenshot img {
			transition: scale var(--zoom-transition);
		}

		.screenshot:hover img {
			scale: var(--screenshot-zoom);
		}
	}

	/* one a row on a phone, but never so wide the screenshot 'ogs the screen */
	@media (width < 40rem) {
		li {
			max-width: var(--featured-width);
			margin-inline: auto;
		}
	}

	@media (40rem <= width < 55rem) {
		li {
			width: calc(50% - var(--gutter) / 2);
		}
	}

	/* side by side once there's room, half an' half */
	@media (width >= 55rem) {
		li:has(.screenshot) {
			grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
		}

		div {
			justify-content: center;
		}

		.screenshot {
			border-top: 0;
			border-left: var(--separator);
		}
	}
</style>
