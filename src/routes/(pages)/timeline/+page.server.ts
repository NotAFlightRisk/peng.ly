import { pages } from '#lib/config.js';
import { timeline } from '#lib/timeline.server.js';

export const load = async ({ fetch }) => ({ ...pages.timeline, moments: await timeline(fetch) });
