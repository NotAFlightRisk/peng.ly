import { captureException, init } from '@sentry/browser';

export function start(dsn: string) {
	init({
		dsn,
		sendClientReports: false,
		integrations: (all) => all.filter(({ name }) => name !== 'BrowserSession')
	});
	return captureException;
}
