<script lang="ts">
	import {
		getModeOsPrefers,
		modeCurrent,
		setInitialClassState,
		setModeCurrent,
		setModeUserPrefers
	} from '@skeletonlabs/skeleton';
	import IconMoon from '@tabler/icons-svelte/icons/moon';
	import IconSun from '@tabler/icons-svelte/icons/sun';
	import { onMount } from 'svelte';

	onMount(() => {
		if (!('modeCurrent' in localStorage)) {
			setModeCurrent(getModeOsPrefers());
		}
	});

	function toggle() {
		const next = !$modeCurrent;
		setModeUserPrefers(next);
		setModeCurrent(next);
	}

	function onKeydown(e: KeyboardEvent) {
		if (e.code === 'Enter' || e.code === 'Space') {
			e.preventDefault();
			toggle();
		}
	}
</script>

<svelte:head>
	{@html `<\u{73}cript nonce="%sveltekit.nonce%">(${setInitialClassState.toString()})();</script>`}
</svelte:head>

<!-- Stone palette only (warm neutrals) — avoids Skeleton surface / primary reading blue. -->
<button
	type="button"
	class="relative h-7 w-12 shrink-0 cursor-pointer rounded-full border border-stone-500/45 bg-stone-400/75 shadow-inner transition-[box-shadow] hover:border-stone-500/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-600 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-200 dark:border-stone-600/80 dark:bg-stone-700/90 dark:hover:border-stone-500/60 dark:focus-visible:ring-stone-400 dark:focus-visible:ring-offset-stone-900"
	role="switch"
	title="Toggle light or dark mode"
	aria-checked={$modeCurrent}
	aria-label="Toggle light or dark mode"
	tabindex="0"
	onclick={toggle}
	onkeydown={onKeydown}
>
	<span
		class="pointer-events-none absolute top-1/2 left-0.5 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full border border-stone-500/25 bg-stone-100 shadow-md transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] dark:border-stone-600/50 dark:bg-stone-800 dark:shadow-black/40 {$modeCurrent
			? 'translate-x-[1.125rem]'
			: 'translate-x-0'}"
	>
		{#if $modeCurrent}
			<IconSun size={14} stroke={1.75} class="text-stone-800" aria-hidden="true" />
		{:else}
			<IconMoon size={14} stroke={1.75} class="text-stone-200" aria-hidden="true" />
		{/if}
	</span>
</button>
