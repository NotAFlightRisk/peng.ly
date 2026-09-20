import { panels } from '$lib/config';

// a grid of cards wants more room than a column of text
export const load = () => ({ ...panels.projects, wide: true });
