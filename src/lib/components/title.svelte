<script lang="ts">
	import IconBrandLinkedin from '@tabler/icons-svelte/icons/brand-linkedin';
	import IconBrandGithub from '@tabler/icons-svelte/icons/brand-github';
	import IconMail from '@tabler/icons-svelte/icons/mail';
	import IconArticle from '@tabler/icons-svelte/icons/article';
	import IconArrowBadgeDownFilled from '@tabler/icons-svelte/icons/arrow-badge-down-filled';

	import { popup, clipboard } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';
	import { slide } from 'svelte/transition';
	import { onMount } from 'svelte';
	const email: string = 'bluevs10@hotmail.no';
	let copy = {
		text: 'Copy',
		style: 'variant-filled-primary'
	};

	const popupFeatured: PopupSettings = {
		// Represents the type of event that opens/closed the popup
		event: 'click',
		// Matches the data-popup value on your popup element
		target: 'popupFeatured',
		// Defines which side of your trigger the popup will appear
		placement: 'bottom'
	};
	function onCopy() {
		copy.text = 'Copied!';
		copy.style = 'variant-filled-surface';
		setTimeout(() => {
			copy.text = 'Copy';
			copy.style = 'variant-filled-primary';
		}, 500);
	}
	let visible = false;
	onMount(() => (visible = true));
</script>

<div class="flex justify-center items-center h-screen container mx-auto text-center lg:text-left">
	<div class="flex flex-col items-center">
		<div class="flex flex-row">
			<div class="hidden lg:block">
				<img src="./images/giphy.gif" alt="dance" />
			</div>

			<div class="space-y-5 items-center">
				<h1 class="h1">Hello! I'm Fabian</h1>
				<p>I'm a computer nerd from Norway</p>
				<h2 class="h2">More stuff:</h2>

				<div class="logo-cloud grid-cols-1 lg:!grid-cols-3 gap-1">
					<a class="logo-item" target="_blank" href="https://github.com/QuiescentTrip">
						<span><IconBrandGithub size="48" /></span>
					</a>
					<a class="logo-item" target="_blank" href="https://blog.fabiantangen.no">
						<span>
							<IconArticle size="48" />
						</span>
					</a>
					<a href="/" class="logo-item" use:popup={popupFeatured}
						><span>
							<IconMail size="48" />
						</span></a
					>
					<div class="card p-4 shadow-xl" data-popup="popupFeatured">
						<div class="flex items-center gap-4 p-1">
							<p class="code text-lg">{email}</p>
							<button class="btn {copy.style}" on:click={() => onCopy()} use:clipboard={email}
								>{copy.text}</button
							>
						</div>
						<div class="arrow bg-surface-100-800-token" />
					</div>
					<!-- ... -->
				</div>
			</div>
		</div>
		{#if visible}
			<div in:slide={{ delay: 1000, duration: 300, axis: 'y' }}>
				<p class="h3 p-5"><IconArrowBadgeDownFilled /></p>
			</div>
		{/if}
	</div>
</div>
