import { env } from '$env/dynamic/private';
import type { Contribution } from '$lib/content';

// bung it a body an' it'll POST, which is 'ow GraphQL likes it
export const gh = async (fetch: typeof globalThis.fetch, path: string, body?: object) => {
	const response = await fetch(`https://api.github.com/${path}`, {
		method: body ? 'POST' : 'GET',
		headers: env.GITHUB_TOKEN ? { authorization: `Bearer ${env.GITHUB_TOKEN}` } : {},
		body: body && JSON.stringify(body)
	});
	if (!response.ok) throw new Error(`GitHub gave us a ${response.status} for ${path}`);
	return response.json();
};

type Thread = { repo: string; number: number; title: string };

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
