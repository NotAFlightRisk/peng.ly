import { pages } from '$lib/config';
import { timeline } from '$lib/timeline.server';

export const load = async ({ fetch }) => ({ ...pages.timeline, moments: await timeline(fetch) });
