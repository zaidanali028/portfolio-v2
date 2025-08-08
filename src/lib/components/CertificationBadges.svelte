<script lang="ts">
	import { Award, Check, Star } from 'lucide-svelte';
	import { getImagePath } from '$lib/utils/assets';

	const certifications = [
		{
			title: 'AWS Certified Solutions Architect',
			level: 'Associate',
			issuer: 'Amazon Web Services',
			year: '2025',
			image: getImagePath('/cert-uploads/aws-certified-solutions-architect-associate.png'),
			verified: true,
			color: 'from-orange-400 to-orange-600'
		},
		{
			title: 'AWS Certified Cloud Practitioner',
			level: 'Foundational',
			issuer: 'Amazon Web Services',
			year: '2025',
			verified: true,
			color: 'from-blue-400 to-blue-600',
			image: getImagePath('/cert-uploads/aws-certified-cloud-practitioner.png'),

		},
		{
			title: 'Kubernetes And Cloud Native Essentials',
			level: 'Associate',
			issuer: 'Linux Foundation',
			year: '2025',
			verified: true,
			color: 'from-indigo-400 to-indigo-600',
			image: getImagePath('/cert-uploads/lfs250-kubernetes-and-cloud-native-essentials.png'),

		},
		{
			title: 'Google Data Analytics',
			level: 'Associate',
			issuer: 'Google/Coursera',
			year: '2023',
			verified: true,
			color: 'from-green-400 to-green-600',
			image: getImagePath('/cert-uploads/google-data-analytics-professional-certificate.2.png'),

		},
		{
			title: 'Kubernetes & Cloud Native Associate',
			level: 'Advanced',
			issuer: 'Linux Foundation',
			year: '2025',
			verified: true,
			color: 'from-purple-400 to-purple-600',
			
			image: getImagePath('/cert-uploads/kcna-kubernetes-and-cloud-native-associate.png'),

		}
	];
</script>

<section id="badges" class="py-20 bg-muted/30 relative overflow-hidden">
	<!-- Background decoration -->
	<div class="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
	<div class="absolute bottom-0 left-0 w-64 h-64 bg-primary-glow/5 rounded-full blur-2xl"></div>

	<div class="container mx-auto px-6 relative z-10">
		<div class="text-center mb-16 animate-fade-in">
			<h2 class="text-4xl lg:text-5xl font-bold text-foreground mb-6">
				<span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-glow"
					>Certifications</span
				> & Badges
			</h2>
			<p class="text-muted-foreground text-lg max-w-2xl mx-auto">
				Professional certifications and achievements that validate my expertise in cloud computing,
				DevOps, and modern development practices
			</p>
		</div>

		<!-- Achievement Stats -->
		<div class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
			<div class="text-center animate-scale-in">
				<div class="text-3xl font-bold text-primary mb-2">{certifications.length}</div>
				<div class="text-sm text-muted-foreground">Certifications</div>
			</div>
			<div class="text-center animate-scale-in" style="animation-delay: 0.1s">
				<div class="text-3xl font-bold text-primary mb-2">
					{certifications.filter((cert) => cert.verified).length}
				</div>
				<div class="text-sm text-muted-foreground">Verified</div>
			</div>
			<div class="text-center animate-scale-in" style="animation-delay: 0.2s">
				<div class="text-3xl font-bold text-primary mb-2">3</div>
				<div class="text-sm text-muted-foreground">Cloud Platforms</div>
			</div>
			<div class="text-center animate-scale-in" style="animation-delay: 0.3s">
				<div class="text-3xl font-bold text-primary mb-2">2025</div>
				<div class="text-sm text-muted-foreground">Latest Year</div>
			</div>
		</div>

		<!-- Certification Badges -->
		<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-8">
			{#each certifications as cert, index}
				<div class="group relative flex flex-col items-center animate-fade-in" style="animation-delay: {index * 0.1}s">
					<!-- Certification Image -->
					{#if cert.image}
						<div class="w-24 h-24 mb-4 group-hover:scale-110 transition-transform duration-300">
							<img
								src={cert.image}
								alt="{cert.title} certification badge"
								class="w-full h-full object-contain"
							/>
						</div>
					{:else}
						<!-- Fallback icon if no image -->
						<div class="w-24 h-24 mb-4 flex items-center justify-center bg-primary/10 rounded-xl group-hover:scale-110 transition-transform duration-300">
							<Award class="w-12 h-12 text-primary" />
						</div>
					{/if}

					<!-- Certification Details -->
					<div class="text-center">
						<h3 class="font-semibold text-sm text-foreground group-hover:text-primary transition-colors mb-1">
							{cert.title}
						</h3>
						<p class="text-xs text-muted-foreground mb-1">{cert.issuer}</p>
						<p class="text-xs text-primary font-medium">{cert.year}</p>
						{#if cert.verified}
							<div class="flex items-center justify-center gap-1 mt-1">
								<Check class="w-3 h-3 text-green-500" />
								<span class="text-xs text-green-500 font-medium">Verified</span>
							</div>
						{/if}
					</div>
				</div>
			{/each}
		</div>

		<!-- Call to Action -->
		<div class="text-center mt-16 animate-fade-in">
			<p class="text-muted-foreground mb-4">
				Want to verify these certifications? All badges are publicly verifiable.
			</p>
			<div class="flex items-center justify-center gap-2 text-primary">
				<Star class="w-4 h-4" />
				<span class="text-sm font-medium">Continuously learning and growing</span>
				<Star class="w-4 h-4" />
			</div>
		</div>
	</div>
</section>
