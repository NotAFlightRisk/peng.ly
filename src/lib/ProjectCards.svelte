<script lang="ts">
	import { projects } from '$lib/content';
	import Github from '~icons/tabler/brand-github';
	import World from '~icons/tabler/world';
</script>

<ul>
	{#each projects as { name, description, repo, site, logo } (repo)}
		<li>
			<h2><a href="/projects/{name}">{name}</a></h2>
			<div>
				<img src={logo} alt="" loading="lazy" />
				<p>{description}</p>
			</div>
			<footer>
				{#if site}<a href={site} target="_blank"><World aria-hidden="true" />Website</a>{/if}
				<a href="https://github.com/{repo}" target="_blank"><Github aria-hidden="true" />Source</a>
			</footer>
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
		display: flex;
		flex-direction: column;
		overflow: hidden;
		border-radius: var(--radius);
		background: var(--card);
		box-shadow: var(--panel-shadow);
	}

	h2 {
		margin: 0;
		padding: var(--panel-padding) var(--panel-padding) var(--gap);
		font-size: var(--card-title-size);
		font-weight: var(--title-weight);
	}

	/* soaks up the spare room, so the buttons line up along the bottom of a row */
	div {
		display: flex;
		flex: 1;
		align-items: start;
		gap: var(--gap);
		padding: 0 var(--panel-padding) var(--panel-padding);
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

	footer {
		display: flex;
		border-top: var(--separator);
		background: var(--button-bg);
		font-size: var(--small-size);
		font-weight: var(--button-weight);
	}

	h2 a:hover {
		color: var(--primary);
	}

	footer a {
		display: flex;
		flex: 1;
		align-items: center;
		justify-content: center;
		gap: var(--gap);
		min-height: var(--action-height);
		transition:
			background var(--hover-transition),
			color var(--hover-transition);
	}

	footer a + a {
		border-left: var(--separator);
	}

	footer a:hover {
		background: var(--card-hover);
		color: var(--primary);
		text-decoration: none;
	}

	footer a:active {
		box-shadow: var(--button-shadow);
	}

	/* ring goes on the inside, or the card's edge would lop it off */
	footer a:focus-visible {
		outline-offset: calc(var(--outline-offset) * -1);
	}
</style>
