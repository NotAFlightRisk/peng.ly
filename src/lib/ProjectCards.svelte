<script lang="ts">
	import { projects } from '$lib/content';
</script>

<ul>
	{#each projects as { name, description, url, logo } (url)}
		<li>
			<h2><a href={url} target="_blank">{name}</a></h2>
			<div>
				<img src={logo} alt="" loading="lazy" />
				<p>{description}</p>
			</div>
		</li>
	{/each}
</ul>

<style>
	ul {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(min(100%, var(--card-width)), 1fr));
		gap: var(--list-gap);
	}

	li {
		position: relative;
		padding: var(--panel-padding);
		border-radius: var(--radius);
		background: var(--card);
		box-shadow: var(--panel-shadow);
		transition:
			background var(--hover-transition),
			box-shadow var(--hover-transition);
	}

	li:hover,
	li:focus-within {
		background: var(--card-hover);
		box-shadow: var(--card-hover-shadow);
	}

	li:active {
		background: var(--card-hover);
		box-shadow: var(--panel-shadow);
	}

	/* ring goes round the whole card, since that's the bit you're clickin' */
	li:has(a:focus-visible) {
		outline: var(--outline);
		outline-offset: var(--outline-offset);
	}

	a:focus-visible {
		outline: none;
	}

	h2 {
		margin: 0 0 var(--gap);
		font-size: var(--card-title-size);
		font-weight: var(--title-weight);
	}

	a {
		text-decoration: none;
		transition: color var(--hover-transition);
	}

	/* stretches the link over the whole card, so anywhere you click works */
	a::after {
		position: absolute;
		inset: 0;
		content: '';
	}

	li:hover a,
	li:focus-within a {
		color: var(--primary);
	}

	div {
		display: flex;
		align-items: start;
		gap: var(--gap);
	}

	img {
		flex-shrink: 0;
		width: var(--card-icon-size);
		height: var(--card-icon-size);
		border-radius: var(--radius);
	}

	p {
		margin: 0;
		color: var(--muted);
		font-size: var(--small-size);
	}
</style>
