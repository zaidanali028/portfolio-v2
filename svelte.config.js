import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// Configure for static site generation (GitHub Pages)
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: undefined,
			precompress: false,
			strict: true
		}),
		paths: {
			base: process.argv.includes('dev') ? '' : process.env.BASE_PATH || ''
		},
		prerender: {
			handleHttpError: ({ path, referrer, message }) => {
				// Ignore common static file 404s during prerendering
				const ignoredPaths = [
					'/favicon.ico',
					'/robots.txt',
					'/sitemap.xml',
					'/manifest.json'
				];

				const ignoredExtensions = ['.ico', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp'];

				// Check if path should be ignored
				if (ignoredPaths.includes(path) || ignoredExtensions.some(ext => path.endsWith(ext))) {
					console.warn(`Ignoring 404 for static file: ${path}`);
					return;
				}

				// For other errors, throw to maintain error visibility
				throw new Error(`${message} (${path})`);
			},
			entries: ['*']
		}
	}
};

export default config;
