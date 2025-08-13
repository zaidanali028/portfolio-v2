import { get } from 'svelte/store';
import { 
	createIntersectionObserver, 
	prefersReducedMotion, 
	animationState,
	ANIMATION_CONFIG,
	generateStaggerDelay
} from '$lib/utils/animations';

// Intersection observer action for scroll-triggered animations
export function inView(
	node: HTMLElement, 
	options: {
		animation?: string;
		delay?: number;
		threshold?: number;
		rootMargin?: string;
		once?: boolean;
		onEnter?: (entry: IntersectionObserverEntry) => void;
		onExit?: (entry: IntersectionObserverEntry) => void;
	} = {}
) {
	const {
		animation = 'animate-fade-in-up',
		delay = 0,
		threshold = 0.1,
		rootMargin = '0px 0px -10% 0px',
		once = true,
		onEnter,
		onExit
	} = options;

	// Check for reduced motion preference
	const reducedMotion = get(prefersReducedMotion);
	if (reducedMotion) {
		node.style.opacity = '1';
		node.style.transform = 'none';
		return {};
	}

	// Set initial state
	node.style.opacity = '0';
	node.style.transform = 'translateY(30px)';
	node.style.transition = `opacity ${ANIMATION_CONFIG.durations.normal}ms ${ANIMATION_CONFIG.easings.easeOut}, transform ${ANIMATION_CONFIG.durations.normal}ms ${ANIMATION_CONFIG.easings.easeOut}`;

	const observer = createIntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					setTimeout(() => {
						node.style.opacity = '1';
						node.style.transform = 'translateY(0)';
						node.classList.add(animation);
						
						// Update animation state
						animationState.update(state => ({
							...state,
							sectionsVisible: new Set([...state.sectionsVisible, node.id || node.className])
						}));
						
						onEnter?.(entry);
					}, delay);

					if (once) {
						observer?.unobserve(node);
					}
				} else if (!once) {
					node.style.opacity = '0';
					node.style.transform = 'translateY(30px)';
					node.classList.remove(animation);
					onExit?.(entry);
				}
			});
		},
		{ threshold, rootMargin }
	);

	observer?.observe(node);

	return {
		destroy() {
			observer?.unobserve(node);
		}
	};
}

// Staggered animation action
export function staggerIn(
	node: HTMLElement,
	options: {
		delay?: number;
		stagger?: number;
		animation?: string;
		selector?: string;
	} = {}
) {
	const {
		delay = 0,
		stagger = ANIMATION_CONFIG.stagger.normal,
		animation = 'animate-fade-in-up',
		selector = '> *'
	} = options;

	const reducedMotion = get(prefersReducedMotion);
	if (reducedMotion) return {};

	// Handle direct child selector
	let children: NodeListOf<HTMLElement>;
	if (selector === '> *' || selector === '> div') {
		children = node.querySelectorAll(':scope > *') as NodeListOf<HTMLElement>;
	} else {
		children = node.querySelectorAll(selector) as NodeListOf<HTMLElement>;
	}
	
	// Set initial state for all children
	children.forEach((child, index) => {
		child.style.opacity = '0';
		child.style.transform = 'translateY(30px)';
		child.style.transition = `opacity ${ANIMATION_CONFIG.durations.normal}ms ${ANIMATION_CONFIG.easings.easeOut}, transform ${ANIMATION_CONFIG.durations.normal}ms ${ANIMATION_CONFIG.easings.easeOut}`;
		child.style.transitionDelay = generateStaggerDelay(index, stagger);
	});

	const observer = createIntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					setTimeout(() => {
						children.forEach((child) => {
							child.style.opacity = '1';
							child.style.transform = 'translateY(0)';
							child.classList.add(animation);
						});
					}, delay);

					observer?.unobserve(node);
				}
			});
		},
		{ threshold: 0.1 }
	);

	observer?.observe(node);

	return {
		destroy() {
			observer?.unobserve(node);
		}
	};
}

// Parallax scroll action
export function parallax(
	node: HTMLElement,
	options: {
		speed?: number;
		direction?: 'up' | 'down';
		offset?: number;
	} = {}
) {
	const { speed = 0.5, direction = 'up', offset = 0 } = options;
	
	const reducedMotion = get(prefersReducedMotion);
	if (reducedMotion) return {};

	let animationId: number;
	
	const updateParallax = () => {
		const rect = node.getBoundingClientRect();
		const scrolled = window.pageYOffset;
		const rate = scrolled * speed;
		const yPos = direction === 'up' ? -rate : rate;
		
		node.style.transform = `translateY(${yPos + offset}px)`;
		
		animationId = requestAnimationFrame(updateParallax);
	};

	const handleScroll = () => {
		cancelAnimationFrame(animationId);
		updateParallax();
	};

	window.addEventListener('scroll', handleScroll, { passive: true });
	updateParallax();

	return {
		destroy() {
			window.removeEventListener('scroll', handleScroll);
			cancelAnimationFrame(animationId);
		}
	};
}

// Hover animation action
export function hoverAnimation(
	node: HTMLElement,
	options: {
		scale?: number;
		rotate?: number;
		translateY?: number;
		duration?: number;
		easing?: string;
	} = {}
) {
	const {
		scale = 1.05,
		rotate = 0,
		translateY = 0,
		duration = ANIMATION_CONFIG.durations.normal,
		easing = ANIMATION_CONFIG.easings.easeOut
	} = options;

	const reducedMotion = get(prefersReducedMotion);
	if (reducedMotion) return {};

	node.style.transition = `transform ${duration}ms ${easing}`;

	const handleMouseEnter = () => {
		const transforms = [];
		if (scale !== 1) transforms.push(`scale(${scale})`);
		if (rotate !== 0) transforms.push(`rotate(${rotate}deg)`);
		if (translateY !== 0) transforms.push(`translateY(${translateY}px)`);
		
		node.style.transform = transforms.join(' ');
	};

	const handleMouseLeave = () => {
		node.style.transform = 'scale(1) rotate(0deg) translateY(0px)';
	};

	node.addEventListener('mouseenter', handleMouseEnter);
	node.addEventListener('mouseleave', handleMouseLeave);

	return {
		destroy() {
			node.removeEventListener('mouseenter', handleMouseEnter);
			node.removeEventListener('mouseleave', handleMouseLeave);
		}
	};
}

// Magnetic hover effect action
export function magneticHover(
	node: HTMLElement,
	options: {
		strength?: number;
		duration?: number;
	} = {}
) {
	const { strength = 0.3, duration = ANIMATION_CONFIG.durations.fast } = options;
	
	const reducedMotion = get(prefersReducedMotion);
	if (reducedMotion) return {};

	node.style.transition = `transform ${duration}ms ${ANIMATION_CONFIG.easings.easeOut}`;

	const handleMouseMove = (e: MouseEvent) => {
		const rect = node.getBoundingClientRect();
		const centerX = rect.left + rect.width / 2;
		const centerY = rect.top + rect.height / 2;
		
		const deltaX = (e.clientX - centerX) * strength;
		const deltaY = (e.clientY - centerY) * strength;
		
		node.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
	};

	const handleMouseLeave = () => {
		node.style.transform = 'translate(0px, 0px)';
	};

	node.addEventListener('mousemove', handleMouseMove);
	node.addEventListener('mouseleave', handleMouseLeave);

	return {
		destroy() {
			node.removeEventListener('mousemove', handleMouseMove);
			node.removeEventListener('mouseleave', handleMouseLeave);
		}
	};
}

// Typewriter effect action
export function typewriter(
	node: HTMLElement,
	options: {
		text: string;
		speed?: number;
		delay?: number;
		cursor?: boolean;
	} = { text: '' }
) {
	const { text, speed = 50, delay = 0, cursor = true } = options;
	
	const reducedMotion = get(prefersReducedMotion);
	if (reducedMotion) {
		node.textContent = text;
		return {};
	}

	let currentIndex = 0;
	let timeoutId: NodeJS.Timeout;

	const type = () => {
		if (currentIndex < text.length) {
			node.textContent = text.slice(0, currentIndex + 1) + (cursor ? '|' : '');
			currentIndex++;
			timeoutId = setTimeout(type, speed);
		} else if (cursor) {
			// Remove cursor when done
			setTimeout(() => {
				node.textContent = text;
			}, 500);
		}
	};

	timeoutId = setTimeout(type, delay);

	return {
		destroy() {
			clearTimeout(timeoutId);
		}
	};
}

// Morphing shape action
export function morphShape(
	node: HTMLElement,
	options: {
		shapes: string[];
		duration?: number;
		interval?: number;
	} = { shapes: [] }
) {
	const { shapes, duration = 1000, interval = 3000 } = options;
	
	if (shapes.length === 0) return {};
	
	const reducedMotion = get(prefersReducedMotion);
	if (reducedMotion) return {};

	let currentIndex = 0;
	let intervalId: NodeJS.Timeout;

	const morph = () => {
		node.style.clipPath = shapes[currentIndex];
		node.style.transition = `clip-path ${duration}ms ${ANIMATION_CONFIG.easings.easeInOut}`;
		
		currentIndex = (currentIndex + 1) % shapes.length;
	};

	// Start morphing
	morph();
	intervalId = setInterval(morph, interval);

	return {
		destroy() {
			clearInterval(intervalId);
		}
	};
}

// Glitch effect action
export function glitchEffect(
	node: HTMLElement,
	options: {
		intensity?: number;
		duration?: number;
		interval?: number;
	} = {}
) {
	const { intensity = 5, duration = 200, interval = 3000 } = options;
	
	const reducedMotion = get(prefersReducedMotion);
	if (reducedMotion) return {};

	let intervalId: NodeJS.Timeout;

	const glitch = () => {
		const originalTransform = node.style.transform;
		
		// Apply glitch effect
		node.style.transform = `translate(${Math.random() * intensity - intensity/2}px, ${Math.random() * intensity - intensity/2}px)`;
		node.style.filter = 'hue-rotate(90deg)';
		
		setTimeout(() => {
			node.style.transform = originalTransform;
			node.style.filter = 'none';
		}, duration);
	};

	intervalId = setInterval(glitch, interval);

	return {
		destroy() {
			clearInterval(intervalId);
		}
	};
}
