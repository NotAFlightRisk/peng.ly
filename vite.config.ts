import { readFileSync, writeFileSync } from 'node:fs';
import adapter from '@sveltejs/adapter-static';
import type { Adapter } from '@sveltejs/kit';
import { sveltekit } from '@sveltejs/kit/vite';
import icons from 'unplugin-icons/vite';
import { defineConfig } from 'vite';

const files = adapter();
const routing = '.vercel/output/config.json';

// safety 'eaders for every response
const security = {
	'content-security-policy': "base-uri 'self'; form-action 'self'; frame-ancestors 'none'; object-src 'none'",
	'cross-origin-opener-policy': 'same-origin',
	'referrer-policy': 'strict-origin-when-cross-origin',
	'x-content-type-options': 'nosniff'
};

// our extra rules for Vercel's routin'
const vercel: Adapter = {
	...files,
	async adapt(builder) {
		await files.adapt(builder);
		if (!process.env.VERCEL) return;

		const config = JSON.parse(readFileSync(routing, 'utf8'));
		config.routes.unshift(
			{ src: '/.*', headers: security, continue: true },
			// fresh every build, so a week's fine
			{ src: '/avatars/.+', headers: { 'cache-control': 'public, max-age=604800' }, continue: true }
		);
		config.routes.push(
			// a missing script wants a plain 404, not our page cached for a year in its place
			{ src: `/${builder.getAppPath()}/immutable/.+`, status: 404, headers: { 'cache-control': 'no-store' } },
			{ src: '/.*', status: 404, dest: '/404' }
		);
		writeFileSync(routing, JSON.stringify(config));
	}
};

const plausible = process.env.PUBLIC_PLAUSIBLE_SCRIPT ?? '';

export default defineConfig({
	define: { 'import.meta.env.PUBLIC_PLAUSIBLE_SCRIPT': JSON.stringify(plausible) },
	plugins: [
		sveltekit({
			adapter: vercel,
			inlineStyleThreshold: Infinity,
			// inlined CSS gets proper lost finding the font without absolute paths
			paths: { relative: false }
		}),
		// only bakes in the icons we actually use, as plain ol' SVG
		icons({ compiler: 'svelte' })
	]
});
