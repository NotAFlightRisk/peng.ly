import { panels } from '#lib/config.js';
import { merged } from '#lib/contributions.server.js';

export const load = async ({ fetch }) => ({
	...panels.contributions,
	contributions: await merged(fetch)
});
