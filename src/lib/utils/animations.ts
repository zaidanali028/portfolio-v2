import { writable } from 'svelte/store';

// Animation configuration
export const ANIMATION_CONFIG = {
	// Durations in milliseconds
	durations: {
		fast: 200,
		normal: 300,
		slow: 500,
		slower: 800,
		slowest: 1200
	},
	// Easing functions
	easings: {
		easeOut: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
		easeIn: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
		easeInOut: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
		bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
		elastic: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
	},
	// Stagger delays
	stagger: {
		fast: 50,
		normal: 100,
		slow: 150,
		slower: 200
	}
};

// Reduced motion preference store
export const prefersReducedMotion = writable(false);

// Initialize reduced motion detection
export function initializeMotionPreference() {
	if (typeof window !== 'undefined') {
		const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
		prefersReducedMotion.set(mediaQuery.matches);
		
		mediaQuery.addEventListener('change', (e) => {
			prefersReducedMotion.set(e.matches);
		});
	}
}

// Animation state store
export const animationState = writable({
	pageLoaded: false,
	sectionsVisible: new Set<string>(),
	isScrolling: false
});

// Intersection Observer utility
export function createIntersectionObserver(
	callback: (entries: IntersectionObserverEntry[]) => void,
	options: IntersectionObserverInit = {}
): IntersectionObserver | null {
	if (typeof window === 'undefined') return null;
	
	const defaultOptions: IntersectionObserverInit = {
		root: null,
		rootMargin: '0px 0px -10% 0px',
		threshold: 0.1,
		...options
	};
	
	return new IntersectionObserver(callback, defaultOptions);
}

// Scroll position utilities
export const scrollPosition = writable(0);
export const scrollDirection = writable<'up' | 'down'>('down');

let lastScrollY = 0;

export function initializeScrollTracking() {
	if (typeof window === 'undefined') return;
	
	const updateScrollPosition = () => {
		const currentScrollY = window.scrollY;
		scrollPosition.set(currentScrollY);
		
		if (currentScrollY > lastScrollY) {
			scrollDirection.set('down');
		} else if (currentScrollY < lastScrollY) {
			scrollDirection.set('up');
		}
		
		lastScrollY = currentScrollY;
		
		// Update scrolling state
		animationState.update(state => ({ ...state, isScrolling: true }));
		
		// Clear scrolling state after a delay
		clearTimeout(scrollTimeout);
		scrollTimeout = setTimeout(() => {
			animationState.update(state => ({ ...state, isScrolling: false }));
		}, 150);
	};
	
	let scrollTimeout: NodeJS.Timeout;
	
	window.addEventListener('scroll', updateScrollPosition, { passive: true });
	
	return () => {
		window.removeEventListener('scroll', updateScrollPosition);
		clearTimeout(scrollTimeout);
	};
}

// Animation keyframes
export const keyframes = {
	fadeIn: {
		from: { opacity: 0 },
		to: { opacity: 1 }
	},
	fadeInUp: {
		from: { opacity: 0, transform: 'translateY(30px)' },
		to: { opacity: 1, transform: 'translateY(0)' }
	},
	fadeInDown: {
		from: { opacity: 0, transform: 'translateY(-30px)' },
		to: { opacity: 1, transform: 'translateY(0)' }
	},
	fadeInLeft: {
		from: { opacity: 0, transform: 'translateX(-30px)' },
		to: { opacity: 1, transform: 'translateX(0)' }
	},
	fadeInRight: {
		from: { opacity: 0, transform: 'translateX(30px)' },
		to: { opacity: 1, transform: 'translateX(0)' }
	},
	scaleIn: {
		from: { opacity: 0, transform: 'scale(0.8)' },
		to: { opacity: 1, transform: 'scale(1)' }
	},
	slideInUp: {
		from: { transform: 'translateY(100%)' },
		to: { transform: 'translateY(0)' }
	},
	rotateIn: {
		from: { opacity: 0, transform: 'rotate(-10deg) scale(0.8)' },
		to: { opacity: 1, transform: 'rotate(0deg) scale(1)' }
	},
	bounceIn: {
		'0%': { opacity: 0, transform: 'scale(0.3)' },
		'50%': { opacity: 1, transform: 'scale(1.05)' },
		'70%': { transform: 'scale(0.9)' },
		'100%': { opacity: 1, transform: 'scale(1)' }
	},
	pulse: {
		'0%': { transform: 'scale(1)' },
		'50%': { transform: 'scale(1.05)' },
		'100%': { transform: 'scale(1)' }
	},
	float: {
		'0%, 100%': { transform: 'translateY(0px)' },
		'50%': { transform: 'translateY(-20px)' }
	},
	glow: {
		'0%': { boxShadow: '0 0 5px rgba(99, 102, 241, 0.5)' },
		'50%': { boxShadow: '0 0 20px rgba(99, 102, 241, 0.8)' },
		'100%': { boxShadow: '0 0 5px rgba(99, 102, 241, 0.5)' }
	}
};

// Performance utilities
export function requestAnimationFrame(callback: () => void): number {
	if (typeof window !== 'undefined' && window.requestAnimationFrame) {
		return window.requestAnimationFrame(callback);
	}
	return setTimeout(callback, 16); // Fallback for SSR
}

export function cancelAnimationFrame(id: number): void {
	if (typeof window !== 'undefined' && window.cancelAnimationFrame) {
		window.cancelAnimationFrame(id);
	} else {
		clearTimeout(id);
	}
}

// Throttle utility for scroll events
export function throttle<T extends (...args: any[]) => any>(
	func: T,
	limit: number
): (...args: Parameters<T>) => void {
	let inThrottle: boolean;
	return function(this: any, ...args: Parameters<T>) {
		if (!inThrottle) {
			func.apply(this, args);
			inThrottle = true;
			setTimeout(() => inThrottle = false, limit);
		}
	};
}

// Debounce utility
export function debounce<T extends (...args: any[]) => any>(
	func: T,
	delay: number
): (...args: Parameters<T>) => void {
	let timeoutId: NodeJS.Timeout;
	return function(this: any, ...args: Parameters<T>) {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => func.apply(this, args), delay);
	};
}

// Animation sequence utility
export class AnimationSequence {
	private animations: Array<() => Promise<void>> = [];
	
	add(animation: () => Promise<void>): this {
		this.animations.push(animation);
		return this;
	}
	
	async play(): Promise<void> {
		for (const animation of this.animations) {
			await animation();
		}
	}
	
	async playParallel(): Promise<void> {
		await Promise.all(this.animations.map(animation => animation()));
	}
	
	async playStaggered(delay: number = 100): Promise<void> {
		for (let i = 0; i < this.animations.length; i++) {
			setTimeout(() => this.animations[i](), i * delay);
		}
	}
}

// CSS custom properties for animations
export function setCSSCustomProperty(property: string, value: string): void {
	if (typeof document !== 'undefined') {
		document.documentElement.style.setProperty(property, value);
	}
}

// Generate staggered animation delays
export function generateStaggerDelay(index: number, baseDelay: number = 100): string {
	return `${index * baseDelay}ms`;
}

// Animation class utilities
export const animationClasses = {
	// Base animations
	fadeIn: 'animate-fade-in',
	fadeInUp: 'animate-fade-in-up',
	fadeInDown: 'animate-fade-in-down',
	fadeInLeft: 'animate-fade-in-left',
	fadeInRight: 'animate-fade-in-right',
	scaleIn: 'animate-scale-in',
	slideInUp: 'animate-slide-in-up',
	rotateIn: 'animate-rotate-in',
	bounceIn: 'animate-bounce-in',
	
	// Utility classes
	pulse: 'animate-pulse',
	float: 'animate-float',
	glow: 'animate-glow',
	
	// Hover effects
	hoverScale: 'hover:scale-105 transition-transform duration-300',
	hoverGlow: 'hover:shadow-lg hover:shadow-primary/25 transition-shadow duration-300',
	hoverFloat: 'hover:-translate-y-1 transition-transform duration-300',
	hoverRotate: 'hover:rotate-3 transition-transform duration-300'
};
