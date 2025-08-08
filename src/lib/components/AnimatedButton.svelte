<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { hoverAnimation, magneticHover } from '$lib/actions/animations';

	interface Props {
		variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
		size?: 'sm' | 'md' | 'lg';
		disabled?: boolean;
		loading?: boolean;
		href?: string;
		target?: string;
		class?: string;
		magnetic?: boolean;
		glow?: boolean;
		ripple?: boolean;
	}

	let {
		variant = 'primary',
		size = 'md',
		disabled = false,
		loading = false,
		href,
		target,
		class: className = '',
		magnetic = false,
		glow = false,
		ripple = true,
		children,
		...restProps
	}: Props = $props();

	const dispatch = createEventDispatcher();

	let buttonElement: HTMLElement;
	let ripples: Array<{ id: number; x: number; y: number }> = [];
	let rippleId = 0;

	function handleClick(event: MouseEvent) {
		if (disabled || loading) return;

		if (ripple) {
			createRipple(event);
		}

		dispatch('click', event);
	}

	function createRipple(event: MouseEvent) {
		if (!buttonElement) return;

		const rect = buttonElement.getBoundingClientRect();
		const x = event.clientX - rect.left;
		const y = event.clientY - rect.top;

		const newRipple = { id: rippleId++, x, y };
		ripples = [...ripples, newRipple];

		// Remove ripple after animation
		setTimeout(() => {
			ripples = ripples.filter(r => r.id !== newRipple.id);
		}, 600);
	}

	$: baseClasses = [
		'relative inline-flex items-center justify-center font-medium transition-all duration-300 ease-out',
		'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary',
		'disabled:opacity-50 disabled:cursor-not-allowed',
		'overflow-hidden group',
		className
	].join(' ');

	$: variantClasses = {
		primary: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl hover:shadow-primary/25',
		secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
		outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground',
		ghost: 'text-primary hover:bg-primary/10'
	}[variant];

	$: sizeClasses = {
		sm: 'px-3 py-1.5 text-sm rounded-md',
		md: 'px-4 py-2 text-sm rounded-lg',
		lg: 'px-6 py-3 text-base rounded-xl'
	}[size];

	$: glowClasses = glow ? 'animate-glow' : '';

	$: finalClasses = [baseClasses, variantClasses, sizeClasses, glowClasses].join(' ');

	$: hoverProps = magnetic 
		? { scale: 1.05, duration: 200 }
		: { scale: 1.02, duration: 200 };
</script>

{#if href}
	<a
		{href}
		{target}
		bind:this={buttonElement}
		class={finalClasses}
		use:hoverAnimation={hoverProps}
		use:magneticHover={magnetic ? { strength: 0.2 } : undefined}
		on:click={handleClick}
		{...restProps}
	>
		<!-- Background gradient animation -->
		<div class="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out"></div>
		
		<!-- Ripple effects -->
		{#each ripples as ripple (ripple.id)}
			<div
				class="absolute bg-white/30 rounded-full animate-ping pointer-events-none"
				style="left: {ripple.x}px; top: {ripple.y}px; width: 10px; height: 10px; margin-left: -5px; margin-top: -5px;"
			></div>
		{/each}

		<!-- Loading spinner -->
		{#if loading}
			<div class="mr-2">
				<div class="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
			</div>
		{/if}

		<!-- Content -->
		<span class="relative z-10 flex items-center gap-2">
			{@render children?.()}
		</span>

		<!-- Shine effect -->
		<div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
	</a>
{:else}
	<button
		bind:this={buttonElement}
		class={finalClasses}
		{disabled}
		use:hoverAnimation={hoverProps}
		use:magneticHover={magnetic ? { strength: 0.2 } : undefined}
		on:click={handleClick}
		{...restProps}
	>
		<!-- Background gradient animation -->
		<div class="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out"></div>
		
		<!-- Ripple effects -->
		{#each ripples as ripple (ripple.id)}
			<div
				class="absolute bg-white/30 rounded-full animate-ping pointer-events-none"
				style="left: {ripple.x}px; top: {ripple.y}px; width: 10px; height: 10px; margin-left: -5px; margin-top: -5px;"
			></div>
		{/each}

		<!-- Loading spinner -->
		{#if loading}
			<div class="mr-2">
				<div class="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
			</div>
		{/if}

		<!-- Content -->
		<span class="relative z-10 flex items-center gap-2">
			{@render children?.()}
		</span>

		<!-- Shine effect -->
		<div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
	</button>
{/if}

<style>
	/* Enhanced button animations */
	:global(.animate-glow) {
		animation: glow 2s ease-in-out infinite alternate;
	}

	@keyframes glow {
		from {
			box-shadow: 0 0 5px hsl(var(--primary) / 0.5);
		}
		to {
			box-shadow: 0 0 20px hsl(var(--primary) / 0.8), 0 0 30px hsl(var(--primary) / 0.4);
		}
	}

	/* Smooth transitions */
	button, a {
		backface-visibility: hidden;
		transform-style: preserve-3d;
	}
</style>
