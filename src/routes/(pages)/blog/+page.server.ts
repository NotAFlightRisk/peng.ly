import { panels } from '$lib/config';
import { blogPosts } from '$lib/posts.server';

export const load = async ({ fetch }) => ({ ...panels.writing, posts: await blogPosts(fetch) });
