<script lang="ts">
	import Star from '~icons/tabler/star';
	import Fork from '~icons/tabler/git-fork';
	import Issue from '~icons/tabler/circle-dot';
	import Code from '~icons/tabler/code';
	import Licence from '~icons/tabler/license';
	import History from '~icons/tabler/history';

	type Props = {
		stars: number;
		forks: number;
		issues: number;
		language?: string;
		licence?: string;
		updated: string;
	};
	let { stars, forks, issues, language, licence, updated }: Props = $props();

	const count = new Intl.NumberFormat('en-GB', { notation: 'compact' }).format;
	const day = new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium', timeZone: 'UTC' }).format;

	// no language or licence an' that one just don't turn up
	const stats = $derived(
		[
			{ icon: Star, label: 'Stars', value: count(stars) },
			{ icon: Fork, label: 'Forks', value: count(forks) },
			{ icon: Issue, label: 'Open issues', value: count(issues) },
			{ icon: Code, label: 'Language', value: language },
			{ icon: Licence, label: 'Licence', value: licence },
			{ icon: History, label: 'Updated', value: day(new Date(updated)) }
		].filter(({ value }) => value)
	);
</script>

<dl>
	{#each stats as { icon: Icon, label, value } (label)}
		<div title={label}>
			<dt><Icon role="img" aria-label={label} /></dt>
			<dd>{value}</dd>
		</div>
	{/each}
</dl>

<style>
	dl {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: var(--gap) var(--list-gap);
		margin: 0;
		color: var(--muted);
		font-size: var(--small-size);
	}

	div,
	dt {
		display: flex;
		align-items: center;
		gap: var(--stat-gap);
	}

	dd {
		margin: 0;
	}
</style>
