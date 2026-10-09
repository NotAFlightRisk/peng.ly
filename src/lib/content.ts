import colorCodeConvertor from '$lib/assets/color-code-convertor.svg';

// merged is when it went in, if it's a PR an' we know
export type Contribution = { repo: string; threads: { number: number; title: string; merged?: string }[] };

// the ones worth showing on the front page, as owner/repo#pr. GitHub gives us the titles
export const contributions = [
	'smartcorelib/smartcore#476',
	'sveltejs/devalue#189',
	'redis/rueidis#1026',
	'redis/rueidis#1025',
	'gotify/server#1046',
	'rust-lang/rust-forge#1110',
	'valkey-io/valkey-go#195',
	'valkey-io/valkey-go#182',
	'wazero/wazero#2540',
	'wazero/wazero#2537',
	'wazero/wazero#2553',
	'anacrolix/torrent#1099'
];

export type Report = { ghsa: string; cve?: string; title: string; repo: string };

export const reports: Report[] = [
	{
		ghsa: 'GHSA-9vw8-rf55-xvr8',
		title: 'Stored XSS via unescaped scrobble metadata',
		repo: 'krateng/maloja'
	},
	{
		ghsa: 'GHSA-vqvm-6237-5phf',
		title: 'Uncontrolled recursion in ASCII property list parser in com.googlecode.plist:dd-plist',
		repo: '3breadt/dd-plist'
	},
	{
		ghsa: 'GHSA-wgj2-p45w-v5mr',
		title: 'Path traversal in Web Report Server file upload',
		repo: 'ariacom/Seal-Report'
	},
	{
		ghsa: 'GHSA-rxxj-c5wr-phqp',
		title: 'Offline password guessing on password-protected files',
		repo: 'Skyfay/SkySend'
	},
	{
		ghsa: 'GHSA-69rc-6f6g-43xj',
		title: 'import_workbook checks only cell formulas, not names or rules',
		repo: 'haris-musa/excel-mcp-server'
	},
	{
		ghsa: 'GHSA-4j63-5v5f-xcc4',
		title: 'Dynamic-frontend remote API proxy (WithRemoteApis) skips the BFF anti-forgery header',
		repo: 'DuendeSoftware/products'
	},
	{
		ghsa: 'GHSA-x8g6-w83h-p745',
		title: 'Uncontrolled resource consumption from JSON Schema $ref expansion',
		repo: 'theagentrouter/agent-router'
	},
	{
		ghsa: 'GHSA-hf68-9v92-hfwc',
		title: 'Uncontrolled recursion in GeoJSON line simplification',
		repo: 'maplibre/geojson-vt'
	},
	{
		ghsa: 'GHSA-mm34-2v69-6vg6',
		title: 'Stack overflow decoding deeply nested dynamic protobuf messages',
		repo: 'jhump/protoreflect'
	},
	{
		ghsa: 'GHSA-26rx-6fvr-qjqg',
		title: 'mcp-memory-server HTTP transport starts without authentication',
		repo: 'doobidoo/mcp-memory-service'
	},
	{
		ghsa: 'GHSA-75h3-q43q-9338',
		title: 'URL scheme imports tokens without confirmation, bypassing App Lock',
		repo: 'Nerdykidtech/Autheris'
	},
	{
		ghsa: 'GHSA-34wm-2c8c-7wmm',
		title: 'Unsafe deserialization of descriptor JSON via unrestricted Type.GetType',
		repo: 'BpsLogicBuilder/LogicBuilder.Structures'
	},
	{
		ghsa: 'GHSA-cqgh-8p3p-mx4m',
		cve: 'CVE-2026-106121',
		title: 'JSONReader in the default JSON-RPC mapper never terminates on truncated input, causing DoS',
		repo: 'rabbitmq/rabbitmq-java-client'
	},
	{
		ghsa: 'GHSA-m8rp-22v5-pp4x',
		title: 'SQL injection via the relation join-filter query parameter',
		repo: 'daptin/daptin'
	},
	{
		ghsa: 'GHSA-4356-5g33-3qrp',
		title: 'Juju secret contents recorded in exported tracing spans',
		repo: 'canonical/operator'
	},
	{
		ghsa: 'GHSA-7m55-42q7-888r',
		title: 'Allocation of unvalidated thumbnail size causing DoS',
		repo: 'psd-tools/psd-tools'
	},
	{
		ghsa: 'GHSA-4wxf-43cv-cfxx',
		title: 'A CSS length in a style attribute drives an unbounded string allocation',
		repo: 'weblyzard/inscriptis'
	},
	{
		ghsa: 'GHSA-94fv-h7hv-365q',
		title: 'url()/@import external-resource filter bypassed by a CSS backslash-newline line continuation',
		repo: 'rhukster/dom-sanitizer'
	},
	{
		ghsa: 'GHSA-rxr4-84rf-f47h',
		title: 'Unsanitised gem name on upload allows file writes outside the gems directory',
		repo: 'geminabox/geminabox'
	},
	{
		ghsa: 'GHSA-g4wm-2vf7-vfgr',
		title: "RCE in simple-git 3.36.0 via customArgs include.path",
		repo: 'steveukx/git-js',
		cve: 'CVE-2026-102826'
	},
	{
		ghsa: 'GHSA-m5g6-wmf6-85qq',
		title: "merge-key (<<) YAML bombs bypass yq's entity-expansion guard and exhaust memory",
		repo: 'kislyuk/yq'
	},
	{
		ghsa: 'GHSA-73xg-gp6q-pw5j',
		title: 'icalendar parser recurses once per BEGIN line with no depth limit (stack-overflow DoS)',
		repo: 'icalendar/icalendar'
	},
	{
		ghsa: 'GHSA-pmpw-wwcm-r8rc',
		title: 'Quadratic .mailmap parsing in Snapshot::from_bytes allows a CPU denial of service',
		repo: 'GitoxideLabs/gitoxide'
	},
	{
		ghsa: 'GHSA-h7w2-xgxh-p66q',
		title: 'Quadratic parse time in helperFindEmphChar on a run of unmatched [',
		repo: 'gomarkdown/markdown'
	},
	{
		ghsa: 'GHSA-r4xh-jqrq-34v2',
		title: 'Quadratic-time parse() from parseKey rescanning to end of document on each key line',
		repo: 'squirrelchat/smol-toml'
	},
	{
		ghsa: 'GHSA-c2xw-vp6w-gpph',
		title: 'Compressed ID3v2 frames are decompressed without a size limit (decompression bomb)',
		repo: 'JamesHeinrich/getID3'
	},
	{
		ghsa: 'GHSA-3wh2-8x78-jfw4',
		title: 'Connection hijacking via forgeable provider-cache key',
		repo: 'libredb/libredb-studio'
	},
	{
		ghsa: 'GHSA-6w8c-5m3c-g2m8',
		title: 'Nested namespace declarations cause quadratic memory use and an uncatchable out-of-memory crash',
		repo: 'nikku/saxen'
	},
	{
		ghsa: 'GHSA-84w7-hpvm-rxx2',
		title: 'expand_shorthand! regex (RE_FUNCTIONS) backtracks exponentially on an unclosed CSS function value',
		repo: 'premailer/css_parser'
	},
	{
		ghsa: 'GHSA-jp82-f5mq-hwhp',
		cve: 'CVE-2026-104845',
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
		cve: 'CVE-2026-104182',
		title: 'JSONC parser re-scans the whole accumulated comment on every chunk, costing quadratic CPU',
		repo: 'uhop/stream-json'
	},
	{
		ghsa: 'GHSA-c475-qrg2-pj4r',
		cve: 'CVE-2026-102990',
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

export type Project = {
	name: string;
	title: string;
	description: string;
	repo: string;
	site?: string;
	logo: string;
	screenshot?: string;
	featured?: boolean;
};

// the featured ones get a big row on /projects an' a spot on the front page, the rest are mini apps
export const projects: Project[] = [
	{
		name: 'android-rom-compat',
		featured: true,
		title: 'Android ROM Compat',
		description: 'Which Android ROMs run on your phone, feature availability and bootloader unlock status',
		repo: 'NotAFlightRisk/android-rom-compat',
		site: 'https://android-rom-compat.peng.ly',
		logo: 'https://raw.githubusercontent.com/NotAFlightRisk/android-rom-compat/main/public/logo.svg',
		screenshot: 'https://pixelflare.cc/iain/screenshots/android-app-compat-screenshot/w1024'
	},
	{
		name: 'token-usage-dashboard',
		featured: true,
		title: 'Token Usage Dashboard',
		description: 'Dashboard for historical token usage for Claude, Codex and OpenCode',
		repo: 'NotAFlightRisk/token-usage-dashboard',
		logo: 'https://raw.githubusercontent.com/NotAFlightRisk/token-usage-dashboard/main/static/favicon.svg',
		screenshot: 'https://pixelflare.cc/iain/screenshots/token-usage-dashboard/w1024'
	},
	{
		name: 'track-the-gap',
		title: 'Track the Gap',
		description: 'Live London Underground headways, service gaps and train bunching, worked out from TfL predictions',
		repo: 'NotAFlightRisk/track-the-gap',
		site: 'https://track-the-gap.peng.ly',
		logo: 'https://raw.githubusercontent.com/NotAFlightRisk/track-the-gap/main/static/roundel.svg'
	},
	{
		name: 'tubespotting',
		featured: true,
		title: 'tubespotting',
		description: 'Every London Underground train on one live map, gliding between stations as TfL reports them',
		repo: 'NotAFlightRisk/tubespotting',
		site: 'https://tubespotting.peng.ly',
		logo: 'https://raw.githubusercontent.com/NotAFlightRisk/tubespotting/main/static/favicon.svg',
		screenshot: 'https://pixelflare.cc/iain/screenshots/tube-spotting/w1024'
	},
	{
		name: 'parallax',
		title: 'Parallax',
		description: 'Merge logs from several machines and line up their clocks',
		repo: 'NotAFlightRisk/parallax',
		site: 'https://parallax.peng.ly',
		logo: 'https://raw.githubusercontent.com/NotAFlightRisk/parallax/main/static/favicon.svg',
		screenshot: 'https://pixelflare.cc/iain/screenshots/parallax/w1024'
	},
	{
		name: 'color-code-convertor',
		title: 'Color Code Convertor',
		description: 'Paste a color in any format, get all seventeen others',
		repo: 'NotAFlightRisk/color-code-convertor',
		site: 'https://color-code-convertor.peng.ly',
		// its favicon's drawn in code over there, so we keep our own copy
		logo: colorCodeConvertor,
		screenshot: 'https://pixelflare.cc/iain/screenshots/color-code-convertor/w1024'
	},
	{
		name: 'statusquo',
		featured: true,
		title: 'statusquo',
		description: 'Combine GitHub, Cloudflare, npm and 50-odd other status pages into one dashboard and one RSS feed',
		repo: 'NotAFlightRisk/statusquo',
		site: 'https://statusquo.peng.ly',
		logo: 'https://statusquo.peng.ly/favicon.svg',
		screenshot: 'https://pixelflare.cc/iain/screenshots/status-quo/w1024'
	}
];

export const posts: { title: string; date: string; url: string }[] = [];
