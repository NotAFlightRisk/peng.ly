import { feed, pages, site } from '#lib/config.js';
import { moments } from '#lib/timeline.server.js';

export const prerender = true;

// PR titles can 'ave < an' & in 'em, which XML don't like
const escape = (text: string) => text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

const stamp = (date: string) => new Date(date).toUTCString();

export const GET = async ({ fetch }) => {
	const latest = (await moments(fetch)).slice(0, feed.max);

	const items = latest.map(({ kind, date, links: [{ title, href }], repo }) => {
		const label = pages.timeline.kinds[kind];
		return `<item>
	<title>${escape(`${label}: ${title}${repo ? ` (${repo})` : ''}`)}</title>
	<link>${escape(href)}</link>
	<guid>${escape(href)}</guid>
	<pubDate>${stamp(date)}</pubDate>
	<category>${label}</category>
</item>`;
	});

	return new Response(
		`<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
<title>${site.name}</title>
<link>${new URL('/timeline', site.url).href}</link>
<description>${escape(pages.timeline.meta)}</description>
<language>en-gb</language>
<lastBuildDate>${stamp(latest[0].date)}</lastBuildDate>
<atom:link href="${new URL(feed.href, site.url).href}" rel="self" type="application/rss+xml" />
${items.join('\n')}
</channel>
</rss>`,
		{ headers: { 'Content-Type': 'application/xml' } }
	);
};
