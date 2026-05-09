<script lang="ts">
	import ThemeToggle from '$lib/components/theme-toggle.svelte';

	type SectionId = 'top' | 'projects' | 'achievements' | 'about';

	const navItems: { id: Exclude<SectionId, 'top'>; href: string; label: string }[] = [
		{ id: 'projects', href: '/#projects', label: 'Projects' },
		{ id: 'achievements', href: '/#achievements', label: 'Achievements' },
		{ id: 'about', href: '/#about', label: 'About' }
	];

	let active = $state<SectionId>('top');

	/** While smooth-scrolling to a hash, scroll events still fire; spy would keep the *previous* section until the target crosses the line. Skip spy until scroll settles. */
	let ignoreSpyUntil = 0;
	let spyResumeTimer: ReturnType<typeof setTimeout> | null = null;
	let runUpdateActive: (() => void) | null = null;

	function armNavScrollPause() {
		const now = performance.now();
		ignoreSpyUntil = now + 1800;
		if (spyResumeTimer !== null) clearTimeout(spyResumeTimer);
		spyResumeTimer = setTimeout(() => {
			spyResumeTimer = null;
			ignoreSpyUntil = 0;
			runUpdateActive?.();
		}, 1800);
	}

	function activateFromHref(href: string, pauseSpy = true) {
		const hash = href.includes('#') ? href.slice(href.indexOf('#') + 1) : '';
		if (hash === '' || hash === 'top') {
			active = 'top';
		} else if (hash === 'projects' || hash === 'achievements' || hash === 'about') {
			active = hash;
		}
		if (pauseSpy) armNavScrollPause();
	}

	$effect(() => {
		if (typeof window === 'undefined') return;
		if (!document.getElementById('projects')) return;

		/** ~scroll-mt-24 + slack for subpixel; pick section whose top is nearest below this line */
		const threshold = 120;

		function updateActive() {
			if (window.scrollY < 72) {
				active = 'top';
				return;
			}
			if (performance.now() < ignoreSpyUntil) return;

			let current: SectionId = 'projects';
			let bestTop = -Infinity;
			for (const { id } of navItems) {
				const el = document.getElementById(id);
				if (!el) continue;
				const top = el.getBoundingClientRect().top;
				if (top <= threshold && top > bestTop) {
					bestTop = top;
					current = id;
				}
			}
			active = current;
		}

		runUpdateActive = updateActive;

		function finishScrollAndSync() {
			if (spyResumeTimer !== null) {
				clearTimeout(spyResumeTimer);
				spyResumeTimer = null;
			}
			ignoreSpyUntil = 0;
			updateActive();
		}

		function syncFromHash(pauseSpy: boolean) {
			const h = window.location.hash;
			if (h.length > 1) {
				activateFromHref(h, pauseSpy);
			} else {
				if (spyResumeTimer !== null) {
					clearTimeout(spyResumeTimer);
					spyResumeTimer = null;
				}
				ignoreSpyUntil = 0;
				updateActive();
			}
		}

		syncFromHash(false);

		function onHashChange() {
			syncFromHash(true);
		}

		window.addEventListener('scroll', updateActive, { passive: true });
		window.addEventListener('resize', updateActive, { passive: true });
		window.addEventListener('hashchange', onHashChange);
		window.addEventListener('scrollend', finishScrollAndSync);
		return () => {
			window.removeEventListener('scroll', updateActive);
			window.removeEventListener('resize', updateActive);
			window.removeEventListener('hashchange', onHashChange);
			window.removeEventListener('scrollend', finishScrollAndSync);
			runUpdateActive = null;
			if (spyResumeTimer !== null) clearTimeout(spyResumeTimer);
		};
	});
</script>

<header class="pointer-events-none fixed top-0 left-0 right-0 z-50 flex justify-center px-3 pt-3 sm:px-4 sm:pt-4">
	<div
		class="pointer-events-auto grid w-full max-w-5xl grid-cols-[1fr_auto] items-center gap-x-3 gap-y-2 rounded-2xl border border-surface-200-700-token/70 bg-surface-50-900-token/78 px-3 py-2 shadow-lg shadow-surface-900/10 backdrop-blur-lg dark:border-surface-500/30 dark:bg-surface-900-50-token/75 dark:shadow-black/35 sm:grid-cols-[1fr_auto_1fr] sm:gap-x-5 sm:px-4 sm:py-2.5"
	>
		<div class="min-w-0 justify-self-start">
			<a
				href="/#top"
				class="block max-w-[11rem] truncate no-underline transition-opacity hover:opacity-90 sm:max-w-none"
				aria-current={active === 'top' ? 'page' : undefined}
				onclick={() => activateFromHref('/#top')}
			>
				<span
					class="block text-left text-lg font-normal leading-tight text-token [font-family:var(--theme-font-family-heading)] sm:text-xl"
				>
					Fabian Tangen
				</span>
			</a>
		</div>

		<nav
			class="hidden min-w-0 justify-self-center px-0 sm:block"
			aria-label="On this page"
		>
			<div
				class="flex max-w-[min(100vw-8rem,28rem)] rounded-full bg-surface-200-700-token/50 p-0.5 sm:max-w-none dark:bg-stone-950/25"
			>
				{#each navItems as item}
					<a
						href={item.href}
						class="whitespace-nowrap rounded-full px-2 py-1.5 text-center text-[0.7rem] text-token transition-[background,box-shadow,font-weight] duration-200 sm:px-3 sm:text-xs {active ===
						item.id
							? 'bg-stone-100 font-bold shadow-md ring-2 ring-stone-600/45 dark:bg-stone-800 dark:font-bold dark:ring-stone-400/45'
							: 'font-medium opacity-85 hover:bg-surface-200-700-token/55 hover:opacity-100 dark:hover:bg-stone-800/40'}"
						aria-current={active === item.id ? 'location' : undefined}
						onclick={() => activateFromHref(item.href)}
					>
						{item.label}
					</a>
				{/each}
			</div>
		</nav>

		<div class="justify-self-end">
			<ThemeToggle />
		</div>
	</div>
</header>
