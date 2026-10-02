import { site } from '$lib/config';

export const prerender = true;

// the rules want this renewed inside a year, so every build shoves the date along
const expires = new Date();
expires.setMonth(expires.getMonth() + 11);

export const GET = () =>
	new Response(
		`Contact: mailto:${site.security}
Expires: ${expires.toISOString()}
Preferred-Languages: en
Canonical: ${new URL('.well-known/security.txt', site.url).href}
`,
		{ headers: { 'Content-Type': 'text/plain' } }
	);
