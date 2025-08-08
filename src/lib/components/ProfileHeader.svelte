<script lang="ts">
	import Button from '$lib/components/ui/button.svelte';
	import { MapPin, Mail, Phone, Linkedin, Github, Download } from 'lucide-svelte';
	import { inView, parallax, hoverAnimation } from '$lib/actions/animations';
	import { getImagePath } from '$lib/utils/assets';

	// Use utility function for proper GitHub Pages deployment
	const profilePhoto = getImagePath('/profile-photo.jpg');
	const cvDownloadPath = getImagePath('/Ali-cv-new.pdf');
</script>

<section
	id="about"
	class="relative min-h-screen flex items-center justify-center overflow-hidden"
>
	<!-- Cosmic Background with parallax -->
	<div class="absolute inset-0 bg-[var(--cosmic-gradient)]" use:parallax={{ speed: 0.2 }}></div>
	<div class="absolute inset-0 bg-[var(--hero-gradient)] opacity-20" use:parallax={{ speed: 0.3 }}></div>

	<!-- Animated orbs with enhanced effects -->
	<div
		class="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/30 rounded-full blur-3xl animate-pulse-glow animate-morph"
		use:parallax={{ speed: 0.4, direction: 'down' }}
	></div>
	<div
		class="absolute bottom-1/4 left-1/4 w-48 h-48 bg-primary-glow/20 rounded-full blur-2xl animate-float animate-morph"
		use:parallax={{ speed: 0.5, direction: 'up' }}
		style="animation-delay: 2s;"
	></div>

	<div class="container mx-auto px-6 pt-20 relative z-10">
		<div class="flex flex-col lg:flex-row items-center gap-12">
			<!-- Profile Image -->
			<div
				class="flex-shrink-0"
				use:inView={{ animation: 'animate-scale-in', delay: 200 }}
				use:hoverAnimation={{ scale: 1.05, duration: 300 }}
			>
				<div class="relative">
					<img
						src={profilePhoto}
						alt="Ali Zaidan - Professional headshot"
						class="w-48 h-48 rounded-full object-cover border-4 border-primary/30 shadow-2xl animate-pulse-glow"
					/>
					<div
						class="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-transparent"
					></div>
					<!-- Floating ring animation -->
					<div class="absolute -inset-4 rounded-full border-2 border-primary/20 animate-spin" style="animation-duration: 20s;"></div>
				</div>
			</div>

			<!-- Profile Info -->
			<div
				class="flex-1 text-center lg:text-left"
				use:inView={{ animation: 'animate-fade-in-right', delay: 400 }}
			>
				<div class="mb-4">
					<span
						class="text-sm text-primary font-medium px-3 py-1 bg-primary/10 rounded-full border border-primary/20"
					>
						✨ Available for hire
					</span>
				</div>

				<h1 class="text-5xl lg:text-7xl font-bold text-foreground mb-6">
					Hi, I'm <span
						class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-glow"
						>Ali Usman  Zaidan</span
					>
				</h1>

				<div class="text-xl text-muted-foreground mb-6 space-y-2">
					<p class="font-semibold text-primary">AWS Certified Solutions Architect</p>
					<p>Associate/DevOps & Backend Engineer</p>
				</div>

				<p class="text-lg text-muted-foreground mb-8 max-w-2xl">
					Passionate about cloud architecture, DevOps automation, and building scalable solutions.
					I specialize in AWS services, containerization, and CI/CD pipelines that drive business
					growth and operational excellence.
				</p>

				<!-- Contact Info -->
				<div class="flex flex-wrap gap-6 mb-8 justify-center lg:justify-start">
					<div class="flex items-center gap-2 text-muted-foreground">
						<MapPin class="w-4 h-4 text-primary" />
						<span>Remote / Hybrid</span>
					</div>
					<div class="flex items-center gap-2 text-muted-foreground">
						<Mail class="w-4 h-4 text-primary" />
						<span>zaidanali028@gmail.com</span>
					</div>
					<div class="flex items-center gap-2 text-muted-foreground">
						<Phone class="w-4 h-4 text-primary" />
						<span>+233 (2400) 40834</span>
					</div>
				</div>

				<!-- CTA Buttons -->
				<div class="flex gap-4 mb-8 justify-center lg:justify-start">
					<a
						href={cvDownloadPath}
						download="Ali-Usman-Zaidan-CV.pdf"
						class="inline-flex items-center bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-medium transition-colors duration-200"
					>
						<Download class="w-4 h-4 mr-2" />
						Download CV
					</a>
					<Button variant="outline" class="px-6 py-3">Get in Touch</Button>
				</div>

				<!-- Social Links -->
				<div class="flex gap-4 justify-center lg:justify-start">
					<a
						href="https://www.linkedin.com/in/ali-usman-zaidan-630028200/"
						class="p-3 bg-card/30 border border-primary/20 rounded-full hover:bg-primary/20 hover:border-primary/40 transition-all duration-300 hover:scale-110"
					>
						<Linkedin class="w-5 h-5 text-primary" />
					</a>
					<a
						href="https://github.com/zaidanali028"
						class="p-3 bg-card/30 border border-primary/20 rounded-full hover:bg-primary/20 hover:border-primary/40 transition-all duration-300 hover:scale-110"
					>
						<Github class="w-5 h-5 text-primary" />
					</a>
				</div>
			</div>
		</div>
	</div>
</section>
