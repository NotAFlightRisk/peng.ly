import { panels } from '#lib/config.js';
import { blogPosts } from '#lib/posts.server.js';

export const load = async ({ fetch }) => ({ ...panels.writing, wide: true, posts: await blogPosts(fetch) });
