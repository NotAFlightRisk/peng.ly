import { site } from '$lib/config';
import { byRepo, gh } from '$lib/github.server';
import { once } from '$lib/once.server';

type Found = {
	number: number;
	title: string;
	repository_url: string;
	pull_request: { merged_at: string };
};

const search = async (fetch: typeof globalThis.fetch, where: string) => {
	const query = `author:${site.github} is:pr is:merged ${where}`;
	const found: Found[] = [];

	// GitHub stops at 1000, so newest first means it's the oldest that miss out
	for (let page = 1; page <= 10; page++) {
		const path = `search/issues?q=${encodeURIComponent(query)}&advanced_search=true&sort=created&per_page=100&page=${page}`;
		const { items } = await gh(fetch, path);
		found.push(...items);
		if (items.length < 100) break;
	}

	found.sort((a, b) => b.pull_request.merged_at.localeCompare(a.pull_request.merged_at));

	return found.map(({ number, title, repository_url, pull_request }) => ({
		repo: repository_url.split('/repos/')[1],
		number,
		title,
		merged: pull_request.merged_at
	}));
};

// PRs into other people's repos, an' into me own
export const theirs = (fetch: typeof globalThis.fetch) => once('theirs', () => search(fetch, `-user:${site.github}`));
export const mine = (fetch: typeof globalThis.fetch) => once('mine', () => search(fetch, `user:${site.github}`));

export const merged = async (fetch: typeof globalThis.fetch) => byRepo(await theirs(fetch));
