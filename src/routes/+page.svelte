<script lang="ts">
	import { site } from '$lib/config';
	import Penguin from '$lib/Penguin.svelte';
</script>

<header>
	<h1>{site.name}</h1>
	<Penguin />
</header>

<style>
	header {
		display: flex;
		flex-wrap: wrap;
		align-items: end;
		align-content: end;
		justify-content: end;
		min-height: var(--hero-height);
		padding: 0 var(--gutter);
		overflow: hidden;
		background: var(--primary);
		color: var(--primary-text);
	}

	h1 {
		margin: 0 auto var(--title-gap) 0;
		font-size: var(--title-size);
		font-weight: var(--title-weight);
		line-height: var(--title-leading);
		letter-spacing: var(--title-tracking);
	}

	@supports (animation-timeline: scroll()) {
		@media (prefers-reduced-motion: no-preference) {
			/* scrolls off till there's just a nav's worth left, then stays put */
			header {
				position: sticky;
				top: calc(var(--nav-height) - var(--hero-height));
				z-index: 1;
				animation: shrink linear both;
				animation-timeline: scroll();
				animation-range: 0 calc(var(--hero-height) - var(--nav-height));
			}
		}
	}

	@keyframes shrink {
		to {
			padding-inline: var(--nav-gutter);
			--title-size: var(--nav-title-size);
			--title-gap: var(--nav-title-gap);
			--avatar-size: var(--nav-avatar-size);
		}
	}
</style>
