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
	import logo from '$lib/assets/logo.svg';
	import routes from '$lib/NavRoutes';
	import { page } from '$app/stores';
	hljs.registerLanguage('xml', xml); // for HTML
	hljs.registerLanguage('css', css);
	hljs.registerLanguage('javascript', javascript);
	hljs.registerLanguage('typescript', typescript);
	storeHighlightJs.set(hljs);

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup, AppBar, LightSwitch } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
</script>

<AppBar
	class="fixed w-screen"
	gridColumns="grid-cols-3"
	slotDefault="place-self-center"
	slotTrail="place-content-end"
>
	<svelte:fragment slot="lead"
		><a class="btn" href="/"> <p class="h2">Fabian Tangen</p></a></svelte:fragment
	>
	<div class="flex gap-4">
		{#each routes as route}
			{#if $page.route.id == route.href}
				<p>{route.label}</p>
			{:else}
				<a class="anchor" href={route.href}>{route.label}</a>
			{/if}
		{/each}
	</div>
	<svelte:fragment slot="trail"><div class="mr-3"><LightSwitch /></div></svelte:fragment>
</AppBar>

<slot />
