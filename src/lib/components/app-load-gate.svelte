<script lang="ts">
	/**
	 * Load gate: bar motion is CSS (asymptotic crawl, stays under 75% until dismiss) so it runs on hard refresh as soon as styles paint.
	 * JS only decides when to finish (fonts + window load + min time), then snaps bar full and fades.
	 */
	import { onMount } from 'svelte';

	let show = $state(true);
	let overlayOpacity = $state(1);
	let dismissing = $state(false);

	const MIN_GATE_MS = 1000;

	onMount(() => {
		let finished = false;
		const t0 = performance.now();
		let hideTimeoutId = 0;
		let completeWaitId = 0;

		function windowLoad(): Promise<void> {
			return new Promise((resolve) => {
				if (document.readyState === 'complete') resolve();
				else window.addEventListener('load', () => resolve(), { once: true });
			});
		}

		function complete() {
			if (finished) return;
			finished = true;
			dismissing = true;
			requestAnimationFrame(() => {
				overlayOpacity = 0;
			});
			hideTimeoutId = window.setTimeout(() => {
				show = false;
				document.body.style.overflow = '';
			}, 500);
		}

		function scheduleComplete() {
			requestAnimationFrame(() => {
				requestAnimationFrame(complete);
			});
		}

		document.body.style.overflow = 'hidden';

		function whenReadyToDismiss() {
			const elapsed = performance.now() - t0;
			const remaining = Math.max(0, MIN_GATE_MS - elapsed);
			completeWaitId = window.setTimeout(() => {
				completeWaitId = 0;
				scheduleComplete();
			}, remaining);
		}

		Promise.all([document.fonts.ready, windowLoad()])
			.then(whenReadyToDismiss)
			.catch(whenReadyToDismiss);

		return () => {
			finished = true;
			clearTimeout(hideTimeoutId);
			clearTimeout(completeWaitId);
			document.body.style.overflow = '';
		};
	});
</script>

{#if show}
	<div
		class="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-surface-50-900-token px-6 transition-[opacity] duration-500 ease-out sm:px-10"
		style:opacity={overlayOpacity}
		role="progressbar"
		aria-busy="true"
		aria-valuetext="Loading site"
		aria-label="Loading site"
	>
		<div
			class="h-1 w-full max-w-md overflow-hidden rounded-full bg-surface-200-700-token/45 dark:bg-surface-700/60"
		>
			<div
				class="gate-bar-fill h-full min-w-[2px] rounded-full bg-primary-500 dark:bg-primary-400"
				class:gate-bar-fill--done={dismissing}
			></div>
		</div>
	</div>
{/if}

<style>
	.gate-bar-fill {
		width: 4%;
		animation: gate-bar-asymptote 52s forwards;
	}

	.gate-bar-fill--done {
		animation: none;
		width: 100%;
		transition: width 0.22s ease-out;
	}

	@keyframes gate-bar-asymptote {
		0% {
			width: 4%;
			animation-timing-function: cubic-bezier(0.32, 0, 0.28, 1);
		}
		14% {
			width: 38%;
			animation-timing-function: cubic-bezier(0.28, 0, 0.22, 1);
		}
		34% {
			width: 55%;
			animation-timing-function: cubic-bezier(0.24, 0, 0.18, 1);
		}
		58% {
			width: 65%;
			animation-timing-function: cubic-bezier(0.2, 0, 0.14, 1);
		}
		78% {
			width: 70%;
			animation-timing-function: cubic-bezier(0.14, 0, 0.1, 1);
		}
		100% {
			width: 74%;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.gate-bar-fill {
			animation: none;
			width: 33%;
		}

		.gate-bar-fill--done {
			width: 100%;
		}
	}
</style>
