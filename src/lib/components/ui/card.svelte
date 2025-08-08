<script lang="ts">
	import { cn } from "$lib/utils.js";

	export let className: string = "";

	$: classes = cn("rounded-lg border bg-card text-card-foreground shadow-sm", className);
</script>

<div class={classes} {...$$restProps}>
	<slot />
</div>
