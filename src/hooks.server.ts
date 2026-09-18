import type { Handle } from '@sveltejs/kit';

// only the font gets a head start, the penguin's JS can wait its turn
export const handle: Handle = ({ event, resolve }) =>
	resolve(event, { preload: ({ type }) => type === 'font' });
