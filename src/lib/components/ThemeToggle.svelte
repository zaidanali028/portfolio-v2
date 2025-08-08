<script lang="ts">
	import { isDarkMode } from '$lib/stores/theme';
	import { Sun, Moon } from 'lucide-svelte';
	import { onMount } from 'svelte';

	onMount(() => {
		isDarkMode.initialize();
	});
</script>

<button
	on:click={isDarkMode.toggle}
	class="fixed top-6 right-6 z-50 p-3 rounded-full bg-card/80 backdrop-blur-sm border border-border/50 hover:bg-card/90 transition-all duration-300 hover:scale-110 group"
	aria-label="Toggle theme"
>
	{#if $isDarkMode}
		<Sun class="w-5 h-5 text-foreground group-hover:text-primary transition-colors" />
	{:else}
		<Moon class="w-5 h-5 text-foreground group-hover:text-primary transition-colors" />
	{/if}
</button>

<style>
	button {
		box-shadow: var(--card-shadow);
	}
</style>
