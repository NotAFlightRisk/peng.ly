import { site } from '$lib/config';

export const prerender = true;

// route groups (like pages) ain't part of the URL, so bin 'em, an' nobody wants the 404 listed
const pages = import.meta.glob(['/src/routes/**/+page.svelte', '!/src/routes/404/**']);

const paths = Object.keys(pages).map((file) =>
	file
		.replace('/src/routes', '')
		.replace('/+page.svelte', '')
		.split('/')
		.filter((part) => !part.startsWith('('))
		.join('/')
);

export const GET = () =>
	new Response(
		`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((path) => `<url><loc>${new URL(path, site.url).href}</loc></url>`).join('\n')}
</urlset>`,
		{ headers: { 'Content-Type': 'application/xml' } }
	);
