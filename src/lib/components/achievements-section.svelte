<script lang="ts">
	import ImageWithSkeleton from '$lib/components/image-with-skeleton.svelte';
	import ScrollFlyIn from '$lib/components/scroll-fly-in.svelte';

	type Achievement = {
		image: string;
		alt: string;
		caption: string;
	};

	const achievements: Achievement[] = [
		{
			image: '/images/achievements/01.jpg',
			alt: 'People hacking',
			caption: 'Hosted my very first CTF'
		},
		{
			image: '/images/achievements/02.jpg',
			alt: 'Nginx Proxy Manager',
			caption: 'Set up my own long-term homelab'
		},
		{
			image: '/images/achievements/03.jpg',
			alt: 'Hackathon',
			caption: 'Won my very first hackathon'
		},
		{
			image: '/images/achievements/04.jpg',
			alt: 'Bug',
			caption: 'Made my 6502 computer speak back to me'
		}
	];

	const heroAchievement = achievements[0];
	const pairAchievements = achievements.slice(1, 3);
	const tallAchievement = achievements[3];

	const achievementPhoto =
		'object-cover transition duration-700 ease-out group-hover:scale-[1.04] dark:sepia dark:brightness-[0.88] dark:saturate-[0.78]';
	const captionLayer =
		'pointer-events-none absolute inset-0 z-[10] flex items-center justify-center p-3 sm:p-5';

	const captionClass =
		'max-w-[min(92%,26rem)] rounded-none bg-stone-900/82 py-3 px-4 text-center h2 text-white bg-primary-900/75 dark:bg-primary-800/75';

	/** Pre-reveal shell: dark slab so photo slots read as intentional, not empty. */
	const achievementReserveShell =
		'pointer-events-none h-full w-full min-h-0 rounded-xl bg-stone-900/92 animate-pulse dark:bg-black/70';

	const looseBottom = '0px 0px 0px 0px';
</script>

<section
	id="achievements"
	class="content relative scroll-mt-24 overflow-x-hidden border-t border-surface-200-700-token py-20"
>
	<div
		class="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-surface-50-900-token/0 via-primary-500/5 to-surface-50-900-token/0 dark:via-primary-400/10"
	></div>

	<div class="container mx-auto max-w-6xl px-4 lg:px-8">
		<ScrollFlyIn class="mb-12 min-h-[3.5rem] text-center sm:min-h-[4rem]">
			{#snippet children()}
				<h2 class="h1 text-token">Achievements</h2>
			{/snippet}
		</ScrollFlyIn>

		<div class="flex flex-col gap-4 sm:gap-5 lg:gap-6">
			{#if heroAchievement}
				<ScrollFlyIn
					class="group aspect-[16/6] w-full min-w-0 sm:aspect-[18/5]"
					innerClass="h-full min-h-0 w-full"
					reservePlaceholderClass={achievementReserveShell}
					rootMargin={looseBottom}
					y={26}
				>
					{#snippet children()}
						<div class="relative h-full w-full overflow-hidden rounded-xl">
							<ImageWithSkeleton
								src={heroAchievement.image}
								alt={heroAchievement.alt}
								imgClass={achievementPhoto}
							/>
							<div class={captionLayer}>
								<p class={captionClass}>
									{heroAchievement.caption}
								</p>
							</div>
						</div>
					{/snippet}
				</ScrollFlyIn>
			{/if}

			<div
				class="grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-[minmax(0,1fr)_min(46%,32rem)] lg:items-stretch lg:gap-6"
			>
				<ul class="flex list-none flex-col gap-4 sm:gap-5">
					{#each pairAchievements as item, j}
						<li class="min-w-0 list-none">
							<ScrollFlyIn
								class="group aspect-[16/10] min-w-0 w-full"
								innerClass="h-full min-h-0 w-full"
								reservePlaceholderClass={achievementReserveShell}
								delay={j * 60}
								y={24}
							>
								{#snippet children()}
									<div class="relative h-full w-full overflow-hidden rounded-xl">
										<ImageWithSkeleton src={item.image} alt={item.alt} imgClass={achievementPhoto} />
										<div class={captionLayer}>
											<p class={captionClass}>
												{item.caption}
											</p>
										</div>
									</div>
								{/snippet}
							</ScrollFlyIn>
						</li>
					{/each}
				</ul>

				{#if tallAchievement}
					<ScrollFlyIn
						class="group relative aspect-[16/10] w-full min-h-0 min-w-0 lg:aspect-auto lg:h-full lg:min-h-[min(72vh,44rem)] lg:justify-self-stretch"
						innerClass="h-full min-h-0 w-full"
						reservePlaceholderClass={achievementReserveShell}
						delay={90}
						rootMargin={looseBottom}
						y={26}
					>
						{#snippet children()}
							<div class="relative h-full min-h-0 overflow-hidden rounded-xl">
								<ImageWithSkeleton
									src={tallAchievement.image}
									alt={tallAchievement.alt}
									imgClass={achievementPhoto}
								/>
								<div class={captionLayer}>
									<p class={captionClass}>
										{tallAchievement.caption}
									</p>
								</div>
							</div>
						{/snippet}
					</ScrollFlyIn>
				{/if}
			</div>
		</div>
	</div>
</section>
