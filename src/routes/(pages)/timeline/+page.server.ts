import { unlisted } from '$lib/config';
import { timeline } from '$lib/timeline.server';

export const load = async ({ fetch }) => ({ ...unlisted.timeline, moments: await timeline(fetch) });
