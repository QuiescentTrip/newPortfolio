<script lang="ts">
	type Props = {
		src: string;
		alt: string;
		imgClass?: string;
		loading?: 'lazy' | 'eager';
		skeleton?: 'fill' | 'portrait';
	};

	let {
		src,
		alt,
		imgClass = '',
		loading = 'eager',
		skeleton = 'fill'
	}: Props = $props();

	let ready = $state(false);
	let imgEl: HTMLImageElement | undefined = $state();

	$effect(() => {
		src;
		ready = false;
	});

	$effect(() => {
		if (imgEl?.complete && imgEl.naturalHeight > 0) ready = true;
	});
</script>

{#if skeleton === 'portrait' && !ready}
	<div
		class="pointer-events-none absolute inset-0 z-[1] flex flex-col items-center justify-center gap-3 bg-surface-200-700-token/60 animate-pulse"
	>
		<div class="h-28 w-28 rounded-full bg-surface-100-800-token/60"></div>
		<div class="h-3 w-32 rounded-full bg-surface-100-800-token/50"></div>
	</div>
{:else if skeleton === 'fill' && !ready}
	<div
		class="pointer-events-none absolute inset-0 z-[1] bg-surface-200-700-token/55 animate-pulse"
	></div>
{/if}
<img
	bind:this={imgEl}
	{src}
	{alt}
	{loading}
	decoding="async"
	class="absolute inset-0 z-[2] h-full w-full object-cover transition-opacity duration-500 {imgClass} {ready
		? 'opacity-100'
		: 'opacity-0'}"
	onload={() => (ready = true)}
	onerror={() => (ready = true)}
/>
