<script lang="ts">
	import { links, panels, site } from '$lib/config';

	// prerendered, so this is whenever the site was last built
	const year = new Date().getFullYear();
</script>

<footer>
	<div>
		<small>© <a href="https://github.com/{site.github}" target="_blank">{site.github}</a> {year}</small>

		<nav aria-label="Sections">
			<ul>
				{#each Object.values(panels) as { title, href } (href)}
					<li><a {href}>{title}</a></li>
				{/each}
			</ul>
		</nav>

		<ul>
			{#each links as { name, url } (url)}
				<li><a href={url} target="_blank">{name}</a></li>
			{/each}
		</ul>
	</div>
</footer>

<style>
	footer {
		margin-top: auto;
		background: var(--card);
	}

	div {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		max-width: var(--panels-width);
		margin-inline: auto;
		padding: var(--footer-padding);
		gap: var(--gap) var(--gutter);
		font-size: var(--small-size);
	}

	ul {
		display: flex;
		flex-wrap: wrap;
		gap: var(--gap) var(--list-gap);
	}

	li a {
		display: flex;
		min-height: var(--target-size);
		align-items: center;
	}

	a:hover {
		color: var(--primary);
	}

	small {
		color: var(--muted);
		font-size: inherit;
	}
</style>
