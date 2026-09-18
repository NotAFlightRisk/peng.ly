import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		sveltekit({
			adapter: adapter(),
			inlineStyleThreshold: Infinity,
			// inlined CSS gets proper lost finding the font without absolute paths
			paths: { relative: false }
		})
	]
});
