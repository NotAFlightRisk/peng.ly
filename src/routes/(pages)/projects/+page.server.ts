import { panels } from '#lib/config.js';
import { projects } from '#lib/content.js';
import { repoInfo } from '#lib/github.server.js';

export const load = async ({ fetch }) => ({
	...panels.projects,
	// a grid of cards wants more room than a column of text
	wide: true,
	featured: await Promise.all(
		projects
			.filter((project) => project.featured)
			.map(async (project) => ({ ...project, ...(await repoInfo(fetch, project.repo)) }))
	),
	mini: projects.filter((project) => !project.featured)
});
