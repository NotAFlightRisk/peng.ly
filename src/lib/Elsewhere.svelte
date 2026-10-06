<script lang="ts">
	import { contact } from '$lib/config';
	import Github from '~icons/tabler/brand-github';
	import Shield from '~icons/tabler/shield-lock';

	const { links } = contact.elsewhere;
	const icons = { security: Shield, github: Github };
</script>

<ul>
	{#each Object.entries(links) as [key, { title, description, label, href }] (key)}
		{@const Icon = icons[key as keyof typeof links]}
		<li>
			<Icon aria-hidden="true" />
			<div>
				<h3>{title}</h3>
				<p>{description}</p>
				<!-- a mailto in a new tab just leaves a blank one lyin' about -->
				<a {href} target={href.startsWith('http') ? '_blank' : undefined}>{label}</a>
			</div>
		</li>
	{/each}
</ul>

<style>
	li {
		display: flex;
		align-items: start;
		gap: var(--list-gap);
	}

	li + li {
		margin-top: var(--list-gap);
		padding-top: var(--list-gap);
		border-top: var(--separator);
	}

	li > :global(svg) {
		flex-shrink: 0;
		width: var(--icon-size);
		height: var(--icon-size);
		color: var(--primary);
	}

	h3 {
		margin: 0;
		font-size: var(--font-size);
		font-weight: var(--title-weight);
		line-height: var(--title-leading);
		letter-spacing: var(--title-tracking);
	}

	p {
		margin: var(--gap) 0;
		color: var(--muted);
		font-size: var(--small-size);
	}

	a {
		color: var(--primary);
		font-weight: var(--button-weight);
		overflow-wrap: anywhere;
	}
</style>
