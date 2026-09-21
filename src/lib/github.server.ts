import { env } from '$env/dynamic/private';
import type { Contribution } from '$lib/content';

export const gh = async (fetch: typeof globalThis.fetch, path: string) => {
	const response = await fetch(`https://api.github.com/${path}`, {
		headers: env.GITHUB_TOKEN ? { authorization: `Bearer ${env.GITHUB_TOKEN}` } : {}
	});
	if (!response.ok) throw new Error(`GitHub gave us a ${response.status} for ${path}`);
	return response.json();
};

type Pr = { repo: string; number: number; title: string };

// one entry per repo, in the order they first turn up
export const byRepo = (prs: Pr[]) => {
	const repos = new Map<string, Contribution>();
	for (const { repo, ...pr } of prs) {
		const seen = repos.get(repo) ?? { repo, prs: [] };
		seen.prs.push(pr);
		repos.set(repo, seen);
	}
	return [...repos.values()];
};
