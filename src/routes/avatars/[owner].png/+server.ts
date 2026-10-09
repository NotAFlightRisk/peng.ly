import { error } from '@sveltejs/kit';

export const prerender = true;

// GitHub only caches 'em five minutes, so we keep our own
export const GET = async ({ fetch, params }) => {
	const avatar = await fetch(`https://github.com/${params.owner}.png?size=64`);
	if (!avatar.ok) error(avatar.status);

	return new Response(avatar.body, { headers: { 'content-type': avatar.headers.get('content-type') ?? 'image/png' } });
};
