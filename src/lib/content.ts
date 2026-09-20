export type Contribution = { repo: string; prs: { number: number; title: string }[] };

export const contributions: Contribution[] = [
	{
		repo: 'GuillaumeGomez/sysinfo',
		prs: [
			{ number: 1731, title: 'Fix thermal zone temperatures freezing after the first `Components::refresh`' },
			{ number: 1726, title: 'Fix thermal zone components being dropped by `Components::refresh`' },
			{ number: 1717, title: "linux: keep a component's max temperature across refreshes" }
		]
	},
	{
		repo: 'connectrpc/connect-go',
		prs: [
			{ number: 959, title: 'Fix panic in stream Spec and Peer when client construction failed' },
			{ number: 957, title: 'Only send a 304 when the request was a GET' },
			{ number: 956, title: 'Fix connect.WithGRPC typo in the missing client option error' }
		]
	},
	{
		repo: 'wazero/wazero',
		prs: [
			{ number: 2540, title: 'poll_oneoff: do not sleep when there is no clock subscription' },
			{ number: 2537, title: 'cmd/wazero: exit non-zero on an invalid -listen or -mount' }
		]
	},
	{
		repo: 'sidorares/node-mysql2',
		prs: [
			{ number: 4513, title: 'fix(typings): PoolCluster node events emit a string nodeId' },
			{ number: 4491, title: 'fix: zero dates come back as "undefined 00:00:00" with dateStrings' }
		]
	}
];

export type Report = { ghsa: string; cve?: string; title: string; repo: string };

export const reports: Report[] = [
	{
		ghsa: 'GHSA-jp82-f5mq-hwhp',
		title: 'Memory exhaustion via unchecked TypedArray length in JSON deserialization',
		repo: 'lxsmnsyc/seroval'
	},
	{
		ghsa: 'GHSA-8hrj-gg7r-fxg9',
		title: 'VKAppOAuth2 lets unsigned api_result override the signature-verified user id',
		repo: 'python-social-auth/social-core'
	},
	{
		ghsa: 'GHSA-mxc4-qf2j-q5xq',
		title: "Unauthenticated privacynotes:// deep link substitutes a native user's account and wipes local data",
		repo: 'LifetimeLabsDev/PrivacyNotes.app'
	},
	{
		ghsa: 'GHSA-pwgw-f7xr-863h',
		cve: 'CVE-2026-92091',
		title: 'Quadratic key_ops duplicate check in JWK.import_key allows CPU-exhaustion DoS',
		repo: 'latchset/jwcrypto'
	},
	{
		ghsa: 'GHSA-52qw-whmv-87c5',
		title: 'A SUBSCRIBE, UNSUBSCRIBE or CONNECT using an Object.prototype property name crashes the broker',
		repo: 'moscajs/aedes'
	},
	{
		ghsa: 'GHSA-97fq-v55v-9vg9',
		title: 'Name-constraint host matching is case-sensitive, bypassing excluded DNS and email subtrees',
		repo: 'MatthiasValvekens/pyHanko'
	},
	{
		ghsa: 'GHSA-xjh4-q36h-mcvv',
		title: 'Stored XSS on imported notes',
		repo: 'timothepoznanski/poznote'
	},
	{
		ghsa: 'GHSA-w27v-7q3p-w38r',
		cve: 'CVE-2026-84370',
		title: 'SVGO: removeScripts allows executable links through namespace and control-character bypasses',
		repo: 'svg/svgo'
	},
	{
		ghsa: 'GHSA-xg9p-p4jc-c46g',
		title: 'GFM autolink extension can crash the process or hang it on small untrusted Markdown',
		repo: 'kivikakk/comrak'
	},
	{
		ghsa: 'GHSA-fph4-wmhf-6fwf',
		cve: 'CVE-2026-75899',
		title: 'fast-uri vulnerable to server-side request forgery via repeated hostname percent-decoding',
		repo: 'fastify/fast-uri'
	},
	{
		ghsa: 'GHSA-hqr4-qq8f-hg3x',
		title: 'JSONC parser re-scans the whole accumulated comment on every chunk, costing quadratic CPU',
		repo: 'uhop/stream-json'
	},
	{
		ghsa: 'GHSA-c475-qrg2-pj4r',
		title: 'Quadratic-time CPU denial of service in the Client.list() Unix directory-listing parser',
		repo: 'patrickjuchli/basic-ftp'
	},
	{
		ghsa: 'GHSA-253c-mchw-3w2r',
		title: 'linkify: true has two quadratic paths, so a few hundred KB of markdown blocks the event loop',
		repo: 'markdown-it/markdown-it'
	},
	{
		ghsa: 'GHSA-53rw-qfc6-v32g',
		title: 'TLS trust bypass: AIA chain completer installs the downloaded certificate as a trust anchor',
		repo: 'KashCal/KashCal'
	},
	{
		ghsa: 'GHSA-w2f6-j622-j3mg',
		title: 'Quadratic-time ReDoS in toNumber() for decimals with a long internal zero-run',
		repo: 'NaturalIntelligence/strnum'
	}
];

export const projects = [
	{
		name: 'android-rom-compat',
		description: 'Which Android ROMs run on your phone, feature availability and bootloader unlock status',
		url: 'https://github.com/NotAFlightRisk/android-rom-compat',
		logo: 'https://raw.githubusercontent.com/NotAFlightRisk/android-rom-compat/main/public/logo.svg'
	},
	{
		name: 'ai-usage-dashboard',
		description: 'Dashboard for historical token usage for Claude, Codex and OpenCode',
		url: 'https://github.com/NotAFlightRisk/ai-usage-dashboard',
		logo: 'https://raw.githubusercontent.com/NotAFlightRisk/ai-usage-dashboard/main/static/favicon.svg'
	},
	{
		name: 'track-the-gap',
		description: 'Live London Underground headways, service gaps and train bunching, worked out from TfL predictions',
		url: 'https://github.com/NotAFlightRisk/track-the-gap',
		logo: 'https://raw.githubusercontent.com/NotAFlightRisk/track-the-gap/main/static/roundel.svg'
	},
	{
		name: 'parallax',
		description: 'Merge logs from several machines and line up their clocks',
		url: 'https://github.com/NotAFlightRisk/parallax',
		logo: 'https://raw.githubusercontent.com/NotAFlightRisk/parallax/main/static/favicon.svg'
	}
];

export const posts: { title: string; date: string; url: string }[] = [];
