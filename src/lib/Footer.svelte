<script lang="ts">
	import { links, pages, panels, site } from '$lib/config';

	// prerendered, so this is whenever the site was last built
	const year = new Date().getFullYear();
	const sections = [...Object.values(panels), ...Object.values(pages)];
</script>

<footer>
	<small>© <a href="https://github.com/{site.github}" target="_blank">{site.github}</a> {year}</small>

	<nav aria-label="Sections">
		<ul>
			{#each sections as { title, href } (href)}
				<li><a {href}>{title}</a></li>
			{/each}
		</ul>
	</nav>

	<ul>
		{#each links as { name, url } (url)}
			<li><a href={url} target="_blank">{name}</a></li>
		{/each}
	</ul>
</footer>

<style>
	footer {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		margin-top: auto;
		padding: var(--footer-padding);
		background: var(--card);
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

	@media (width >= 55rem) {
		/* hairlines between the middle links, while they're all sat on one line */
		nav li + li {
			border-left: var(--separator);
			padding-left: var(--list-gap);
		}

		/* matching flanks, so the nav lands dead centre */
		small,
		footer > ul {
			flex: 1;
			min-width: fit-content;
		}

		footer > ul {
			justify-content: end;
		}
	}

	@media (width < 55rem) {
		footer,
		ul {
			justify-content: center;
		}
	}
</style>
