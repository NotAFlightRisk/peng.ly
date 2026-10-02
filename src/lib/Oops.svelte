<script lang="ts">
	import { errors, sections, site } from '$lib/config';
	import Penguin from '$lib/Penguin.svelte';

	let { status }: { status: number } = $props();

	const { title, description } = $derived(status === 404 ? errors.lost : errors.broken);
	// 404, 500 an' the rest all 'ave a nought in the middle, so that's where he pops up
	const [first, , last] = $derived([...String(status)]);
</script>

<svelte:head>
	<meta name="robots" content="noindex" />
</svelte:head>

<main>
	<a href="/">{site.name}</a>

	<div role="img" aria-label="Error {status}">
		<span>{first}</span>
		<span class="zero"><Penguin /></span>
		<span>{last}</span>
	</div>

	<h1>{title}</h1>
	<p>{description}</p>

	<nav aria-label="Main">
		<ul>
			<li><a class="button" href="/">Home</a></li>
			{#each sections as { title, href } (href)}
				<li><a class="button" {href}>{title}</a></li>
			{/each}
		</ul>
	</nav>
</main>

<style>
	main {
		display: flex;
		flex: 1;
		flex-direction: column;
		align-items: start;
		gap: var(--list-gap);
		padding: var(--nav-title-gap) var(--gutter) var(--gutter);
		background: var(--primary);
		color: var(--primary-text);
		box-shadow: var(--hero-shadow);
	}

	main > a {
		font-size: var(--nav-title-size);
		font-weight: var(--title-weight);
		line-height: var(--title-leading);
		letter-spacing: var(--title-tracking);
		text-decoration: none;
	}

	/* the auto margin drops the lot to the bottom, like the title on the front page */
	div {
		display: flex;
		align-items: center;
		margin-top: auto;
		font-size: var(--error-size);
		font-weight: var(--title-weight);
		line-height: var(--title-leading);
		letter-spacing: var(--title-tracking);
	}

	/* a ring rather than the font's nought, so there's an 'ole for 'im to peek out of */
	.zero {
		--avatar-size: 100%;
		--gaze-reach: var(--nav-gaze-reach);
		display: flex;
		align-items: end;
		width: var(--zero-width);
		aspect-ratio: var(--zero-ratio);
		margin-inline: var(--zero-gap);
		overflow: hidden;
		border: var(--zero-stroke) solid;
		border-radius: 50%;
	}

	h1 {
		margin: 0;
		font-size: var(--page-title-size);
		font-weight: var(--title-weight);
		line-height: var(--page-title-leading);
		letter-spacing: var(--title-tracking);
	}

	p {
		margin: 0;
	}

	ul {
		display: flex;
		flex-wrap: wrap;
		gap: var(--gap);
	}

	@media (prefers-reduced-motion: no-preference) {
		span:not(.zero) {
			animation: arrive var(--peek-duration) var(--peek-ease) both;
		}

		span:last-child {
			--arrive: 1;
		}
	}

	/* the numbers shunt in from either side an' bump up against the nought */
	@keyframes arrive {
		from {
			translate: calc(var(--arrive, -1) * var(--error-slide));
		}
	}
</style>
