import { site } from '$lib/config';
import { byRepo, gh } from '$lib/github.server';

const query = `author:${site.github} is:pr is:merged -user:${site.github} -user:lissy93`;
const busiest = 20;

type Found = {
	number: number;
	title: string;
	repository_url: string;
	pull_request: { merged_at: string };
};

const search = async (fetch: typeof globalThis.fetch) => {
	const found: Found[] = [];

	for (let page = 1; page <= 10; page++) {
		const path = `search/issues?q=${encodeURIComponent(query)}&advanced_search=true&per_page=100&page=${page}`;
		const { items } = await gh(fetch, path);
		found.push(...items);
		if (items.length < 100) break;
	}

	found.sort((a, b) => b.pull_request.merged_at.localeCompare(a.pull_request.merged_at));

	const repos = byRepo(
		found.map(({ number, title, repository_url, pull_request }) => ({
			repo: repository_url.split('/repos/')[1],
			number,
			title,
			merged: pull_request.merged_at
		}))
	);

	// repos we've piled more than a few PRs into would 'og the whole page
	return repos.filter(({ threads }) => threads.length <= busiest);
};

let asked: ReturnType<typeof search> | undefined;

// the front page an' the full list both want this, so GitHub only gets asked the once
export const merged = (fetch: typeof globalThis.fetch) =>
	(asked ??= search(fetch).catch((error) => {
		// a duff answer don't get remembered, so the next one to ask tries again
		asked = undefined;
		throw error;
	}));
