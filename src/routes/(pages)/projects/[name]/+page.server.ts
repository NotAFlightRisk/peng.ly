import { error } from '@sveltejs/kit';
import { moreApps } from '$lib/config';
import { projects } from '$lib/content';
import { repoInfo } from '$lib/github.server';
import { readme } from '$lib/readme.server';

export const load = async ({ fetch, params }) => {
	const project = projects.find(({ name }) => name === params.name);
	if (!project) error(404);

	const [info, docs] = await Promise.all([repoInfo(fetch, project.repo), readme(fetch, project.repo)]);
	const i = projects.indexOf(project);

	return {
		...project,
		...info,
		// the one-liner's a bit short for Google, so it gets a touch more
		meta: `${project.description}. Free and open source, with the code on GitHub.`,
		image: project.screenshot ? { src: project.screenshot, alt: `Screenshot of ${project.title}` } : undefined,
		// it does its own title an' widths, so the hero can spread out
		bare: true,
		readme: docs,
		// the next ones first, so they all get a look-in
		more: [...projects.slice(i + 1), ...projects.slice(0, i)].slice(0, moreApps.max)
	};
};
