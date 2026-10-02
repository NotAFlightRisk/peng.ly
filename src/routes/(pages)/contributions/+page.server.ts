import { panels } from '$lib/config';
import { merged } from '$lib/contributions.server';

export const load = async ({ fetch }) => ({
	...panels.openSource,
	contributions: await merged(fetch)
});
