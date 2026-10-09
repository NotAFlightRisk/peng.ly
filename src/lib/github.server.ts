import { env } from '$env/dynamic/private';
import type { Contribution } from '$lib/content';

const ask = async (fetch: typeof globalThis.fetch, path: string, init: RequestInit) => {
	const headers = new Headers(init.headers);
	if (env.GITHUB_TOKEN) headers.set('authorization', `Bearer ${env.GITHUB_TOKEN}`);
	const response = await fetch(`https://api.github.com/${path}`, { ...init, headers });
	if (!response.ok) throw new Error(`GitHub gave us a ${response.status} for ${path}`);
	return response;
};

// bung it a body an' it'll POST, which is 'ow GraphQL likes it
export const gh = async (fetch: typeof globalThis.fetch, path: string, body?: object) =>
	(await ask(fetch, path, body ? { method: 'POST', body: JSON.stringify(body) } : {})).json();

// same again, but any markdown comes back as the HTML GitHub would show
export const ghHtml = async (fetch: typeof globalThis.fetch, path: string) =>
	(await ask(fetch, path, { headers: { accept: 'application/vnd.github.html+json' } })).text();

// a repo's stats, plus topics for the search engines
export const repoInfo = async (fetch: typeof globalThis.fetch, repo: string) => {
	const info = await gh(fetch, `repos/${repo}`);
	return {
		topics: info.topics as string[],
		stats: {
			stars: info.stargazers_count,
			language: info.language,
			// GitHub for "dunno which licence"
			licence: info.license?.spdx_id === 'NOASSERTION' ? undefined : info.license?.spdx_id,
			updated: info.pushed_at
		}
	};
};

type Thread = { repo: string; number: number; title: string; merged?: string };

// one entry per repo, in the order they first turn up
export const byRepo = (threads: Thread[]) => {
	const repos = new Map<string, Contribution>();
	for (const { repo, ...thread } of threads) {
		const seen = repos.get(repo) ?? { repo, threads: [] };
		seen.threads.push(thread);
		repos.set(repo, seen);
	}
	return [...repos.values()];
};
