<script lang="ts">
	import { page } from '$app/state';
	import { sections } from '$lib/config';
</script>

<nav aria-label="Main">
	<button class="button" popovertarget="menu" aria-label="Menu">
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			aria-hidden="true"
		>
			<path d="M4 6h16" /><path d="M4 12h16" /><path d="M4 18h16" />
		</svg>
	</button>

	<ul id="menu" popover>
		{#each sections as { title, href } (href)}
			<li>
				<a class="button" {href} aria-current={page.url.pathname === href ? 'page' : undefined}>
					{title}
				</a>
			</li>
		{/each}
	</ul>
</nav>

<style>
	nav {
		align-self: center;
	}

	button {
		display: grid;
		place-items: center;
		width: var(--action-height);
		height: var(--action-height);
		padding: 0;
		border: 0;
		color: inherit;
		cursor: pointer;
	}

	svg {
		width: var(--icon-size);
	}

	path {
		transform-origin: center;
	}

	/* top an' bottom bars meet in the middle an' cross over, the other one scarpers */
	nav:has(:popover-open) path:first-child {
		transform: rotate(45deg) translateY(6px);
	}

	nav:has(:popover-open) path:nth-child(2) {
		opacity: 0;
	}

	nav:has(:popover-open) path:last-child {
		transform: rotate(-45deg) translateY(-6px);
	}

	ul {
		gap: var(--gap);
		border: 0;
		background: var(--primary);
		color: inherit;
	}

	[aria-current] {
		background: var(--button-bg-current);
	}

	@media (width < 55rem) {
		/* burger goes far left, but the title still comes first for tabbin' an' screen readers */
		nav {
			order: -1;
		}

		/* hidden by 'and too, so a browser too old for popovers don't leave it stuck open */
		ul {
			display: none;
			inset: var(--nav-height) 0 auto;
			width: auto;
			padding: var(--list-gap) var(--nav-gutter);
			box-shadow: var(--hero-shadow);
			opacity: 0;
			translate: var(--menu-drop);
		}

		ul:popover-open {
			display: grid;
			opacity: 1;
			translate: none;
		}

		@starting-style {
			ul:popover-open {
				opacity: 0;
				translate: var(--menu-drop);
			}
		}

		a {
			display: flex;
			align-items: center;
			min-height: var(--action-height);
			font-size: var(--font-size);
		}
	}

	@media (width >= 55rem) {
		button {
			display: none;
		}

		/* the inset only bites if it's left open while the screen gets wider, an' parks it in the same spot */
		ul {
			position: static;
			inset: 0 calc(var(--nav-gutter) + var(--nav-avatar-size) + var(--list-gap)) auto auto;
			display: flex;
			align-items: center;
			height: var(--nav-height);
			overflow: visible;
		}
	}

	@media (prefers-reduced-motion: no-preference) {
		path,
		ul {
			transition: var(--menu-transition) allow-discrete;
		}
	}
</style>
