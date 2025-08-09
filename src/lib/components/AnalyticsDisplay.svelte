<script lang="ts">
	import { Eye, Download } from 'lucide-svelte';
	import { analyticsData } from '$lib/stores/analytics';

	// Format numbers with commas
	function formatNumber(num: number): string {
		return num.toLocaleString();
	}
</script>

<!-- Analytics Counter -->
<div class="flex items-center justify-center gap-4 sm:gap-6 py-3 sm:py-4 px-4 sm:px-6 bg-card/50 backdrop-blur-sm border border-primary/30 rounded-lg max-w-sm sm:max-w-md mx-auto shadow-lg transition-all duration-300">
	<!-- ✅ Site Visits -->
	<div class="flex items-center gap-2 text-sm">
		<div class="p-1.5 sm:p-2 bg-primary/20 rounded-full">
			<Eye class="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
		</div>
		<div class="flex flex-col">
			<span class="text-xs text-muted-foreground">Visits</span>
			<span class="font-semibold text-foreground text-sm sm:text-base">{formatNumber($analyticsData.visits)}</span>
		</div>
	</div>

	<!-- Divider -->
	<div class="w-px h-6 sm:h-8 bg-border"></div>

	<!-- ✅ CV Downloads -->
	<div class="flex items-center gap-2 text-sm">
		<div class="p-1.5 sm:p-2 bg-primary/20 rounded-full">
			<Download class="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
		</div>
		<div class="flex flex-col">
			<span class="text-xs text-muted-foreground">Downloads</span>
			<span class="font-semibold text-foreground text-sm sm:text-base">{formatNumber($analyticsData.downloads)}</span>
		</div>
	</div>
</div>

<style>
	/* Smooth transitions */
	div {
		transition: all 0.3s ease;
	}
</style>