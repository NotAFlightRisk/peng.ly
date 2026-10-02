import { contributions } from '$lib/content';
import { merged } from '$lib/contributions.server';
import { byRepo, gh } from '$lib/github.server';

export const load = async ({ fetch }) => {
	// only wanted for a count, so if GitHub's 'avin' a moment we carry on wivout it
	const all = merged(fetch).catch(() => []);

	const prs = await Promise.all(
		contributions.map(async (ref) => {
			const [repo, number] = ref.split('#');
			const { title } = await gh(fetch, `repos/${repo}/pulls/${number}`);
			return { repo, number: Number(number), title };
		})
	);

	return {
		contributions: byRepo(prs),
		total: (await all).flatMap(({ threads }) => threads).length
	};
};
