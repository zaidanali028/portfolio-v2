import { base } from '$app/paths';

/**
 * Get the full path for a static asset, including the base path for GitHub Pages deployment
 * @param path - The asset path relative to the static directory (should start with /)
 * @returns The full asset path including base path
 */
export function getAssetPath(path: string): string {
	// Ensure path starts with /
	const normalizedPath = path.startsWith('/') ? path : `/${path}`;
	return `${base}${normalizedPath}`;
}

/**
 * Get the full path for an image asset
 * @param imagePath - The image path relative to the static directory
 * @returns The full image path including base path
 */
export function getImagePath(imagePath: string): string {
	return getAssetPath(imagePath);
}
