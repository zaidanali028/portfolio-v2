import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// Default values
const defaultData = { visits: 0, downloads: 0 };

// Create store with default values
export const analyticsData = writable(defaultData);

// Initialize store with localStorage data when in browser
if (browser) {
	try {
		const saved = localStorage.getItem('analytics');
		if (saved) {
			const data = JSON.parse(saved);
			analyticsData.set(data);
		}
	} catch (e) {
		console.warn('Failed to load analytics from localStorage');
	}
}

// Auto-save to localStorage when data changes
if (browser) {
	analyticsData.subscribe((value) => {
		try {
			localStorage.setItem('analytics', JSON.stringify(value));
		} catch (e) {
			console.warn('Failed to save analytics to localStorage');
		}
	});
}

// Analytics functions
export const analytics = {
	initialize() {
		// Already initialized above
	},

	incrementVisits() {
		analyticsData.update(d => ({ ...d, visits: d.visits + 1 }));
	},

	incrementDownloads() {
		analyticsData.update(d => ({ ...d, downloads: d.downloads + 1 }));
	}
};