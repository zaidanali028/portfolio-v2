<script lang="ts">
	import Card from '$lib/components/ui/card.svelte';
	import { Cloud, Code, Cog, Shield, Database, GitBranch } from 'lucide-svelte';

	const expertiseAreas = [
		{
			icon: Cloud,
			title: 'Cloud Architecture',
			description: 'Design and implement scalable cloud solutions on AWS',
			skills: ['AWS Solutions Architecture', 'Multi-cloud Strategy', 'Cost Optimization', 'Security Best Practices']
		},
		{
			icon: Cog,
			title: 'DevOps & Automation',
			description: 'Streamline development workflows with CI/CD pipelines and infrastructure automation',
			skills: ['Jenkins', 'GitHub Actions', 'Terraform', 'Semaphore CI', 'Circle CI','Nginx', 'Apache', 'Docker']
		},
		{
			icon: Code,
			title: 'Full-Stack Development',
			description: 'Build modern web applications with cutting-edge technologies',
			skills: ['Svelte', 'Node.js', 'Expressjs', 'REST APIs','Laravel/Livewire','HTMX','Fast API']
		},
		{
			icon: Database,
			title: 'Database Management',
			description: 'Design and optimize database systems for performance and scalability',
			skills: ['PostgreSQL',  'MySQL', 'MongoDB', 'Redis', 'Database Design','DynamoDB']
		},
		{
			icon: Shield,
			title: 'Security & Compliance',
			description: 'Implement security best practices and ensure compliance standards',
			skills: ['IAM', 'Security Auditing', 'Compliance', 'Monitoring','Clair','Trivy']
		},
		{
			icon: GitBranch,
			title: 'Project Leadership',
			description: 'Lead technical teams and manage complex software projects',
			skills: ['Team Leadership', 'Agile/Scrum', 'Technical Mentoring', 'Architecture Planning','Jira']
		}
	];
</script>

<section id="expertise" class="py-20 relative">
	<div class="container mx-auto px-6">
		<div class="text-center mb-16 animate-fade-in">
			<h2 class="text-4xl lg:text-5xl font-bold text-foreground mb-6">
				Areas of <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-glow">Expertise</span>
			</h2>
			<p class="text-muted-foreground text-lg max-w-2xl mx-auto">
				Specialized skills and knowledge areas where I deliver exceptional results
			</p>
		</div>

		<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
			{#each expertiseAreas as area, index}
				<Card class="p-6 bg-card/50 border-primary/20 backdrop-blur-sm hover:bg-card/70 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/10 animate-fade-in group" style="animation-delay: {index * 0.1}s">
					<div class="flex items-center gap-4 mb-4">
						<div class="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center group-hover:bg-primary/30 transition-colors">
							<svelte:component this={area.icon} class="w-6 h-6 text-primary" />
						</div>
						<h3 class="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
							{area.title}
						</h3>
					</div>
					
					<p class="text-muted-foreground mb-4">
						{area.description}
					</p>
					
					<div class="flex flex-wrap gap-2">
						{#each area.skills as skill}
							<span class="px-3 py-1 bg-secondary/50 text-secondary-foreground text-xs rounded-full border border-primary/10">
								{skill}
							</span>
						{/each}
					</div>
				</Card>
			{/each}
		</div>
	</div>
</section>
