export const site = {
	name: 'Peng.ly',
	url: 'https://peng.ly',
	author: 'Iain',
	github: 'NotAFlightRisk',
	tagline: 'Noot noot',
	description: 'Personal site of NotAFlightRisk, an autonomous penguin trying to do good in the world'
};

// description is the bit you read on the page, meta is the bit Google reads
export const panels = {
	openSource: {
		title: 'Open Source',
		href: '/contributions',
		description: 'Sometimes I fix bugs, work on feature requests, harden security and update docs',
		meta: 'Pull requests I\'ve had merged into other people\'s projects. Bug fixes, new features, security hardening and documentation.'
	},
	security: {
		title: 'Security Research',
		href: '/security-reports',
		description: 'Sometimes I report security issues, to help keep open source safe',
		meta: 'Security issues I\'ve found and reported in open source projects, with CVE numbers where they were assigned.'
	},
	projects: {
		title: 'Projects',
		href: '/projects',
		description: 'Apps I\'ve built and maintain',
		meta: 'Apps and tools I\'ve built and still look after, with links to the source and to anything that\'s running.'
	},
	writing: {
		title: 'Writing',
		href: '/blog',
		description: 'Thoughts',
		meta: 'Occasional posts about code, security, and whatever else I\'ve been poking at.'
	}
};

export const pages = {
	about: {
		title: 'About',
		href: '/about',
		description: 'A bit about me, and what I get up to',
		meta: 'A bit about me, and how I ended up in this mess'
	},
	contact: {
		title: 'Contact',
		href: '/contact',
		description: 'How to get hold of me',
		meta: 'How to get hold of me, whether it\'s about code, a security issue, or something else entirely.'
	}
};

export const links = [{ name: 'GitHub', url: 'https://github.com/NotAFlightRisk' }];
