import { readFileSync, writeFileSync } from 'node:fs';
import adapter from '@sveltejs/adapter-static';
import type { Adapter } from '@sveltejs/kit';
import { sveltekit } from '@sveltejs/kit/vite';
import icons from 'unplugin-icons/vite';
import { defineConfig } from 'vite';

const files = adapter();
const routing = '.vercel/output/config.json';

// Vercel only shows our 404 page at /404, so this tells it to use it for anyfin' it can't find
const vercel: Adapter = {
	...files,
	async adapt(builder) {
		await files.adapt(builder);
		if (!process.env.VERCEL) return;

		const config = JSON.parse(readFileSync(routing, 'utf8'));
		config.routes.push(
			// a missing script wants a plain 404, not our page cached for a year in its place
			{ src: `/${builder.getAppPath()}/immutable/.+`, status: 404, headers: { 'cache-control': 'no-store' } },
			{ src: '/.*', status: 404, dest: '/404' }
		);
		writeFileSync(routing, JSON.stringify(config));
	}
};

export default defineConfig({
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
