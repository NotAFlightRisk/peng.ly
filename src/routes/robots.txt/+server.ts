import { site } from '$lib/config';

export const prerender = true;

// nothing here's worth hiding, so the crawlers can have the lot
export const GET = () =>
	new Response(`User-agent: *\nAllow: /\n\nSitemap: ${new URL('sitemap.xml', site.url).href}\n`, {
		headers: { 'Content-Type': 'text/plain' }
	});
