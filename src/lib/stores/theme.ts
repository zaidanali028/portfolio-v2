import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// Create a writable store for theme - start with system preference or default to dark
function createThemeStore() {
	const { subscribe, set, update } = writable(true);

	return {
		subscribe,
		toggle: () => update(dark => {
			const newTheme = !dark;
			if (browser) {
				// Update localStorage
				localStorage.setItem('theme', newTheme ? 'dark' : 'light');
				// Update document class
				updateDocumentClass(newTheme);
			}
			return newTheme;
		}),
		initialize: () => {
			if (browser) {
				const savedTheme = localStorage.getItem('theme');
				const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
				const shouldBeDark = savedTheme ? savedTheme === 'dark' : prefersDark;

				console.log('Theme: Initializing with saved:', savedTheme, 'prefers:', prefersDark, 'final:', shouldBeDark ? 'dark' : 'light');
				set(shouldBeDark);
				updateDocumentClass(shouldBeDark);
			}
		}
	};
}

function updateDocumentClass(isDark: boolean) {
	if (browser) {
		// Add transition class for smooth theme switching
		document.documentElement.classList.add('theme-transitioning');

		// Create ripple effect from theme toggle button (with delay to ensure DOM is ready)
		setTimeout(() => {
			createThemeRipple();
		}, 50);

		if (isDark) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}

		// Remove transition class after animation completes
		setTimeout(() => {
			document.documentElement.classList.remove('theme-transitioning');
		}, 500);
	}
}

function createThemeRipple() {
	try {
		// Find the theme toggle button
		const themeButton = document.querySelector('[aria-label="Toggle theme"]') as HTMLElement;
		if (!themeButton) return;

		// Create ripple element
		const ripple = document.createElement('div');
		ripple.className = 'theme-ripple';

		// Position ripple at button center
		const rect = themeButton.getBoundingClientRect();
		const centerX = rect.left + rect.width / 2;
		const centerY = rect.top + rect.height / 2;

		ripple.style.left = centerX + 'px';
		ripple.style.top = centerY + 'px';

		// Add to document
		document.body.appendChild(ripple);

		// Trigger animation
		requestAnimationFrame(() => {
			ripple.classList.add('animate');
		});

		// Remove after animation
		setTimeout(() => {
			try {
				if (ripple?.parentNode) {
					document.body.removeChild(ripple);
				}
			} catch (e) {
				console.warn('Failed to remove theme ripple:', e);
			}
		}, 800);
	} catch (e) {
		console.warn('Failed to create theme ripple:', e);
	}
}

export const isDarkMode = createThemeStore();
