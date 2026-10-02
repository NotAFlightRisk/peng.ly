import { site, unlisted } from '$lib/config';
import { byRepo, gh } from '$lib/github.server';

const query = `query ($login: String!, $after: String) {
	user(login: $login) {
		repositoryDiscussionComments(onlyAnswers: true, first: 100, after: $after) {
			pageInfo { hasNextPage endCursor }
			nodes { createdAt discussion { number title repository { nameWithOwner } } }
		}
	}
}`;

type Found = {
	createdAt: string;
	discussion: { number: number; title: string; repository: { nameWithOwner: string } };
};

export const load = async ({ fetch }) => {
	const accepted: Found[] = [];
	let after: string | null = null;

	do {
		const { data } = await gh(fetch, 'graphql', { query, variables: { login: site.github, after } });
		const { nodes, pageInfo } = data.user.repositoryDiscussionComments;
		accepted.push(...nodes);
		after = pageInfo.hasNextPage ? pageInfo.endCursor : null;
	} while (after);

	accepted.sort((a, b) => b.createdAt.localeCompare(a.createdAt));

	const answers = byRepo(
		accepted.map(({ discussion: { number, title, repository } }) => ({
			repo: repository.nameWithOwner,
			number,
			title
		}))
	);

	return { ...unlisted.answers, answers };
};
