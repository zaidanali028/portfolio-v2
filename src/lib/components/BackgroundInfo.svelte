<script lang="ts">
	import Card from '$lib/components/ui/card.svelte';
	import { Calendar, MapPin, Building, Award } from 'lucide-svelte';

	const experiences = [
		{
			title: 'Senior DevOps Engineer',
			company: 'TechCorp Solutions',
			location: 'Remote',
			period: '2023 - Present',
			description: 'Leading cloud infrastructure initiatives and DevOps transformation projects.',
			achievements: [
				'Reduced deployment time by 70% through CI/CD automation',
				'Managed AWS infrastructure serving 1M+ users',
				'Led team of 5 engineers in cloud migration project'
			]
		},
		{
			title: 'Cloud Solutions Architect',
			company: 'CloudTech Inc',
			location: 'San Francisco, CA',
			period: '2021 - 2023',
			description: 'Designed and implemented scalable cloud architectures for enterprise clients.',
			achievements: [
				'Architected solutions for 50+ enterprise clients',
				'Achieved 99.9% uptime across all managed systems',
				'Reduced infrastructure costs by 40% through optimization'
			]
		},
		{
			title: 'Full Stack Developer',
			company: 'StartupXYZ',
			location: 'New York, NY',
			period: '2019 - 2021',
			description: 'Built modern web applications using React, Node.js, and cloud technologies.',
			achievements: [
				'Developed 10+ production applications',
				'Implemented real-time features serving 100K+ users',
				'Mentored junior developers and established coding standards'
			]
		}
	];

	const education = [
		{
			degree: 'Bachelor of Science in Computer Science',
			school: 'University of Technology',
			period: '2015 - 2019',
			achievements: ['Magna Cum Laude', 'Dean\'s List (6 semesters)', 'Computer Science Society President']
		}
	];
</script>

<section id="background" class="py-20 bg-muted/30 relative overflow-hidden">
	<div class="container mx-auto px-6">
		<div class="text-center mb-16 animate-fade-in">
			<h2 class="text-4xl lg:text-5xl font-bold text-foreground mb-6">
				Professional <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-glow">Background</span>
			</h2>
			<p class="text-muted-foreground text-lg max-w-2xl mx-auto">
				My journey through the tech industry, building expertise and delivering results
			</p>
		</div>

		<!-- Experience Timeline -->
		<div class="mb-16">
			<h3 class="text-2xl font-semibold text-foreground mb-8 flex items-center gap-2">
				<Building class="w-6 h-6 text-primary" />
				Professional Experience
			</h3>
			
			<div class="space-y-8">
				{#each experiences as exp, index}
					<Card class="p-6 bg-card/50 border-primary/20 backdrop-blur-sm hover:bg-card/70 transition-all duration-300 animate-fade-in" style="animation-delay: {index * 0.1}s">
						<div class="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
							<div>
								<h4 class="text-xl font-semibold text-foreground mb-1">{exp.title}</h4>
								<p class="text-primary font-medium mb-2">{exp.company}</p>
								<div class="flex items-center gap-4 text-sm text-muted-foreground mb-3">
									<span class="flex items-center gap-1">
										<MapPin class="w-4 h-4" />
										{exp.location}
									</span>
									<span class="flex items-center gap-1">
										<Calendar class="w-4 h-4" />
										{exp.period}
									</span>
								</div>
							</div>
						</div>
						
						<p class="text-muted-foreground mb-4">{exp.description}</p>
						
						<div class="space-y-2">
							<h5 class="font-medium text-foreground">Key Achievements:</h5>
							<ul class="space-y-1">
								{#each exp.achievements as achievement}
									<li class="text-sm text-muted-foreground flex items-start gap-2">
										<Award class="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
										{achievement}
									</li>
								{/each}
							</ul>
						</div>
					</Card>
				{/each}
			</div>
		</div>

		<!-- Education -->
		<div>
			<h3 class="text-2xl font-semibold text-foreground mb-8 flex items-center gap-2">
				<Award class="w-6 h-6 text-primary" />
				Education
			</h3>
			
			{#each education as edu, index}
				<Card class="p-6 bg-card/50 border-primary/20 backdrop-blur-sm hover:bg-card/70 transition-all duration-300 animate-fade-in" style="animation-delay: {index * 0.1}s">
					<h4 class="text-xl font-semibold text-foreground mb-1">{edu.degree}</h4>
					<p class="text-primary font-medium mb-2">{edu.school}</p>
					<p class="text-sm text-muted-foreground mb-3">{edu.period}</p>
					
					<div class="flex flex-wrap gap-2">
						{#each edu.achievements as achievement}
							<span class="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full border border-primary/20">
								{achievement}
							</span>
						{/each}
					</div>
				</Card>
			{/each}
		</div>
	</div>
</section>
