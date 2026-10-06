<script lang="ts">
	import Book from '~icons/tabler/book';

	let { url, html }: { url: string; html: string } = $props();
</script>

<section aria-label="Readme">
	<a href={url} target="_blank"><Book aria-hidden="true" />{url.split('/').pop()}</a>
	<div>{@html html}</div>
</section>

<style>
	section {
		max-width: var(--page-width);
		margin-inline: auto;
		overflow: hidden;
		border-radius: var(--radius);
		background: var(--card);
		box-shadow: var(--panel-shadow);
	}

	section > a {
		display: flex;
		align-items: center;
		gap: var(--gap);
		min-height: var(--action-height);
		padding: 0 var(--panel-padding);
		border-bottom: var(--separator);
		color: var(--muted);
		font-size: var(--small-size);
	}

	section > a:hover {
		color: var(--primary);
	}

	/* it's GitHub's HTML in 'ere, so none of it's got our scopin' classes */
	div :global {
		article {
			padding: var(--panel-padding);
		}

		article > :first-child {
			margin-top: 0;
		}

		:is(article, blockquote, .markdown-alert) > :last-child {
			margin-bottom: 0;
		}

		:is(p, pre, table, ul, ol, blockquote, details, hr, .markdown-alert) {
			margin: 0 0 var(--list-gap);
		}

		:is(ul, ol) {
			padding-left: var(--readme-indent);
			list-style: revert;
		}

		li :is(ul, ol) {
			margin: 0;
		}

		.markdown-heading {
			position: relative;
			margin: var(--readme-heading-gap) 0 var(--gap);
		}

		:is(h2, h3, h4, h5, h6) {
			margin: 0;
			font-weight: var(--title-weight);
			line-height: var(--page-title-leading);
		}

		h2 {
			padding-bottom: var(--gap);
			border-bottom: var(--separator);
			font-size: var(--panel-title-size);
		}

		h3 {
			font-size: var(--card-title-size);
		}

		/* the little chain link pops up in the paddin' left of the 'eading */
		.anchor {
			position: absolute;
			inset: 0 100% 0 auto;
			display: flex;
			align-items: center;
			padding-right: var(--pr-gap);
			color: var(--muted);
			opacity: 0;
		}

		.markdown-heading:hover .anchor,
		.anchor:focus-visible {
			opacity: 1;
		}

		.octicon {
			fill: currentColor;
		}

		/* underlined an' all, as yellow on its own's no good to the colour-blind */
		a {
			color: var(--primary);
			text-decoration: underline;
		}

		img {
			max-width: 100%;
		}

		code {
			padding: var(--code-padding);
			border-radius: var(--radius);
			background: var(--bg);
			font-family: var(--mono);
			font-size: var(--code-size);
		}

		pre {
			overflow: auto;
			padding: var(--panel-padding);
			border-radius: var(--radius);
			background: var(--bg);
			font-family: var(--mono);
			font-size: var(--small-size);
		}

		pre code {
			padding: 0;
			font-size: inherit;
		}

		table {
			display: block;
			overflow: auto;
			border-collapse: collapse;
			font-size: var(--small-size);
		}

		:is(th, td) {
			padding: var(--button-padding);
			border: var(--separator);
		}

		:is(blockquote, .markdown-alert) {
			padding-left: var(--list-gap);
			border-left: var(--quote-border);
			color: var(--muted);
		}

		hr {
			border: 0;
			border-top: var(--separator);
		}

		summary {
			cursor: pointer;
		}

		.pl-k {
			color: var(--code-keyword);
		}

		.pl-c {
			color: var(--code-comment);
		}

		:is(.pl-s, .pl-pds) {
			color: var(--code-string);
		}

		:is(.pl-c1, .pl-smi, .pl-v) {
			color: var(--code-constant);
		}

		.pl-en {
			color: var(--code-entity);
		}
	}
</style>
