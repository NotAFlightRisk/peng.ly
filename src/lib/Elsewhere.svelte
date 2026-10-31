<script lang="ts">
	import { contact } from '#lib/config.js';
	import Github from '~icons/tabler/brand-github';
	import Key from '~icons/tabler/key';
	import Shield from '~icons/tabler/shield-lock';

	const { links } = contact.elsewhere;
	const icons = { security: Shield, pgp: Key, github: Github };
</script>

<ul>
	{#each Object.entries(links) as [key, link] (key)}
		{@const Icon = icons[key as keyof typeof links]}
		<li>
			<Icon aria-hidden="true" />
			<div>
				<h3>{link.title}</h3>
				<p>{link.description}</p>
				{#if 'fingerprint' in link}
					<code>{link.fingerprint}</code>
				{/if}
				<!-- a mailto in a new tab just leaves a blank one lyin' about -->
				<a href={link.href} target={link.href.startsWith('http') ? '_blank' : undefined}>{link.label}</a>
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

	/* wraps into two rows o' five, like gpg prints it */
	code {
		display: block;
		max-width: var(--fingerprint-width);
		margin-bottom: var(--gap);
		font-family: var(--mono);
		font-size: var(--small-size);
	}

	a {
		color: var(--primary);
		font-weight: var(--button-weight);
		overflow-wrap: anywhere;
	}
</style>
