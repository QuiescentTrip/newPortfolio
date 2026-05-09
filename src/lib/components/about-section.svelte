<script lang="ts">
	/** Put your portrait at `static/images/about/me.jpg` (or change path). */
	const PORTRAIT_SRC = '/images/about/me.jpg';

	let portraitReady = $state(false);

	const OSLO_TZ = 'Europe/Oslo';
	const osloTimeFormatter = new Intl.DateTimeFormat('en-GB', {
		timeZone: OSLO_TZ,
		hour: '2-digit',
		minute: '2-digit',
		hour12: false
	});
	const osloNow = () => {
		const now = new Date();
		return { label: osloTimeFormatter.format(now), datetime: now.toISOString() };
	};
	const initialOslo = osloNow();
	let osloTimeLabel = $state(initialOslo.label);
	let osloTimeDatetime = $state(initialOslo.datetime);

	const langCode =
		'code chip variant-soft-primary mx-0.5 inline-flex items-baseline px-2 py-0.5 align-baseline text-[0.9em] leading-none';

	$effect(() => {
		const tick = () => {
			const next = osloNow();
			osloTimeLabel = next.label;
			osloTimeDatetime = next.datetime;
		};
		const id = setInterval(tick, 1000);
		return () => clearInterval(id);
	});
</script>

<section
	id="about"
	class="content relative scroll-mt-24 overflow-x-hidden border-t border-surface-200-700-token py-20 pb-28"
>
	<div
		class="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-surface-50-900-token/0 via-primary-500/5 to-surface-50-900-token/0 dark:via-primary-400/10"
	></div>

	<div class="container mx-auto max-w-5xl px-4 lg:px-8">
		<div class="mb-12 text-center lg">
			<h2 class="h1 text-token">About me</h2>
		</div>

		<div
			class="flex flex-col gap-12 lg:flex-row lg:items-stretch lg:gap-x-16 lg:gap-y-14"
		>
			<div class="lg:sticky lg:top-28 lg:w-5/12 lg:max-w-none lg:shrink-0 lg:self-start">
				<div
					class="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-2xl shadow-xl ring-2 ring-surface-200-700-token lg:mx-0 lg:max-w-none"
				>
					<img
						src={PORTRAIT_SRC}
						alt="Portrait"
						loading="lazy"
						decoding="async"
						class="h-full w-full object-cover sepia brightness-[0.88] saturate-[0.78] transition-opacity duration-500 {portraitReady
							? 'opacity-100'
							: 'opacity-0'}"
						onload={() => (portraitReady = true)}
					/>
					{#if !portraitReady}
						<div
							class="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-3 bg-surface-200-700-token/40 animate-pulse"
						>
							<div class="h-28 w-28 rounded-full bg-surface-100-800-token/50"></div>
							<div class="h-3 w-32 rounded-full bg-surface-100-800-token/40"></div>
						</div>
					{/if}
				</div>
			</div>

			<div class="flex min-h-0 flex-1 flex-col gap-4 lg:min-h-0 lg:w-7/12">
				<div
					class="card variant-soft p-6 sm:p-8 lg:flex lg:min-h-0 lg:flex-1 lg:flex-col lg:justify-center"
				>
					<p class="text-base leading-relaxed">
						I am Fabian, I love puzzles, music and making/breaking things. I currently reside in Oslo which means my
						local time is
						<time class="font-semibold tabular-nums text-primary-500" datetime={osloTimeDatetime}
							>{osloTimeLabel}</time
						>.
					</p>
				</div>
				<div
					class="card variant-soft p-6 sm:p-8 lg:flex lg:min-h-0 lg:flex-1 lg:flex-col lg:justify-center"
				>
					<p class="text-base leading-relaxed">
						I specialize in web development, and both on-site and cloud infrastructure. I also do quite enjoy both
						binary and web hacking.
					</p>
				</div>
				<div
					class="card variant-soft p-6 sm:p-8 lg:flex lg:min-h-0 lg:flex-1 lg:flex-col lg:justify-center"
				>
					<p class="text-base leading-relaxed">
						My favorite language is <code class={langCode}>TypeScript</code>, however recently I have been really
						liking <code class={langCode}>Go</code> and <code class={langCode}>Rust</code>.
					</p>
				</div>
				<div
					class="card variant-soft p-6 sm:p-8 lg:flex lg:min-h-0 lg:flex-1 lg:flex-col lg:justify-center"
				>
					<p class="text-base leading-relaxed">
						In my free time I do music including live coding on
						<a href="https://strudel.cc" target="_blank" class="text-primary-500">strudel</a>. As well as a bit of
						video and photo editing.
					</p>
				</div>
			</div>
		</div>
	</div>
</section>
