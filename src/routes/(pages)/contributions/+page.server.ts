import { env } from '$env/dynamic/private';
import { panels, site } from '$lib/config';
import type { Contribution } from '$lib/content';

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
		const url = `https://api.github.com/search/issues?q=${encodeURIComponent(query)}&advanced_search=true&per_page=100&page=${page}`;
		const response = await fetch(url, {
			headers: env.GITHUB_TOKEN ? { authorization: `Bearer ${env.GITHUB_TOKEN}` } : {}
		});
		if (!response.ok) throw new Error(`GitHub gave us a ${response.status} for ${url}`);

		const { items } = await response.json();
		merged.push(...items);
		if (items.length < 100) break;
	}

	merged.sort((a, b) => b.pull_request.merged_at.localeCompare(a.pull_request.merged_at));

	const repos = new Map<string, Contribution>();
	for (const { number, title, repository_url } of merged) {
		const repo = repository_url.split('/repos/')[1];
		const seen = repos.get(repo) ?? { repo, prs: [] };
		seen.prs.push({ number, title });
		repos.set(repo, seen);
	}

	// repos we've piled more than a few PRs into would 'og the whole page
	return {
		...panels.openSource,
		contributions: [...repos.values()].filter(({ prs }) => prs.length <= busiest)
	};
};
