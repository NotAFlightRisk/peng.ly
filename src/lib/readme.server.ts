import { ghHtml } from '$lib/github.server';

// relative links only make sense on GitHub, so they get pointed back at the repo
const pin = (html: string, attr: string, base: string) =>
	html
		.split(` ${attr}="`)
		.map((part, i) => {
			const end = part.indexOf('"');
			return i && !part.startsWith('#') ? new URL(part.slice(0, end), base).href + part.slice(end) : part;
		})
		.join(` ${attr}="`);

// GitHub does the markdown, we just tidy what comes back so it works over 'ere
export const readme = async (fetch: typeof globalThis.fetch, repo: string) => {
	let html = await ghHtml(fetch, `repos/${repo}/readme`);
	const path = html.split('data-path="')[1].split('"')[0];
	const url = `https://github.com/${repo}/blob/HEAD/${path}`;

	html = pin(pin(html, 'href', url), 'src', `https://raw.githubusercontent.com/${repo}/HEAD/${path}`);

	// one h1 a page, so the readme's 'eadings all drop down a peg
	for (const level of [5, 4, 3, 2, 1]) {
		html = html.replaceAll(`<h${level}`, `<h${level + 1}`).replaceAll(`</h${level}>`, `</h${level + 1}>`);
	}

	html = html
		.replaceAll('id="user-content-', 'id="')
		.replaceAll('href="#user-content-', 'href="#')
		.replaceAll('<a href="http', '<a target="_blank" href="http')
		.replaceAll('<img ', '<img loading="lazy" ');

	return { url, html };
};
