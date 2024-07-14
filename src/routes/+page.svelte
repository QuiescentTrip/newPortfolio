<script lang="ts">
	import { IconBrandLinkedin, IconBrandGithub, IconMail } from '@tabler/icons-svelte';
	import { popup, clipboard } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';

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
</script>

<svelte:head>
	<title>Fabian Ø. Tangen</title>
</svelte:head>

<div class="flex justify-center items-center h-screen container mx-auto text-left">
	<div class="flex flex-row">
		<div>
			<img src="./images/giphy.gif" alt="dance" />
		</div>

		<div class="space-y-5 items-center">
			<h1 class="h1">Hello! I'm Fabian</h1>
			<p>I'm a computer nerd from Norway</p>
			<h2 class="h2">My socials:</h2>

			<div class="logo-cloud grid-cols-1 lg:!grid-cols-3 gap-1">
				<a class="logo-item" target="_blank" href="https://github.com/QuiescentTrip">
					<span><IconBrandGithub size="48" /></span>
				</a>
				<a
					class="logo-item"
					target="_blank"
					href="https://www.linkedin.com/in/fabian-tangen-2047b3255/"
				>
					<span>
						<IconBrandLinkedin size="48" />
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
</div>
