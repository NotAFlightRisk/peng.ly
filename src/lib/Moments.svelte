<script module lang="ts">
	import type { Moment } from '$lib/content';
	import Pull from '~icons/tabler/git-pull-request';
	import Merge from '~icons/tabler/git-merge';
	import Rocket from '~icons/tabler/rocket';
	import Shield from '~icons/tabler/shield-lock';
	import Pencil from '~icons/tabler/pencil';
	import Answer from '~icons/tabler/message-check';

	export const icons = { theirs: Pull, mine: Merge, project: Rocket, report: Shield, post: Pencil, answer: Answer };

	// 'ow many links a load o' dots 'ave between 'em
	export const tally = (moments: Moment[]) => moments.flatMap(({ links }) => links).length;
</script>

<script lang="ts">
	import { pages } from '$lib/config';
	import { projects } from '$lib/content';
	import Dot from '$lib/Dot.svelte';
	import IconLink from '$lib/IconLink.svelte';
	import Repo from '$lib/Repo.svelte';
	import Chevron from '~icons/tabler/chevron-down';

	let { moments }: { moments: Moment[] } = $props();

	const { kinds } = pages.timeline;
	const day = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', timeZone: 'UTC' }).format;

	// any more links than this an' the rest get tucked away
	const max = 8;
	const shown = 5;

	// me own repos show their project's logo, if they've got one
	const project = (repo: string) => projects.find((project) => project.repo === repo);
</script>

{#snippet list(links: Moment['links'])}
	<ul>
		{#each links as { title, href } (href)}
			<li><IconLink {href}>{title}</IconLink></li>
		{/each}
	</ul>
{/snippet}

<ol>
	{#each moments as { kind, date, links, repo } (links[0].href)}
		{@const own = repo && project(repo)}
		{@const long = links.length > max}
		<li data-kind={kind}>
			<Dot icon={icons[kind]} />
			<p>
				<strong>{kinds[kind]}</strong>
				<time datetime={date}>{day(new Date(date))}</time>
				{#if own}
					<IconLink href="/projects/{own.name}" icon={own.logo}>{own.title}</IconLink>
				{:else if repo}
					<Repo {repo} />
				{/if}
			</p>
			{@render list(long ? links.slice(0, shown) : links)}
			{#if long}
				<details class="fold">
					<summary>
						<span class="more">Show all {links.length}</span>
						<span class="less">Show less</span>
						<Chevron aria-hidden="true" />
					</summary>
					{@render list(links.slice(shown))}
				</details>
			{/if}
		</li>
	{/each}
</ol>

<style>
	ol {
		display: flex;
		flex-direction: column;
		gap: var(--list-gap);
		margin: 0;
		padding: 0;
		list-style: none;

		> li {
			position: relative;
			display: grid;
			grid-template-columns: var(--timeline-dot) minmax(0, 1fr);
			column-gap: var(--list-gap);

			/* the line from each dot down to the next one showin' */
			&:has(~ li:not([hidden]))::before {
				content: '';
				position: absolute;
				top: calc(var(--timeline-dot) + var(--timeline-gap));
				bottom: calc(var(--timeline-gap) - var(--list-gap));
				left: calc(var(--timeline-dot) / 2);
				border-left: var(--timeline-line);
				translate: -50%;
			}
		}
	}

	p {
		--icon-size: var(--small-icon-size);
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0 var(--list-gap);
		min-height: var(--timeline-dot);
		margin: 0;
		color: var(--muted);
		font-size: var(--small-size);

		/* big enough to prod at on a phone */
		> :global(a) {
			align-items: center;
			min-height: var(--target-size);
		}
	}

	strong {
		color: var(--text);
		font-weight: var(--button-weight);
	}

	ul {
		grid-column: 2;
		display: flex;
		flex-direction: column;
		gap: var(--gap);
	}

	details {
		grid-column: 2;
		padding-top: var(--gap);

		ul {
			padding-bottom: var(--gap);
		}

		&:not([open]) .less,
		&[open] .more {
			display: none;
		}
	}

	/* sits under the lot, so it rides up an' down wiv 'em */
	summary {
		order: 1;
	}
</style>
