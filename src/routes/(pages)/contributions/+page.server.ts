import { panels, site } from '$lib/config';
import { byRepo, gh } from '$lib/github.server';

const query = `author:${site.github} is:pr is:merged -user:${site.github} -user:lissy93`;
const busiest = 20;

type Found = {
	number: number;
	title: string;
	repository_url: string;
	pull_request: { merged_at: string };
};

export const load = async ({ fetch }) => {
	const merged: Found[] = [];

	for (let page = 1; page <= 10; page++) {
		const path = `search/issues?q=${encodeURIComponent(query)}&advanced_search=true&per_page=100&page=${page}`;
		const { items } = await gh(fetch, path);
		merged.push(...items);
		if (items.length < 100) break;
	}

	merged.sort((a, b) => b.pull_request.merged_at.localeCompare(a.pull_request.merged_at));

	const repos = byRepo(
		merged.map(({ number, title, repository_url }) => ({
			repo: repository_url.split('/repos/')[1],
			number,
			title
		}))
	);

	// repos we've piled more than a few PRs into would 'og the whole page
	return { ...panels.openSource, contributions: repos.filter(({ prs }) => prs.length <= busiest) };
};
