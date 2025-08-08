<script lang="ts">
	import { onMount } from 'svelte';
	import { Menu, X } from 'lucide-svelte';
	import Button from '$lib/components/ui/button.svelte';

	let isScrolled = false;
	let isMobileMenuOpen = false;

	const navItems = [
		{ href: '#about', label: 'About me' },
		{ href: '#tech-stack', label: 'Skills' },
		{ href: '#badges', label: 'Certifications' },
		{ href: '#expertise', label: 'Projects' },
		{ href: '#background', label: 'Experience' }
	];

	onMount(() => {
		const handleScroll = () => {
			isScrolled = window.scrollY > 50;
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	});

	const scrollToSection = (href: string) => {
		const element = document.querySelector(href);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
		}
		isMobileMenuOpen = false;
	};
</script>

<nav
	class={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
		isScrolled
			? 'bg-background/80 backdrop-blur-lg border-b border-primary/20'
			: 'bg-transparent'
	}`}
>
	<div class="container mx-auto px-6 py-4">
		<div class="flex items-center justify-between">
			<!-- Logo -->
			<div class="flex items-center gap-2">
				<div class="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
					<span class="text-white font-bold text-sm">AZ</span>
				</div>
				<span class="text-foreground font-semibold text-lg">Ali Zaidan</span>
			</div>

			<!-- Desktop Navigation -->
			<div class="hidden md:flex items-center gap-8">
				{#each navItems as item}
					<button
						on:click={() => scrollToSection(item.href)}
						class="text-muted-foreground hover:text-primary transition-colors duration-200 relative group"
					>
						{item.label}
						<span
							class="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"
						></span>
					</button>
				{/each}
			</div>

			<!-- Mobile Menu Button -->
			<Button
				variant="ghost"
				size="icon"
				class="md:hidden text-foreground"
				on:click={() => (isMobileMenuOpen = !isMobileMenuOpen)}
			>
				{#if isMobileMenuOpen}
					<X />
				{:else}
					<Menu />
				{/if}
			</Button>
		</div>

		<!-- Mobile Navigation -->
		{#if isMobileMenuOpen}
			<div
				class="md:hidden mt-4 p-4 bg-card rounded-lg border border-primary/20 animate-fade-in"
			>
				{#each navItems as item}
					<button
						on:click={() => scrollToSection(item.href)}
						class="block w-full text-left py-2 text-muted-foreground hover:text-primary transition-colors"
					>
						{item.label}
					</button>
				{/each}
			</div>
		{/if}
	</div>
</nav>
