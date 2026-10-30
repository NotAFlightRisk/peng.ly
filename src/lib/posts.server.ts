import { site } from '#lib/config.js';
import type { Post } from '#lib/content.js';
import { once } from '#lib/once.server.js';

// the blog keeps its own list, newest first
export const blogPosts = (fetch: typeof globalThis.fetch) =>
	once('posts', async (): Promise<Post[]> => {
		const response = await fetch(new URL('/api/posts.json', site.blog));
		if (!response.ok) throw new Error(`The blog gave us a ${response.status} for its posts`);
		return (await response.json()).posts;
	});
