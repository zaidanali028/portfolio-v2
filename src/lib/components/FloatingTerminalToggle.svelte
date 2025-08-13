<script lang="ts">
	import { Terminal, X } from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';

	export let isOpen = false;

	const dispatch = createEventDispatcher<{
		toggle: boolean;
	}>();

	function handleToggle() {
		isOpen = !isOpen;
		dispatch('toggle', isOpen);
	}
</script>

<!-- Floating Action Button -->
<button
	on:click={handleToggle}
	class="fixed bottom-6 right-6 z-50 w-14 h-14 bg-primary hover:bg-primary/90 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
	class:rotate-180={isOpen}
	aria-label={isOpen ? 'Close Terminal' : 'Open Terminal'}
	type="button"
>
	{#if isOpen}
		<X class="w-6 h-6 mx-auto transition-transform duration-300" />
	{:else}
		<Terminal class="w-6 h-6 mx-auto transition-transform duration-300 group-hover:animate-pulse" />
	{/if}
	
	<!-- Ripple effect -->
	<div class="absolute inset-0 rounded-full bg-white/20 scale-0 group-hover:scale-100 transition-transform duration-300"></div>
</button>

<!-- Tooltip -->
{#if !isOpen}
	<div class="fixed bottom-6 right-20 z-40 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
		Open Terminal
		<div class="absolute top-1/2 -right-1 w-2 h-2 bg-gray-900 rotate-45 transform -translate-y-1/2"></div>
	</div>
{/if}

<style>
	button {
		box-shadow: 
			0 4px 14px 0 rgba(0, 0, 0, 0.1),
			0 0 0 1px rgba(255, 255, 255, 0.05);
	}

	button:hover {
		box-shadow: 
			0 6px 20px 0 rgba(0, 0, 0, 0.15),
			0 0 0 1px rgba(255, 255, 255, 0.1);
	}

	.rotate-180 {
		transform: rotate(180deg);
	}
</style>
