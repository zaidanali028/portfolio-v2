<script lang="ts">
	import { Github, Linkedin, Mail, MapPin, Phone } from 'lucide-svelte';
</script>

<footer class="bg-card/50 border-t border-border/50 backdrop-blur-sm">
	<div class="container mx-auto px-6 py-12">
		<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
			<!-- About Section -->
			<div class="space-y-4">
				<div class="flex items-center gap-2">
					<div class="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
						<span class="text-white font-bold text-sm">AUZ</span>
					</div>
					<span class="text-foreground font-semibold text-lg">Ali Usman Zaidan</span>
				</div>
				<p class="text-muted-foreground text-sm leading-relaxed">
					AWS Certified Solutions Architect & DevOps Engineer specializing in cloud architecture, automation, and full-stack development.
				</p>
			</div>

			<!-- Contact Info -->
			<div class="space-y-4">
				<h3 class="text-foreground font-semibold">Get In Touch</h3>
				<div class="space-y-3">
					<a 
						href="mailto:zaidanali028@gmail.com" 
						class="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-200 text-sm"
					>
						<Mail class="w-4 h-4" />
						zaidanali028@gmail.com
					</a>
					<a 
						href="tel:+233240040834" 
						class="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-200 text-sm"
					>
						<Phone class="w-4 h-4" />
						+233 240 040 834
					</a>
					<div class="flex items-center gap-2 text-muted-foreground text-sm">
						<MapPin class="w-4 h-4" />
						Remote / On-site
					</div>
				</div>
			</div>

			<!-- Social Links -->
			<div class="space-y-4">
				<h3 class="text-foreground font-semibold">Connect</h3>
				<div class="flex gap-4">
					<a 
						href="https://www.linkedin.com/in/ali-usman-zaidan-630028200/" 
						target="_blank" 
						rel="noopener noreferrer"
						class="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all duration-200 hover:scale-110"
						aria-label="LinkedIn Profile"
					>
						<Linkedin class="w-5 h-5" />
					</a>
					<a 
						href="https://github.com/zaidanali028" 
						target="_blank" 
						rel="noopener noreferrer"
						class="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all duration-200 hover:scale-110"
						aria-label="GitHub Profile"
					>
						<Github class="w-5 h-5" />
					</a>
				</div>
				<div class="text-muted-foreground text-xs">
					<span class="text-green-400">●</span> Available for opportunities
				</div>
			</div>
		</div>

		<!-- Bottom Bar -->
		<div class="border-t border-border/50 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
			<p class="text-muted-foreground text-sm">
				© {new Date().getFullYear()} Ali Usman Zaidan. All rights reserved.
			</p>
			<div class="flex items-center gap-4 text-xs text-muted-foreground">
				<span>Built with SvelteKit & TailwindCSS</span>
				<span>•</span>
				<span>Deployed on GitHub Pages</span>
			</div>
		</div>
	</div>
</footer>
