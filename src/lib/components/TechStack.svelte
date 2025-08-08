<script lang="ts">
	import Card from '$lib/components/ui/card.svelte';
	import Badge from '$lib/components/ui/badge.svelte';

	const technologies = [
		{ name: 'React', category: 'Frontend', color: 'from-blue-400 to-blue-600' },
		{ name: 'Node.js', category: 'Backend', color: 'from-green-400 to-green-600' },
		{ name: 'AWS', category: 'Cloud', color: 'from-orange-400 to-orange-600' },
		{ name: 'Docker', category: 'DevOps', color: 'from-blue-500 to-blue-700' },
		{ name: 'Kubernetes', category: 'DevOps', color: 'from-indigo-400 to-indigo-600' },
		{ name: 'Jenkins', category: 'CI/CD', color: 'from-red-400 to-red-600' },
		{ name: 'Terraform', category: 'Infrastructure', color: 'from-purple-400 to-purple-600' },
		{ name: 'TypeScript', category: 'Programming', color: 'from-blue-400 to-blue-600' },
		{ name: 'MongoDB', category: 'Database', color: 'from-green-500 to-green-700' },
		{ name: 'PostgreSQL', category: 'Database', color: 'from-blue-500 to-blue-700' },
		{ name: 'Git', category: 'Version Control', color: 'from-orange-500 to-orange-700' }
	];

	const categories = [...new Set(technologies.map((tech) => tech.category))];
</script>

<section id="tech-stack" class="py-20 relative">
	<div class="container mx-auto px-6">
		<div class="text-center mb-16 animate-fade-in">
			<h2 class="text-4xl lg:text-5xl font-bold text-foreground mb-6">
				Tech <span
					class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-glow"
					>Stack</span
				>
			</h2>
			<p class="text-muted-foreground text-lg max-w-2xl mx-auto">
				Technologies and tools I work with to build scalable, modern applications
			</p>
		</div>

		<!-- Floating Tech Icons Visualization -->
		<div class="relative mb-16 h-64 overflow-hidden">
			<div class="absolute inset-0 flex items-center justify-center">
				{#each technologies.slice(0, 8) as tech, index}
					{@const angle = (index * 45) * (Math.PI / 180)}
					{@const radius = 120}
					{@const x = Math.cos(angle) * radius}
					{@const y = Math.sin(angle) * radius}
					<div
						class="absolute w-16 h-16 rounded-xl bg-card border border-primary/20 flex items-center justify-center shadow-lg animate-tech-float hover:scale-110 transition-all duration-300 cursor-pointer group hover:shadow-xl hover:border-primary/40"
						style="transform: translate({x}px, {y}px); animation-delay: {index * 0.2}s"
					>
						<div
							class="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-foreground text-xs font-bold"
						>
							{tech.name.substring(0, 2).toUpperCase()}
						</div>
						<div
							class="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
						>
							{tech.name}
						</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- Central Tech Hub -->
		<div class="flex justify-center mb-16">
			<div
				class="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center border-2 border-primary/30 animate-pulse-glow shadow-lg"
			>
				<div class="w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-md">
					<span class="text-primary-foreground font-bold text-lg">AZ</span>
				</div>
			</div>
		</div>

		<!-- Categorized Technologies -->
		<div class="grid gap-8 animate-fade-in">
			{#each categories as category, categoryIndex}
				<Card
					class="p-6 bg-card/50 border-primary/20 backdrop-blur-sm hover:bg-card/70 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/10"
					style="animation-delay: {categoryIndex * 0.1}s"
				>
					<h3 class="text-xl font-semibold text-primary mb-4 flex items-center gap-2">
						<div class="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
						{category}
					</h3>
					<div class="flex flex-wrap gap-3">
						{#each technologies.filter((tech) => tech.category === category) as tech, index}
							<Badge
								variant="secondary"
								class="px-4 py-2 text-sm bg-secondary/50 hover:bg-secondary/70 border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:scale-105 cursor-pointer"
								style="animation-delay: {(categoryIndex * 0.1 + index * 0.05)}s"
							>
								<div class="w-2 h-2 bg-gradient-to-br {tech.color} rounded-full mr-2"></div>
								{tech.name}
							</Badge>
						{/each}
					</div>
				</Card>
			{/each}
		</div>
	</div>
</section>
