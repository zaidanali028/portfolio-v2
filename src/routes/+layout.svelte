<script lang="ts">
	import '../app.css';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import { onMount } from 'svelte';
	import { initializeScrollTracking, initializeMotionPreference, animationState } from '$lib/utils/animations';
	import { analytics } from '$lib/stores/analytics';

	let { children } = $props();

	onMount(() => {
		// Initialize animation systems
		initializeMotionPreference();
		const cleanupScroll = initializeScrollTracking();

		// Initialize analytics
		analytics.initialize();

		// Only scroll to top on initial page load, not on navigation
		if (!window.location.hash) {
			window.scrollTo(0, 0);
		}

		// Set page as loaded immediately
		animationState.update(state => ({
			...state,
			pageLoaded: true
		}));

		return () => {
			cleanupScroll?.();
		};
	});
</script>

<svelte:head>
	<title>Ali Zaidan | DevOps - Backend Engineer</title>
	<meta name="description" content="Professional portfolio of Ali Zaidan, AWS Certified Solutions Architect and DevOps Engineer specializing in cloud architecture and automation." />
	<link rel="icon" href="/favicon.ico" />
</svelte:head>

<main class="min-h-screen bg-background text-foreground">
	<ThemeToggle />
	{@render children?.()}
</main>
