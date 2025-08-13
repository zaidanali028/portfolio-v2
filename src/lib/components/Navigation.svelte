<script lang="ts">
	import { onMount } from 'svelte';
	import { Menu, X } from 'lucide-svelte';

	let navElement: HTMLElement;

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

		const handleClickOutside = (event: MouseEvent) => {
			if (isMobileMenuOpen && navElement && !navElement.contains(event.target as Node)) {
				isMobileMenuOpen = false;
			}
		};

		window.addEventListener('scroll', handleScroll);
		document.addEventListener('click', handleClickOutside);

		return () => {
			window.removeEventListener('scroll', handleScroll);
			document.removeEventListener('click', handleClickOutside);
		};
	});

	const scrollToSection = (href: string) => {
		// Close mobile menu first
		isMobileMenuOpen = false;

		// Wait a bit for mobile menu to close
		setTimeout(() => {
			// Get target element
			const targetId = href.replace('#', '');
			const element = document.getElementById(targetId);

			if (element) {
				// Get element position relative to document
				const rect = element.getBoundingClientRect();
				const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
				const elementTop = rect.top + scrollTop;
				const navOffset = 100; // Account for fixed navigation

				// Scroll to calculated position
				window.scrollTo({
					top: Math.max(0, elementTop - navOffset),
					behavior: 'smooth'
				});
			}
		}, isMobileMenuOpen ? 100 : 0);
	};
</script>

<nav
	bind:this={navElement}
	class={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
		isScrolled
			? 'bg-background/80 backdrop-blur-lg border-b border-primary/20'
			: 'bg-transparent'
	}`}
>
	<div class="container mx-auto px-6 py-4 relative">
		<div class="flex items-center justify-between">
			<!-- Logo -->
			<div class="flex items-center gap-2">
				<div class="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
					<span class="text-white font-bold text-sm">AUz</span>
				</div>
				<span class="text-foreground font-semibold text-lg">Ali Usman Zaidan</span>
			</div>

			<!-- Desktop Navigation -->
			<div class="hidden md:flex items-center gap-8">
				{#each navItems as item}
					<button
						on:click={() => scrollToSection(item.href)}
						class="text-muted-foreground hover:text-primary transition-colors duration-200 relative group cursor-pointer"
						type="button"
					>
						{item.label}
						<span
							class="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"
						></span>
					</button>
				{/each}
			</div>

			<!-- Mobile Menu Button -->
			<button
				class="md:hidden p-3 text-foreground hover:text-primary transition-colors rounded-lg hover:bg-primary/10 border border-primary/20 bg-background/80 backdrop-blur-sm {isMobileMenuOpen ? 'bg-primary/20' : ''}"
				on:click={() => (isMobileMenuOpen = !isMobileMenuOpen)}
				aria-label="Toggle mobile menu"
				type="button"
			>
				{#if isMobileMenuOpen}
					<X class="w-5 h-5" />
				{:else}
					<Menu class="w-5 h-5" />
				{/if}
			</button>
		</div>

		<!-- Mobile Navigation -->
		{#if isMobileMenuOpen}
			<div
				class="md:hidden absolute top-full left-0 right-0 mt-2 mx-4 p-4 bg-background border border-primary/20 shadow-2xl rounded-lg z-[60]"
				style="background-color: hsl(var(--background)); backdrop-filter: blur(12px);"
			>
				{#each navItems as item}
					<button
						on:click={() => scrollToSection(item.href)}
						class="block w-full text-left py-3 px-2 text-foreground hover:text-primary hover:bg-primary/10 rounded transition-all duration-200 font-medium cursor-pointer"
						type="button"
					>
						{item.label}
					</button>
				{/each}
			</div>
		{/if}
	</div>
</nav>
