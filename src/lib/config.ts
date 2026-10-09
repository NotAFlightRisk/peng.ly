export const site = {
	name: 'Peng.ly',
	url: 'https://peng.ly',
	author: 'Iain',
	github: 'NotAFlightRisk',
	security: 'security@peng.ly',
	// tints the browser's toolbar, so keep it the same as --primary
	color: '#febc20',
	tagline: 'Noot noot',
	description: 'Personal site of NotAFlightRisk, an autonomous penguin trying to do good in the world'
};

// description is the bit you read on the page, meta is the bit Google reads
export const panels = {
	contributions: {
		title: 'Contributions',
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

// the little 'uns, under the featured ones on /projects
export const miniApps = {
	title: 'Mini Apps',
	description: 'Smaller tools that each do one job. Think little penguin, not emperor.'
};

// the rest, at the bottom of each project's page
export const moreApps = {
	title: 'More Apps',
	description: 'Plenty more fish in the sea. Here\'s what else I\'ve built.',
	max: 12
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
		description: 'Got a question, an idea, or just fancy saying noot? Whatever you send here lands straight in my inbox.',
		meta: 'How to get hold of me, whether it\'s about code, a security issue, or something else entirely.'
	}
};

// the form posts to the worker in /worker, which reads this file an' all, so no Svelte bits in 'ere
export const contact = {
	title: 'Send a message',
	action: '/api/contact',
	from: 'contact@peng.ly',
	limits: { name: 100, email: 254, message: 5000 },
	// a box only bots can see, so anyfin' in it gets binned
	trap: 'website',
	// for the stuff that's better off somewhere other than the form
	elsewhere: {
		title: 'Elsewhere',
		links: {
			security: {
				title: 'Found a security issue?',
				description: 'Email it to me, so you can attach a proof of concept.',
				label: site.security,
				href: `mailto:${site.security}`
			},
			github: {
				title: 'Bug or feature idea?',
				description: 'Open an issue on the project\'s repo, so others can follow along.',
				label: `@${site.github}`,
				href: `https://github.com/${site.github}`
			}
		}
	},
	// the worker's answers, shown by the form or as /contact/<outcome> wivout JS
	outcomes: {
		sent: {
			title: 'Noot noot!',
			description: 'That\'s penguin for thanks, your message is on its way. I\'ll reply to the email you gave as soon as I can.'
		},
		failed: {
			title: 'Noot delivered',
			description: 'That\'s penguin for message not delivered. Something broke on my end, so give it another go. What you wrote should still be there.'
		},
		limited: {
			title: 'Noot so fast',
			description: 'That\'s a lot of messages in one go. Have a breather, then try again in a minute.'
		}
	}
};

// the lot that gets a link in the header an' footer, so add one an' their breakpoints want shiftin'
export const sections = [panels.projects, panels.security, panels.writing, panels.contributions, pages.about, pages.contact];

// what the error page says, lost is a 404 an' broken is anyfin' else
export const errors = {
	lost: {
		title: 'Noot found',
		description: 'That\'s penguin for page not found. The link might be old, or the address might have a typo.'
	},
	broken: {
		title: 'Noot working',
		description: 'Something broke on my end. Give it another go in a minute.'
	}
};

// nuffin' links to these yet, the sitemap's the only way in
export const unlisted = {
	answers: {
		title: 'Answers',
		description: 'Occasionally I answer questions on the codebases I\'m familiar with...',
		meta: 'Questions I\'ve answered in GitHub Discussions, where my reply was marked as the accepted answer.'
	}
};

export const links =[{ name: 'GitHub', url: 'https://github.com/NotAFlightRisk' }];
