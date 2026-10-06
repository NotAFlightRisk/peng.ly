import { error } from '@sveltejs/kit';
import { projects } from '$lib/content';
import { gh } from '$lib/github.server';
import { readme } from '$lib/readme.server';

export const load = async ({ fetch, params }) => {
	const project = projects.find(({ name }) => name === params.name);
	if (!project) error(404);

	const [repo, docs] = await Promise.all([gh(fetch, `repos/${project.repo}`), readme(fetch, project.repo)]);

	return {
		...project,
		// the one-liner's a bit short for Google, so it gets a touch more
		meta: `${project.description}. Free and open source, with the code on GitHub.`,
		image: project.screenshot ? { src: project.screenshot, alt: `Screenshot of ${project.title}` } : undefined,
		// it does its own title an' widths, so the hero can spread out
		bare: true,
		topics: repo.topics as string[],
		stats: {
			stars: repo.stargazers_count,
			forks: repo.forks_count,
			issues: repo.open_issues_count,
			language: repo.language,
			licence: repo.license?.spdx_id,
			updated: repo.pushed_at
		},
		readme: docs
	};
};
