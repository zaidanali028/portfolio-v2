<script lang="ts">
	import { onMount } from 'svelte';
	import { prefersReducedMotion, scrollPosition } from '$lib/utils/animations';
	import { get } from 'svelte/store';

	interface Particle {
		id: number;
		x: number;
		y: number;
		vx: number;
		vy: number;
		size: number;
		opacity: number;
		color: string;
		type: 'dot' | 'star' | 'triangle' | 'square';
		life: number;
		maxLife: number;
	}

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;
	let particles: Particle[] = [];
	let animationId: number;
	let mouseX = 0;
	let mouseY = 0;
	let isMouseMoving = false;

	const PARTICLE_COUNT = 50;
	const colors = ['#6366f1', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b'];

	onMount(() => {
		const reducedMotion = get(prefersReducedMotion);
		if (reducedMotion) return;

		// Small delay to ensure DOM is ready
		setTimeout(() => {
			if (canvas) {
				ctx = canvas.getContext('2d')!;
				resizeCanvas();
				initParticles();
				animate();
			}
		}, 100);

		const handleResize = () => resizeCanvas();
		const handleMouseMove = (e: MouseEvent) => {
			mouseX = e.clientX;
			mouseY = e.clientY;
			isMouseMoving = true;
			setTimeout(() => isMouseMoving = false, 100);
		};

		window.addEventListener('resize', handleResize);
		window.addEventListener('mousemove', handleMouseMove);

		return () => {
			window.removeEventListener('resize', handleResize);
			window.removeEventListener('mousemove', handleMouseMove);
			if (animationId) {
				cancelAnimationFrame(animationId);
			}
		};
	});

	function resizeCanvas() {
		if (!canvas) return;
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	}

	function initParticles() {
		particles = [];
		for (let i = 0; i < PARTICLE_COUNT; i++) {
			particles.push(createParticle(i));
		}
	}

	function createParticle(id: number): Particle {
		const types: Particle['type'][] = ['dot', 'star', 'triangle', 'square'];
		return {
			id,
			x: Math.random() * canvas.width,
			y: Math.random() * canvas.height,
			vx: (Math.random() - 0.5) * 0.5,
			vy: (Math.random() - 0.5) * 0.5,
			size: Math.random() * 3 + 1,
			opacity: Math.random() * 0.5 + 0.1,
			color: colors[Math.floor(Math.random() * colors.length)],
			type: types[Math.floor(Math.random() * types.length)],
			life: 0,
			maxLife: Math.random() * 1000 + 500
		};
	}

	function drawParticle(particle: Particle) {
		if (!ctx) return;

		ctx.save();
		ctx.globalAlpha = particle.opacity;
		ctx.fillStyle = particle.color;
		ctx.strokeStyle = particle.color;
		ctx.lineWidth = 1;

		const x = particle.x;
		const y = particle.y;
		const size = particle.size;

		switch (particle.type) {
			case 'dot':
				ctx.beginPath();
				ctx.arc(x, y, size, 0, Math.PI * 2);
				ctx.fill();
				break;
			
			case 'star':
				drawStar(x, y, size);
				break;
			
			case 'triangle':
				ctx.beginPath();
				ctx.moveTo(x, y - size);
				ctx.lineTo(x - size, y + size);
				ctx.lineTo(x + size, y + size);
				ctx.closePath();
				ctx.fill();
				break;
			
			case 'square':
				ctx.fillRect(x - size/2, y - size/2, size, size);
				break;
		}

		ctx.restore();
	}

	function drawStar(x: number, y: number, size: number) {
		if (!ctx) return;
		
		ctx.beginPath();
		for (let i = 0; i < 5; i++) {
			const angle = (i * Math.PI * 2) / 5 - Math.PI / 2;
			const x1 = x + Math.cos(angle) * size;
			const y1 = y + Math.sin(angle) * size;
			
			if (i === 0) {
				ctx.moveTo(x1, y1);
			} else {
				ctx.lineTo(x1, y1);
			}
			
			const innerAngle = ((i + 0.5) * Math.PI * 2) / 5 - Math.PI / 2;
			const x2 = x + Math.cos(innerAngle) * (size * 0.4);
			const y2 = y + Math.sin(innerAngle) * (size * 0.4);
			ctx.lineTo(x2, y2);
		}
		ctx.closePath();
		ctx.fill();
	}

	function updateParticle(particle: Particle) {
		// Mouse interaction
		if (isMouseMoving) {
			const dx = mouseX - particle.x;
			const dy = mouseY - particle.y;
			const distance = Math.sqrt(dx * dx + dy * dy);
			
			if (distance < 100) {
				const force = (100 - distance) / 100;
				particle.vx += (dx / distance) * force * 0.01;
				particle.vy += (dy / distance) * force * 0.01;
			}
		}

		// Scroll-based movement
		const scrollY = get(scrollPosition);
		particle.y += scrollY * 0.0001;

		// Update position
		particle.x += particle.vx;
		particle.y += particle.vy;

		// Boundary wrapping
		if (particle.x < -10) particle.x = canvas.width + 10;
		if (particle.x > canvas.width + 10) particle.x = -10;
		if (particle.y < -10) particle.y = canvas.height + 10;
		if (particle.y > canvas.height + 10) particle.y = -10;

		// Life cycle
		particle.life++;
		if (particle.life > particle.maxLife) {
			// Reset particle
			Object.assign(particle, createParticle(particle.id));
		}

		// Pulsing opacity
		particle.opacity = 0.1 + 0.4 * Math.sin(particle.life * 0.01);

		// Damping
		particle.vx *= 0.99;
		particle.vy *= 0.99;
	}

	function drawConnections() {
		if (!ctx) return;

		ctx.strokeStyle = '#6366f1';
		ctx.lineWidth = 0.5;

		for (let i = 0; i < particles.length; i++) {
			for (let j = i + 1; j < particles.length; j++) {
				const dx = particles[i].x - particles[j].x;
				const dy = particles[i].y - particles[j].y;
				const distance = Math.sqrt(dx * dx + dy * dy);

				if (distance < 120) {
					const opacity = (120 - distance) / 120 * 0.1;
					ctx.globalAlpha = opacity;
					ctx.beginPath();
					ctx.moveTo(particles[i].x, particles[i].y);
					ctx.lineTo(particles[j].x, particles[j].y);
					ctx.stroke();
				}
			}
		}
		ctx.globalAlpha = 1;
	}

	function animate() {
		if (!ctx || !canvas) return;

		// Clear canvas
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		// Update and draw particles
		particles.forEach(particle => {
			updateParticle(particle);
			drawParticle(particle);
		});

		// Draw connections
		drawConnections();

		animationId = requestAnimationFrame(animate);
	}
</script>

<canvas
	bind:this={canvas}
	class="fixed inset-0 pointer-events-none z-0"
	style="background: transparent;"
	aria-hidden="true"
></canvas>

<style>
	canvas {
		will-change: transform;
		backface-visibility: hidden;
	}
</style>
