import { answered } from '$lib/answers.server';
import { unlisted } from '$lib/config';
import { projects, reports, type Moment } from '$lib/content';
import { mine, theirs } from '$lib/contributions.server';
import { repoInfo } from '$lib/github.server';
import { blogPosts } from '$lib/posts.server';

const github = (path: string) => `https://github.com/${path}`;

const moment = (kind: Moment['kind'], date: string, title: string, href: string, repo?: string): Moment => ({
	kind,
	date,
	links: [{ title, href }],
	repo
});

// every fing on its own, newest first
export const moments = async (fetch: typeof globalThis.fetch) => {
	const [external, internal, answers, posts, born] = await Promise.all([
		theirs(fetch),
		mine(fetch),
		answered(fetch),
		blogPosts(fetch),
		Promise.all(projects.map(async ({ repo }) => (await repoInfo(fetch, repo)).created))
	]);

	const shipped = internal.filter(({ repo }) => !unlisted.timeline.skip.includes(repo));

	return [
		...external.map(({ repo, number, title, merged }) => moment('theirs', merged, title, github(`${repo}/pull/${number}`), repo)),
		...shipped.map(({ repo, number, title, merged }) => moment('mine', merged, title, github(`${repo}/pull/${number}`), repo)),
		...projects.map(({ repo, description, site }, i) => moment('project', born[i], description, site ?? github(repo), repo)),
		...reports.map(({ ghsa, published, title, repo }) => moment('report', published, title, github(`${repo}/security/advisories/${ghsa}`), repo)),
		...posts.map(({ date, title, url }) => moment('post', date, title, url)),
		...answers.map(({ repo, number, title, answered }) => moment('answer', answered, title, github(`${repo}/discussions/${number}`), repo))
	].sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
};

// same again, but a day's worth o' the same fing in the same repo shares a dot
export const timeline = async (fetch: typeof globalThis.fetch) => {
	const dots = new Map<string, Moment>();
	for (const next of await moments(fetch)) {
		const key = `${next.kind} ${next.date.slice(0, 10)} ${next.repo}`;
		const seen = dots.get(key);
		if (seen) seen.links.push(...next.links);
		else dots.set(key, next);
	}
	return [...dots.values()];
};
