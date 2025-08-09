<script lang="ts">
	import Navigation from '$lib/components/Navigation.svelte';
	import ProfileHeader from '$lib/components/ProfileHeader.svelte';
	import TechStack from '$lib/components/TechStack.svelte';
	import CertificationBadges from '$lib/components/CertificationBadges.svelte';
	import Expertise from '$lib/components/Expertise.svelte';
	import BackgroundInfo from '$lib/components/BackgroundInfo.svelte';
	import EnhancedParticles from '$lib/components/EnhancedParticles.svelte';
	import TechnologiesSection from '$lib/components/TechnologiesSection.svelte';
	import TerminalFooter from '$lib/components/TerminalFooter.svelte';
	import AnalyticsDisplay from '$lib/components/AnalyticsDisplay.svelte';
	import { onMount } from 'svelte';
	import { analytics } from '$lib/stores/analytics';



	onMount(() => {

	onMount(() => {
		// Only count once per session
		if (!sessionStorage.getItem('visited')) {
			analytics.incrementVisits();
			sessionStorage.setItem('visited', 'true');
		}
	});
	
		// Ensure page starts at the top
		window.scrollTo({ top: 0, behavior: 'instant' });

		// Add a small delay to ensure DOM is ready, then scroll to top again
		setTimeout(() => {
			window.scrollTo({ top: 0, behavior: 'smooth' });
		}, 100);

		// Ensure all content is visible (fallback for animation issues)
		setTimeout(() => {
			const allSections = document.querySelectorAll('[style*="animation-delay"]');
			allSections.forEach(section => {
				(section as HTMLElement).style.opacity = '1';
				(section as HTMLElement).style.transform = 'translateY(0)';
			});
		}, 2000);
	});
</script>

<div class="min-h-screen bg-background relative">
	<EnhancedParticles />

	<!-- Navigation - shows immediately -->
	<div class="animate-fade-in-down" style="animation-delay: 0ms;">
		<Navigation />
	</div>

	<!-- Main content sections with staggered animations -->
	<div id="about" class="animate-fade-in-up" style="animation-delay: 100ms;">
		<ProfileHeader />
	</div>

	<!-- <div class="animate-fade-in-up" style="animation-delay: 200ms;">
		<TechStack />
	</div> -->

	<div id="tech-stack" class="animate-fade-in-up" style="animation-delay: 300ms;">
		<TechnologiesSection />
	</div>

	<div id="badges" class="animate-fade-in-up" style="animation-delay: 400ms;">
		<CertificationBadges />
	</div>

	<div id="expertise" class="animate-fade-in-up" style="animation-delay: 500ms;">
		<Expertise />
	</div>

	<div id="background" class="animate-fade-in-up" style="animation-delay: 600ms;">
		<BackgroundInfo />
	</div>
</div>

<!-- Analytics Display -->
<div class="animate-fade-in-up py-8 bg-background/50" style="animation-delay: 650ms;">
	<div class="container mx-auto px-6 flex justify-center">
		<AnalyticsDisplay />
	</div>
</div>

<div class="animate-fade-in-up" style="animation-delay: 700ms;">
	<TerminalFooter />
</div>
