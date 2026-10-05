import type { HandleClientError } from '@sveltejs/kit';

const dsn = import.meta.env.PUBLIC_SENTRY_DSN;
const sentry = dsn ? import('$lib/sentry').then(({ start }) => start(dsn)) : undefined;

export const handleError: HandleClientError = ({ error, status }) => {
	if (status >= 500) sentry?.then((capture) => capture(error));
};
