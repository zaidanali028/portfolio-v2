<script lang="ts">
	import { Sparkles } from 'lucide-svelte';
	import { inView, staggerIn, hoverAnimation } from '$lib/actions/animations';
	
	const technologies = [
		// Frontend
		{ name: 'HTML5', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', category: 'frontend' },
		{ name: 'CSS3', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', category: 'frontend' },
		{ name: 'JavaScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', category: 'frontend' },
		{ name: 'Tailwind CSS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg', category: 'frontend' },
		{ name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', category: 'frontend' },
		{ name: 'TypeScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', category: 'frontend' },
		{ name: 'Next.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', category: 'frontend' },
		{ name: 'Vue.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg', category: 'frontend' },

		// Backend
		{ name: 'Node.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', category: 'backend' },
		{ name: 'Express', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', category: 'backend' },
		{ name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', category: 'backend' },
		{ name: 'Django', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg', category: 'backend' },
		{ name: 'MongoDB', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', category: 'backend' },
		{ name: 'Firebase', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg', category: 'backend' },
		{ name: 'PostgreSQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', category: 'backend' },

		// DevOps & Tools
		{ name: 'Docker', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', category: 'tools' },
		{ name: 'Git', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', category: 'tools' },

		// Cloud & Design
		{ name: 'Figma', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg', category: 'design' },
		{ name: 'AWS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg', category: 'cloud' }
	];
</script>

<section class="py-20 px-6 relative overflow-hidden">
	<!-- Background effects -->
	<div class="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10"></div>
	<div class="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
	<div class="absolute bottom-1/4 left-1/4 w-48 h-48 bg-primary/5 rounded-full blur-2xl"></div>
	
	<div class="max-w-6xl mx-auto relative z-10">
		<!-- Section header -->
		<div
			class="text-center mb-16"
			use:inView={{ animation: 'animate-fade-in-up', delay: 200 }}
		>
			<div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 animate-shimmer">
				<Sparkles class="w-4 h-4 text-primary animate-pulse" />
				<span class="text-sm font-medium text-primary">A dive into what I can do</span>
			</div>

			<h2 class="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent animate-gradient-shift">
				Making apps with modern technologies
			</h2>

			<p class="text-lg text-muted-foreground italic font-light max-w-md mx-auto">
				Never miss a task, deadline or idea
			</p>
		</div>

		<!-- Technologies grid -->
		<div
			class="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-8 mb-16"
			use:staggerIn={{ stagger: 100, delay: 400, selector: '> div' }}
		>
			{#each technologies as tech}
				<div
					class="group relative flex flex-col items-center"
					use:hoverAnimation={{ scale: 1.1, translateY: -5, duration: 300 }}
				>
					<!-- Technology logo -->
					<div class="w-16 h-16 mb-3 transition-all duration-300 group-hover:animate-float">
						<img
							src={tech.logo}
							alt={tech.name}
							class="w-full h-full object-contain tech-logo transition-all duration-300"
						/>
					</div>

					<!-- Technology name -->
					<h3 class="font-semibold text-xs text-center text-foreground group-hover:text-primary transition-colors duration-300">
						{tech.name}
					</h3>

					<!-- Hover glow effect -->
					<div class="absolute inset-0 tech-glow rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
				</div>
			{/each}
		</div>

		<!-- Bottom section with additional tools -->
		<div class="grid grid-cols-2 gap-8 max-w-md mx-auto">
			<div class="group relative flex flex-col items-center">
				<div class="w-16 h-16 mb-3 group-hover:scale-110 transition-transform duration-300">
					<img
						src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
						alt="React Native"
						class="w-full h-full object-contain"
					/>
				</div>
				<h3 class="font-semibold text-sm text-center text-foreground group-hover:text-primary transition-colors duration-300">React Native</h3>
			</div>

			<div class="group relative flex flex-col items-center">
				<div class="w-16 h-16 mb-3 group-hover:scale-110 transition-transform duration-300">
					<img
						src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg"
						alt="Docker"
						class="w-full h-full object-contain"
					/>
				</div>
				<h3 class="font-semibold text-sm text-center text-foreground group-hover:text-primary transition-colors duration-300">Docker</h3>
			</div>
		</div>
	</div>
</section>

<style>
	section {
		background:
			radial-gradient(ellipse at center, hsl(var(--primary) / 0.1), transparent 70%),
			radial-gradient(ellipse at top right, hsl(var(--primary) / 0.05), transparent 50%);
	}
</style>
