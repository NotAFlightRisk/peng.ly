import colorCodeConvertor from '$lib/assets/color-code-convertor.svg';
import carbonaraShot from '$lib/assets/screenshots/carbonara.webp';
import fineprintShot from '$lib/assets/screenshots/fineprint.webp';
import floodpulseShot from '$lib/assets/screenshots/floodpulse.webp';
import securityReportingToolboxShot from '$lib/assets/screenshots/security-reporting-toolbox.webp';
import trackTheGapShot from '$lib/assets/screenshots/track-the-gap.webp';
import type { pages } from '$lib/config';

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

export type Report = { ghsa: string; cve?: string; published: string; title: string; repo: string };

export const reports: Report[] = [
	{
		ghsa: 'GHSA-r6r4-5mr3-rppm',
		published: '2026-10-26',
		title: 'Read-only user can delete attachments in readable folders',
		repo: 'nilsteampassnet/TeamPass'
	},
	{
		ghsa: 'GHSA-m5mp-6m6f-wpp6',
		published: '2026-10-26',
		title: 'EnumerateEntries takes exponential time on a crafted directory tree with shared subtrees',
		repo: 'openmcdf/openmcdf'
	},
	{
		ghsa: 'GHSA-7fcj-crmh-pvhp',
		published: '2026-10-25',
		title: 'Quadratic-time tokenization of long numeric literals stalls expression evaluation',
		repo: 'mariuszgromada/MathParser.org-mXparser'
	},
	{
		ghsa: 'GHSA-78rj-pghh-vh42',
		published: '2026-10-25',
		title: "set-agent-state lets a pane answer another agent's prompt",
		repo: 'Gaurav-Gosain/tuios'
	},
	{
		ghsa: 'GHSA-q668-h56g-mfp4',
		published: '2026-10-24',
		title: 'Cross-tenant access to import profiles and runs',
		repo: 'eitchtee/WYGIWYH'
	},
	{
		ghsa: 'GHSA-rfw5-m5mm-hjvx',
		published: '2026-10-23',
		title: 'Stored XSS via group metadata in HTML export',
		repo: 'KnugiHK/WhatsApp-Chat-Exporter'
	},
	{
		ghsa: 'GHSA-g3cr-8x4q-74q3',
		published: '2026-10-22',
		title: 'Nested image brackets parse in quadratic time',
		repo: 'commonmark/commonmark-java'
	},
	{
		ghsa: 'GHSA-3x3m-2j93-w46j',
		published: '2026-10-22',
		title: 'Unbounded avatar size cache exhausts server memory',
		repo: 'go-vikunja/vikunja'
	},
	{
		ghsa: 'GHSA-57xm-4xm7-hqm3',
		published: '2026-10-22',
		title: 'Deeply nested schemas make validate.Spec and AgainstSchema recurse without bound, exhausting CPU and memory',
		repo: 'go-openapi/validate'
	},
	{
		ghsa: 'GHSA-83x4-696r-pg99',
		published: '2026-10-21',
		title: 'OIDC login can take over an existing local account',
		repo: 'timothepoznanski/poznote'
	},
	{
		ghsa: 'GHSA-mr87-qrw6-rf3g',
		published: '2026-10-21',
		title: "Leave-tab IDOR exposes any employee's leave and medical data",
		repo: 'horilla/horilla-hr'
	},
	{
		ghsa: 'GHSA-cm4c-4q74-mgmj',
		published: '2026-10-21',
		title: 'Common exec carriers classify safe, bypassing the approval gate',
		repo: 'tufantunc/ssh-mcp'
	},
	{
		ghsa: 'GHSA-23v5-9h8v-7282',
		published: '2026-10-20',
		title: 'XXE in the XSLT transform interceptor',
		repo: 'membrane/api-gateway'
	},
	{
		ghsa: 'GHSA-5mgr-r3cc-wcgf',
		published: '2026-10-19',
		title: 'Missing authorization on /api/deploy lets share tokens run SQL',
		repo: 'taleshape-com/shaper'
	},
	{
		ghsa: 'GHSA-f4p3-5486-mh7g',
		published: '2026-10-18',
		title: 'Cross-user task disclosure via the Everyone dashboard',
		repo: 'chrisvel/tududi'
	},
	{
		ghsa: 'GHSA-x2mx-f527-mxr9',
		published: '2026-10-18',
		title: 'DOM XSS in Vditor.preview media rendering bypasses sanitize',
		repo: 'Vanessa219/vditor'
	},
	{
		ghsa: 'GHSA-7w7v-2j76-mqwp',
		published: '2026-10-18',
		title: 'Unfiltered Java deserialization in the native MVStore read path',
		repo: 'nitrite/nitrite-java'
	},
	{
		ghsa: 'GHSA-j5xg-j54g-8mw6',
		published: '2026-10-17',
		title: 'Query synthesises unbounded empty rows from a crafted worksheet row index',
		repo: 'mini-software/MiniExcel'
	},
	{
		ghsa: 'GHSA-pwxw-f553-2v86',
		published: '2026-10-16',
		title: 'Open Data catalog endpoints perform no authorization',
		repo: 'rucio/rucio'
	},
	{
		ghsa: 'GHSA-qw3f-cg63-5h6f',
		published: '2026-10-15',
		title: "Backup imports can re-assign and modify another portfolio's transactions",
		repo: 'investbrainapp/investbrain'
	},
	{
		ghsa: 'GHSA-f4h2-2r6m-w59r',
		published: '2026-10-15',
		title: 'Uncontrolled XML entity expansion when reading untrusted workbooks',
		repo: 'EPPlusSoftware/EPPlus'
	},
	{
		ghsa: 'GHSA-jh54-c7gc-mvcc',
		published: '2026-10-14',
		title: 'Unescaped class attribute value allows HTML injection in inline() output',
		repo: 'Stranger6667/css-inline'
	},
	{
		ghsa: 'GHSA-697g-g6mq-w29r',
		published: '2026-10-14',
		title: 'gmsm block-cipher decryption panics on malformed IV or ciphertext',
		repo: 'emmansun/gmsm'
	},
	{
		ghsa: 'GHSA-7qcr-88c3-f9p7',
		published: '2026-10-13',
		title: 'Path traversal via unvalidated uploadId and batch-delete keys',
		repo: 'versity/versitygw'
	},
	{
		ghsa: 'GHSA-jxjx-4v2j-96qg',
		published: '2026-10-13',
		title: "Unvalidated crate bin name escapes cargo-binstall's install directory",
		repo: 'cargo-bins/cargo-binstall'
	},
	{
		ghsa: 'GHSA-g9qh-gcxj-jf82',
		published: '2026-10-13',
		title: 'Query injection via incomplete value escaping in formatQuery',
		repo: 'react-querybuilder/react-querybuilder'
	},
	{
		ghsa: 'GHSA-5729-mvhf-9gq4',
		published: '2026-10-12',
		title: 'get_objects_for_user returns objects the user lacks a required permission on',
		repo: 'django-guardian/django-guardian'
	},
	{
		ghsa: 'GHSA-vqhm-6cm7-rvcv',
		published: '2026-10-12',
		title: 'Staff-only custom fields exposed to the ticket submitter',
		repo: 'django-helpdesk/django-helpdesk'
	},
	{
		ghsa: 'GHSA-2h3h-h357-cg2q',
		published: '2026-10-11',
		title: 'Path traversal via TNEF attachment filenames',
		repo: 'Sicos1977/MSGReader'
	},
	{
		ghsa: 'GHSA-wj7m-ffj3-574h',
		published: '2026-10-11',
		title: 'Default encrypt: true sends LOGIN7 credentials in cleartext when the server declines encryption in PRELOGIN',
		repo: 'tediousjs/tedious'
	},
	{
		ghsa: 'GHSA-6wm9-v9g6-3gfp',
		published: '2026-10-11',
		title: 'SSRF via the #:schema document directive',
		repo: 'tombi-toml/tombi'
	},
	{
		ghsa: 'GHSA-v4c2-4fvx-chr3',
		published: '2026-10-09',
		title: 'Symlinked store entry escapes the gopass store root',
		repo: 'gopasspw/gopass'
	},
	{
		ghsa: 'GHSA-9vw8-rf55-xvr8',
		published: '2026-10-09',
		title: 'Stored XSS via unescaped scrobble metadata',
		repo: 'krateng/maloja'
	},
	{
		ghsa: 'GHSA-vqvm-6237-5phf',
		published: '2026-10-09',
		title: 'Uncontrolled recursion in ASCII property list parser in com.googlecode.plist:dd-plist',
		repo: '3breadt/dd-plist'
	},
	{
		ghsa: 'GHSA-wgj2-p45w-v5mr',
		published: '2026-10-09',
		title: 'Path traversal in Web Report Server file upload',
		repo: 'ariacom/Seal-Report'
	},
	{
		ghsa: 'GHSA-rxxj-c5wr-phqp',
		published: '2026-10-08',
		title: 'Offline password guessing on password-protected files',
		repo: 'Skyfay/SkySend'
	},
	{
		ghsa: 'GHSA-69rc-6f6g-43xj',
		published: '2026-10-08',
		title: 'import_workbook checks only cell formulas, not names or rules',
		repo: 'haris-musa/excel-mcp-server'
	},
	{
		ghsa: 'GHSA-4j63-5v5f-xcc4',
		published: '2026-10-07',
		title: 'Dynamic-frontend remote API proxy (WithRemoteApis) skips the BFF anti-forgery header',
		repo: 'DuendeSoftware/products'
	},
	{
		ghsa: 'GHSA-x8g6-w83h-p745',
		published: '2026-10-07',
		title: 'Uncontrolled resource consumption from JSON Schema $ref expansion',
		repo: 'theagentrouter/agent-router'
	},
	{
		ghsa: 'GHSA-hf68-9v92-hfwc',
		published: '2026-10-07',
		title: 'Uncontrolled recursion in GeoJSON line simplification',
		repo: 'maplibre/geojson-vt'
	},
	{
		ghsa: 'GHSA-mm34-2v69-6vg6',
		published: '2026-10-05',
		title: 'Stack overflow decoding deeply nested dynamic protobuf messages',
		repo: 'jhump/protoreflect'
	},
	{
		ghsa: 'GHSA-26rx-6fvr-qjqg',
		published: '2026-10-03',
		title: 'mcp-memory-server HTTP transport starts without authentication',
		repo: 'doobidoo/mcp-memory-service'
	},
	{
		ghsa: 'GHSA-75h3-q43q-9338',
		published: '2026-10-02',
		title: 'URL scheme imports tokens without confirmation, bypassing App Lock',
		repo: 'Nerdykidtech/Autheris'
	},
	{
		ghsa: 'GHSA-34wm-2c8c-7wmm',
		published: '2026-10-02',
		title: 'Unsafe deserialization of descriptor JSON via unrestricted Type.GetType',
		repo: 'BpsLogicBuilder/LogicBuilder.Structures'
	},
	{
		ghsa: 'GHSA-cqgh-8p3p-mx4m',
		published: '2026-10-01',
		cve: 'CVE-2026-106121',
		title: 'JSONReader in the default JSON-RPC mapper never terminates on truncated input, causing DoS',
		repo: 'rabbitmq/rabbitmq-java-client'
	},
	{
		ghsa: 'GHSA-m8rp-22v5-pp4x',
		published: '2026-10-01',
		title: 'SQL injection via the relation join-filter query parameter',
		repo: 'daptin/daptin'
	},
	{
		ghsa: 'GHSA-4356-5g33-3qrp',
		published: '2026-10-01',
		title: 'Juju secret contents recorded in exported tracing spans',
		repo: 'canonical/operator'
	},
	{
		ghsa: 'GHSA-7m55-42q7-888r',
		published: '2026-09-30',
		title: 'Allocation of unvalidated thumbnail size causing DoS',
		repo: 'psd-tools/psd-tools'
	},
	{
		ghsa: 'GHSA-4wxf-43cv-cfxx',
		published: '2026-09-29',
		title: 'A CSS length in a style attribute drives an unbounded string allocation',
		repo: 'weblyzard/inscriptis'
	},
	{
		ghsa: 'GHSA-94fv-h7hv-365q',
		published: '2026-09-28',
		title: 'url()/@import external-resource filter bypassed by a CSS backslash-newline line continuation',
		repo: 'rhukster/dom-sanitizer'
	},
	{
		ghsa: 'GHSA-rxr4-84rf-f47h',
		published: '2026-09-27',
		title: 'Unsanitised gem name on upload allows file writes outside the gems directory',
		repo: 'geminabox/geminabox'
	},
	{
		ghsa: 'GHSA-g4wm-2vf7-vfgr',
		published: '2026-09-26',
		title: "RCE in simple-git 3.36.0 via customArgs include.path",
		repo: 'steveukx/git-js',
		cve: 'CVE-2026-102826'
	},
	{
		ghsa: 'GHSA-m5g6-wmf6-85qq',
		published: '2026-09-26',
		title: "merge-key (<<) YAML bombs bypass yq's entity-expansion guard and exhaust memory",
		repo: 'kislyuk/yq'
	},
	{
		ghsa: 'GHSA-73xg-gp6q-pw5j',
		published: '2026-09-25',
		title: 'icalendar parser recurses once per BEGIN line with no depth limit (stack-overflow DoS)',
		repo: 'icalendar/icalendar'
	},
	{
		ghsa: 'GHSA-pmpw-wwcm-r8rc',
		published: '2026-09-25',
		title: 'Quadratic .mailmap parsing in Snapshot::from_bytes allows a CPU denial of service',
		repo: 'GitoxideLabs/gitoxide'
	},
	{
		ghsa: 'GHSA-h7w2-xgxh-p66q',
		published: '2026-09-23',
		title: 'Quadratic parse time in helperFindEmphChar on a run of unmatched [',
		repo: 'gomarkdown/markdown'
	},
	{
		ghsa: 'GHSA-r4xh-jqrq-34v2',
		published: '2026-09-22',
		title: 'Quadratic-time parse() from parseKey rescanning to end of document on each key line',
		repo: 'squirrelchat/smol-toml'
	},
	{
		ghsa: 'GHSA-c2xw-vp6w-gpph',
		published: '2026-09-22',
		title: 'Compressed ID3v2 frames are decompressed without a size limit (decompression bomb)',
		repo: 'JamesHeinrich/getID3'
	},
	{
		ghsa: 'GHSA-3wh2-8x78-jfw4',
		published: '2026-09-21',
		title: 'Connection hijacking via forgeable provider-cache key',
		repo: 'libredb/libredb-studio'
	},
	{
		ghsa: 'GHSA-6w8c-5m3c-g2m8',
		published: '2026-09-21',
		title: 'Nested namespace declarations cause quadratic memory use and an uncatchable out-of-memory crash',
		repo: 'nikku/saxen'
	},
	{
		ghsa: 'GHSA-84w7-hpvm-rxx2',
		published: '2026-09-20',
		title: 'expand_shorthand! regex (RE_FUNCTIONS) backtracks exponentially on an unclosed CSS function value',
		repo: 'premailer/css_parser'
	},
	{
		ghsa: 'GHSA-jp82-f5mq-hwhp',
		published: '2026-09-19',
		cve: 'CVE-2026-104845',
		title: 'Memory exhaustion via unchecked TypedArray length in JSON deserialization',
		repo: 'lxsmnsyc/seroval'
	},
	{
		ghsa: 'GHSA-8hrj-gg7r-fxg9',
		published: '2026-09-18',
		title: 'VKAppOAuth2 lets unsigned api_result override the signature-verified user id',
		repo: 'python-social-auth/social-core'
	},
	{
		ghsa: 'GHSA-mxc4-qf2j-q5xq',
		published: '2026-09-17',
		title: "Unauthenticated privacynotes:// deep link substitutes a native user's account and wipes local data",
		repo: 'LifetimeLabsDev/PrivacyNotes.app'
	},
	{
		ghsa: 'GHSA-pwgw-f7xr-863h',
		published: '2026-09-15',
		cve: 'CVE-2026-92091',
		title: 'Quadratic key_ops duplicate check in JWK.import_key allows CPU-exhaustion DoS',
		repo: 'latchset/jwcrypto'
	},
	{
		ghsa: 'GHSA-52qw-whmv-87c5',
		published: '2026-09-15',
		title: 'A SUBSCRIBE, UNSUBSCRIBE or CONNECT using an Object.prototype property name crashes the broker',
		repo: 'moscajs/aedes'
	},
	{
		ghsa: 'GHSA-97fq-v55v-9vg9',
		published: '2026-09-10',
		title: 'Name-constraint host matching is case-sensitive, bypassing excluded DNS and email subtrees',
		repo: 'MatthiasValvekens/pyHanko'
	},
	{
		ghsa: 'GHSA-xjh4-q36h-mcvv',
		published: '2026-09-09',
		title: 'Stored XSS on imported notes',
		repo: 'timothepoznanski/poznote'
	},
	{
		ghsa: 'GHSA-w27v-7q3p-w38r',
		published: '2026-08-24',
		cve: 'CVE-2026-84370',
		title: 'SVGO: removeScripts allows executable links through namespace and control-character bypasses',
		repo: 'svg/svgo'
	},
	{
		ghsa: 'GHSA-xg9p-p4jc-c46g',
		published: '2026-09-06',
		title: 'GFM autolink extension can crash the process or hang it on small untrusted Markdown',
		repo: 'kivikakk/comrak'
	},
	{
		ghsa: 'GHSA-fph4-wmhf-6fwf',
		published: '2026-08-23',
		cve: 'CVE-2026-75899',
		title: 'fast-uri vulnerable to server-side request forgery via repeated hostname percent-decoding',
		repo: 'fastify/fast-uri'
	},
	{
		ghsa: 'GHSA-hqr4-qq8f-hg3x',
		published: '2026-08-28',
		cve: 'CVE-2026-104182',
		title: 'JSONC parser re-scans the whole accumulated comment on every chunk, costing quadratic CPU',
		repo: 'uhop/stream-json'
	},
	{
		ghsa: 'GHSA-c475-qrg2-pj4r',
		published: '2026-08-27',
		cve: 'CVE-2026-102990',
		title: 'Quadratic-time CPU denial of service in the Client.list() Unix directory-listing parser',
		repo: 'patrickjuchli/basic-ftp'
	},
	{
		ghsa: 'GHSA-253c-mchw-3w2r',
		published: '2026-08-27',
		title: 'linkify: true has two quadratic paths, so a few hundred KB of markdown blocks the event loop',
		repo: 'markdown-it/markdown-it'
	},
	{
		ghsa: 'GHSA-53rw-qfc6-v32g',
		published: '2026-08-20',
		title: 'TLS trust bypass: AIA chain completer installs the downloaded certificate as a trust anchor',
		repo: 'KashCal/KashCal'
	},
	{
		ghsa: 'GHSA-w2f6-j622-j3mg',
		published: '2026-08-14',
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

// featured ones go big on /projects an' the front page
export const projects: Project[] = [
	{
		name: 'fineprint',
		featured: true,
		title: 'fineprint',
		description: 'Compare VPNs on logging, jurisdiction, audits and payment, with a source for every claim',
		repo: 'NotAFlightRisk/fineprint',
		site: 'https://fineprint.peng.ly',
		logo: 'https://fineprint.peng.ly/favicon.svg',
		screenshot: fineprintShot
	},
	{
		name: 'tubespotting',
		featured: true,
		title: 'Tube Spotting',
		description: 'Real-time London Underground map for live train locations',
		repo: 'NotAFlightRisk/tubespotting',
		site: 'https://tubespotting.peng.ly',
		logo: 'https://raw.githubusercontent.com/NotAFlightRisk/tubespotting/main/static/favicon.svg',
		screenshot: 'https://pixelflare.cc/iain/screenshots/tube-spotting/w1024'
	},
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
		name: 'statusquo',
		featured: true,
		title: 'statusquo',
		description: 'Combine GitHub, Cloudflare, npm and 50-odd other status pages into one dashboard and one RSS feed',
		repo: 'NotAFlightRisk/statusquo',
		site: 'https://statusquo.peng.ly',
		logo: 'https://statusquo.peng.ly/favicon.svg',
		screenshot: 'https://pixelflare.cc/iain/screenshots/status-quo/w1024'
	},
	{
		name: 'floodpulse',
		title: 'floodpulse',
		description: 'Live river levels and flood warnings across England, every gauge against its own normal',
		repo: 'NotAFlightRisk/floodpulse',
		site: 'https://floodpulse.peng.ly',
		logo: 'https://floodpulse.peng.ly/favicon.svg',
		screenshot: floodpulseShot
	},
	{
		name: 'carbonara',
		title: 'carbonara',
		description: "How clean Britain's electricity is right now, where, and when it'll be cleaner",
		repo: 'NotAFlightRisk/carbonara',
		site: 'https://carbonara.peng.ly',
		logo: 'https://carbonara.peng.ly/favicon.svg',
		screenshot: carbonaraShot
	},
	{
		name: 'security-reporting-toolbox',
		title: 'Security Reporting Toolbox',
		description: 'Find a CWE, look up CVEs and GHSAs, score CVSS, check EPSS and KEV, and build version ranges',
		repo: 'NotAFlightRisk/security-reporting-toolbox',
		site: 'https://security-reporting-toolbox.peng.ly',
		logo: 'https://raw.githubusercontent.com/NotAFlightRisk/security-reporting-toolbox/main/static/favicon.svg',
		screenshot: securityReportingToolboxShot
	},
	{
		name: 'portainer-templates-extras',
		title: 'Portainer Templates Extras',
		description: 'Tested Portainer templates for self-hosted apps, add one URL and deploy with a click',
		repo: 'NotAFlightRisk/portainer-templates-extras',
		site: 'https://portainer-templates-extras.peng.ly',
		logo: 'https://portainer-templates-extras.peng.ly/favicon.svg'
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
		name: 'parallax',
		title: 'Parallax',
		description: 'Merge logs from several machines and line up their clocks',
		repo: 'NotAFlightRisk/parallax',
		site: 'https://parallax.peng.ly',
		logo: 'https://raw.githubusercontent.com/NotAFlightRisk/parallax/main/static/favicon.svg',
		screenshot: 'https://pixelflare.cc/iain/screenshots/parallax/w1024'
	},
	{
		name: 'track-the-gap',
		title: 'Track the Gap',
		description: 'Live London Underground headways, service gaps and train bunching, worked out from TfL predictions',
		repo: 'NotAFlightRisk/track-the-gap',
		site: 'https://track-the-gap.peng.ly',
		logo: 'https://raw.githubusercontent.com/NotAFlightRisk/track-the-gap/main/static/roundel.svg',
		screenshot: trackTheGapShot
	}
];

export type Post = {
	title: string;
	description: string;
	url: string;
	date: string;
	tags: string[];
	readingMinutes: number;
};

// one dot on the timeline, wiv a link for each fing that 'appened
export type Moment = {
	kind: keyof typeof pages.timeline.kinds;
	date: string;
	links: { title: string; href: string }[];
	repo?: string;
};
