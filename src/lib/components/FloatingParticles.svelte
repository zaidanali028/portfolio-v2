<script lang="ts">
	import { onMount } from 'svelte';
	import { prefersReducedMotion, scrollPosition } from '$lib/utils/animations';
	import { get } from 'svelte/store';

	let particles: Array<{ id: number; x: number; y: number; size: number; speed: number; opacity: number }> = [];
	let mounted = false;

	onMount(() => {
		mounted = true;
		// Create initial particles
		for (let i = 0; i < 50; i++) {
			particles.push({
				id: i,
				x: Math.random() * window.innerWidth,
				y: Math.random() * window.innerHeight,
				size: Math.random() * 4 + 1,
				speed: Math.random() * 2 + 0.5,
				opacity: Math.random() * 0.5 + 0.1
			});
		}
		particles = particles; // Trigger reactivity

		// Animation loop
		const animate = () => {
			particles = particles.map(particle => ({
				...particle,
				y: particle.y - particle.speed,
				x: particle.x + Math.sin(particle.y * 0.01) * 0.5,
				// Reset particle when it goes off screen
				...(particle.y < -10 ? {
					y: window.innerHeight + 10,
					x: Math.random() * window.innerWidth
				} : {})
			}));
			
			if (mounted) {
				requestAnimationFrame(animate);
			}
		};

		animate();

		return () => {
			mounted = false;
		};
	});
</script>

{#if mounted}
	<div class="fixed inset-0 pointer-events-none z-0 overflow-hidden">
		{#each particles as particle (particle.id)}
			<div
				class="absolute rounded-full bg-primary/20 animate-particle-drift"
				style="
					left: {particle.x}px;
					top: {particle.y}px;
					width: {particle.size}px;
					height: {particle.size}px;
					opacity: {particle.opacity};
					animation-duration: {20 + Math.random() * 10}s;
				"
			></div>
		{/each}
		
		<!-- Additional static decorative elements -->
		<div class="absolute top-1/4 left-1/4 w-2 h-2 bg-primary/30 rounded-full animate-pulse"></div>
		<div class="absolute top-3/4 right-1/3 w-1 h-1 bg-primary-glow/40 rounded-full animate-pulse" style="animation-delay: 1s"></div>
		<div class="absolute top-1/2 left-3/4 w-3 h-3 bg-primary/20 rounded-full animate-pulse" style="animation-delay: 2s"></div>
		<div class="absolute bottom-1/4 left-1/2 w-1.5 h-1.5 bg-primary/25 rounded-full animate-pulse" style="animation-delay: 0.5s"></div>
	</div>
{/if}
