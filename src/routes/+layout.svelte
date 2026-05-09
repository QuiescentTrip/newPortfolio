<script lang="ts">
	import '../app.postcss';

	// Highlight JS
	import hljs from 'highlight.js/lib/core';
	import 'highlight.js/styles/github-dark.css';
	import { storeHighlightJs } from '@skeletonlabs/skeleton';
	import xml from 'highlight.js/lib/languages/xml'; // for HTML
	import css from 'highlight.js/lib/languages/css';
	import javascript from 'highlight.js/lib/languages/javascript';
	import typescript from 'highlight.js/lib/languages/typescript';
	hljs.registerLanguage('xml', xml); // for HTML
	hljs.registerLanguage('css', css);
	hljs.registerLanguage('javascript', javascript);
	hljs.registerLanguage('typescript', typescript);
	storeHighlightJs.set(hljs);

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup, AppBar, LightSwitch } from '@skeletonlabs/skeleton';
	import SiteFooter from '$lib/components/site-footer.svelte';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
</script>

<AppBar
	class="fixed w-screen z-50"
	gridColumns="grid-cols-3"
	slotDefault="place-self-center"
	slotTrail="place-content-end"
>
	<svelte:fragment slot="lead"
		><a class="btn" href="/"> <p class="h2">Fabian Tangen</p></a></svelte:fragment
	>
	<nav class="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm sm:gap-x-5">
		<a class="anchor" href="/blog">Blog</a>
		<a class="anchor" href="/#about">About</a>
	</nav>
	<svelte:fragment slot="trail"><div class="mr-3"><LightSwitch /></div></svelte:fragment>
</AppBar>

<div class="flex min-h-screen flex-col">
	<slot />
	<SiteFooter />
</div>
