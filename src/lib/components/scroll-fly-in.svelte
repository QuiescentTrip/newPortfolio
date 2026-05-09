<script lang="ts">
	import type { Snippet } from 'svelte';
	import { revealOnScroll } from '$lib/actions/revealOnScroll';
	import { cubicOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';

	type Props = {
		children: Snippet;
		delay?: number;
		y?: number;
		duration?: number;
		class?: string;
		/** Classes on the element that runs the fly transition (e.g. flex grow for card bodies). */
		innerClass?: string;
		rootMargin?: string;
		threshold?: number;
		/** Fills the reserved shell before intersect so layout is not an empty gap. */
		showReservePlaceholder?: boolean;
		/** Full Tailwind string; when omitted, a default muted pulse is used. */
		reservePlaceholderClass?: string;
	};

	let {
		children,
		delay = 0,
		y = 22,
		duration = 420,
		class: className = '',
		innerClass = '',
		rootMargin,
		threshold,
		showReservePlaceholder = true,
		reservePlaceholderClass = ''
	}: Props = $props();

	const reserveShellClass = $derived(
		reservePlaceholderClass ||
			'pointer-events-none h-full w-full min-h-0 rounded-xl animate-pulse bg-surface-200-700-token/30'
	);

	let revealed = $state(false);
	/** Live height of this wrapper while content is mounted (includes padding). */
	let shellH = $state(0);
	/** Frozen height while hidden so the document length does not change when content unmounts. */
	let reservedShellH = $state(0);

	function onReveal() {
		reservedShellH = 0;
		revealed = true;
	}

	function onLeave() {
		if (shellH > 0) reservedShellH = shellH;
		revealed = false;
	}
</script>

<div
	class={className}
	bind:clientHeight={shellH}
	style:min-height={!revealed && reservedShellH > 0 ? `${reservedShellH}px` : undefined}
	use:revealOnScroll={{
		onReveal,
		onLeave,
		...(rootMargin !== undefined ? { rootMargin } : {}),
		...(threshold !== undefined ? { threshold } : {})
	}}
>
	{#if revealed}
		<div class={innerClass} in:fly={{ y, duration, delay, easing: cubicOut }}>
			{@render children()}
		</div>
	{:else if showReservePlaceholder}
		<div class={reserveShellClass} aria-hidden="true"></div>
	{/if}
</div>
