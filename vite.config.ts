import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import icons from 'unplugin-icons/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		sveltekit({
			adapter: adapter(),
			inlineStyleThreshold: Infinity,
			// inlined CSS gets proper lost finding the font without absolute paths
			paths: { relative: false }
		}),
		// only bakes in the icons we actually use, as plain ol' SVG
		icons({ compiler: 'svelte' })
	]
});
