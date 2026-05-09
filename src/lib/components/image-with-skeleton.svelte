<script lang="ts">
	import {
		isPortfolioImageFailed,
		normalizeAssetSrc
	} from '$lib/preloadPortfolioImages';

	type Props = {
		src: string;
		alt: string;
		imgClass?: string;
		/** `fill`: cover parent `relative` box (default). `intrinsic`: natural image size (e.g. title GIF). */
		layout?: 'fill' | 'intrinsic';
	};

	let { src, alt, imgClass = '', layout = 'fill' }: Props = $props();

	const normalized = $derived(normalizeAssetSrc(src));
	const failedPreload = $derived(isPortfolioImageFailed(normalized));

	let loaded = $state(false);
	let runtimeFailed = $state(false);

	const showBroken = $derived(failedPreload || runtimeFailed);

	function onLoad(e: Event) {
		const el = e.currentTarget;
		if (!(el instanceof HTMLImageElement)) return;
		el.decode().then(() => {
			loaded = true;
		}).catch(() => {
			loaded = true;
		});
	}

	function onError() {
		runtimeFailed = true;
	}

	const fillShell = 'absolute inset-0 min-h-0 min-w-0';
	const placeholderClass = 'bg-surface-200-700-token/25';
</script>

{#if layout === 'fill'}
	<div class={fillShell}>
		<div class="{fillShell} {placeholderClass}" aria-hidden="true"></div>
		{#if !showBroken}
			<img
				src={normalized}
				alt={loaded ? alt : ''}
				aria-hidden={loaded ? undefined : true}
				loading="eager"
				decoding="async"
				onload={onLoad}
				onerror={onError}
				class="absolute inset-0 h-full w-full object-cover transition-[filter,transform,opacity] duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] {loaded
					? 'opacity-100'
					: 'opacity-0'} {imgClass}"
			/>
		{/if}
	</div>
{:else}
	{#if showBroken}
		<div
			class="inline-block min-h-[12rem] min-w-[12rem] rounded-lg {placeholderClass}"
			aria-hidden="true"
		></div>
	{:else}
		<div
			class="inline-grid [grid-template-areas:'stack'] justify-items-center align-middle"
		>
			<div
				class="[grid-area:stack] min-h-[12rem] min-w-[12rem] rounded-lg {placeholderClass} transition-opacity duration-300 {loaded
					? 'opacity-0'
					: 'opacity-100'}"
				aria-hidden="true"
			></div>
			<img
				src={normalized}
				alt={loaded ? alt : ''}
				aria-hidden={loaded ? undefined : true}
				loading="eager"
				decoding="async"
				onload={onLoad}
				onerror={onError}
				class="[grid-area:stack] relative z-[1] h-auto w-auto max-h-[min(24rem,70vh)] object-contain transition-opacity duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] {loaded
					? 'opacity-100'
					: 'opacity-0'} {imgClass}"
			/>
		</div>
	{/if}
{/if}
