<script lang="ts">
	import ImageWithSkeleton from '$lib/components/image-with-skeleton.svelte';
	import ScrollFlyIn from '$lib/components/scroll-fly-in.svelte';

	/** Put your portrait at `static/images/about/me.jpg` (or change path). */
	const PORTRAIT_SRC = '/images/about/me.jpg';

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

	const portraitFilter = 'dark:sepia dark:brightness-[0.88] dark:saturate-[0.78]';

	const cardReserveShell =
		'pointer-events-none h-full w-full min-h-0 bg-surface-200-700-token/25';

	const portraitReserveShell =
		'pointer-events-none h-full w-full min-h-0 rounded-2xl bg-surface-200-700-token/25';

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
	class="content relative scroll-mt-24 overflow-x-clip border-t border-surface-200-700-token py-20 pb-28"
>
	<div
		class="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-surface-50-900-token/0 via-primary-500/5 to-surface-50-900-token/0 dark:via-primary-400/10"
	></div>

	<div class="container mx-auto max-w-5xl px-4 lg:px-8">
		<ScrollFlyIn class="mb-12 min-h-[3.5rem] text-center sm:min-h-[4rem] lg:min-h-[4.5rem]">
			{#snippet children()}
				<h2 class="h1 text-token">About me</h2>
			{/snippet}
		</ScrollFlyIn>

		<div class="flex flex-col gap-12 lg:flex-row lg:items-stretch lg:gap-x-16 lg:gap-y-14">
			<div class="lg:sticky lg:top-28 lg:w-5/12 lg:max-w-none lg:shrink-0 lg:self-start">
				<ScrollFlyIn
					class="mx-auto aspect-[3/4] w-full max-w-sm lg:mx-0 lg:max-w-none"
					innerClass="h-full min-h-0 w-full"
					reservePlaceholderClass={portraitReserveShell}
					delay={70}
					y={26}
				>
					{#snippet children()}
						<div
							class="relative h-full w-full overflow-hidden rounded-2xl shadow-xl "
						>
							<ImageWithSkeleton
								src={PORTRAIT_SRC}
								alt="Portrait"
								imgClass={portraitFilter}
							/>
						</div>
					{/snippet}
				</ScrollFlyIn>
			</div>

			<div class="flex min-h-0 flex-1 flex-col gap-4 lg:min-h-0 lg:w-7/12">
				<ScrollFlyIn
					class="card variant-soft p-6 sm:p-8 lg:flex lg:min-h-0 lg:flex-1 lg:flex-col lg:justify-center"
					innerClass="min-h-0 w-full flex-1 lg:flex lg:flex-col lg:justify-center"
					reservePlaceholderClass={cardReserveShell}
					delay={0}
					y={20}
				>
					{#snippet children()}
						<p class="text-base leading-relaxed">
							I am Fabian, I love puzzles, music and making/breaking things. I currently reside in
							<b class="text-primary-500">Oslo</b> which means my local time is
							<time class="font-semibold tabular-nums text-primary-500" datetime={osloTimeDatetime}
								>{osloTimeLabel}</time
							>.
						</p>
					{/snippet}
				</ScrollFlyIn>
				<ScrollFlyIn
					class="card variant-soft p-6 sm:p-8 lg:flex lg:min-h-0 lg:flex-1 lg:flex-col lg:justify-center"
					innerClass="min-h-0 w-full flex-1 lg:flex lg:flex-col lg:justify-center"
					reservePlaceholderClass={cardReserveShell}
					delay={55}
					y={20}
				>
					{#snippet children()}
						<p class="text-base leading-relaxed">
							I specialize in web development, and both on-site and cloud <b class="text-primary-600">infrastructure</b>. I also do
							quite enjoy both binary and web hacking.
						</p>
					{/snippet}
				</ScrollFlyIn>
				<ScrollFlyIn
					class="card variant-soft p-6 sm:p-8 lg:flex lg:min-h-0 lg:flex-1 lg:flex-col lg:justify-center"
					innerClass="min-h-0 w-full flex-1 lg:flex lg:flex-col lg:justify-center"
					reservePlaceholderClass={cardReserveShell}
					delay={110}
					y={20}
				>
					{#snippet children()}
						<p class="text-base leading-relaxed">
							My favorite language is <code class={langCode}>TypeScript</code>, however recently I
							have been really liking <code class={langCode}>Go</code> and
							<code class={langCode}>Rust</code>.
						</p>
					{/snippet}
				</ScrollFlyIn>
				<ScrollFlyIn
					class="card variant-soft p-6 sm:p-8 lg:flex lg:min-h-0 lg:flex-1 lg:flex-col lg:justify-center"
					innerClass="min-h-0 w-full flex-1 lg:flex lg:flex-col lg:justify-center"
					reservePlaceholderClass={cardReserveShell}
					delay={165}
					y={20}
				>
					{#snippet children()}
						<p class="text-base leading-relaxed">
							In my free time I do music including live coding on
							<a href="https://strudel.cc" target="_blank" class="text-primary-500">strudel</a>. As
							well as a bit of video and photo editing.
						</p>
					{/snippet}
				</ScrollFlyIn>
			</div>
		</div>
	</div>
</section>
