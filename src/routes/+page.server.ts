import { contributions } from '$lib/content';
import { byRepo, gh } from '$lib/github.server';

export const load = async ({ fetch }) => {
	const prs = await Promise.all(
		contributions.map(async (ref) => {
			const [repo, number] = ref.split('#');
			const { title } = await gh(fetch, `repos/${repo}/pulls/${number}`);
			return { repo, number: Number(number), title };
		})
	);

	return { contributions: byRepo(prs) };
};
