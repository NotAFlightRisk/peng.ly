import { site } from '$lib/config';
import { projects } from '$lib/content';
import { repoInfo } from '$lib/github.server';

export const prerender = true;

// route groups (like pages) ain't part of the URL, so bin 'em, an' nobody wants the 404 listed
const pages = import.meta.glob(['/src/routes/**/+page.svelte', '!/src/routes/404/**']);

const paths = Object.keys(pages)
	.map((file) =>
		file
			.replace('/src/routes', '')
			.replace('/+page.svelte', '')
			.split('/')
			.filter((part) => !part.startsWith('('))
			.join('/')
	)
	// a [name] page is one file doin' lots of pages, so they get listed one by one below
	.filter((path) => !path.includes('['));

const entry = (path: string, lastmod?: string) =>
	`<url><loc>${new URL(path, site.url).href}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}</url>`;

export const GET = async ({ fetch }) => {
	// fresh as the repo's last push
	const dated = await Promise.all(
		projects.map(async ({ name, repo }) => entry(`/projects/${name}`, (await repoInfo(fetch, repo)).stats.updated))
	);

	return new Response(
		`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...paths.map((path) => entry(path)), ...dated].join('\n')}
</urlset>`,
		{ headers: { 'Content-Type': 'application/xml' } }
	);
};
