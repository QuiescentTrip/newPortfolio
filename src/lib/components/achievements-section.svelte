<script lang="ts">
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
		'sepia brightness-[0.88] saturate-[0.78] transition duration-700 ease-out group-hover:scale-[1.04]';
	const captionLayer =
		'pointer-events-none absolute inset-0 z-[1] flex items-center justify-center p-3 sm:p-5';

	const captionClass =
		'max-w-[min(92%,26rem)] rounded-none bg-primary-800/75 text-center py-3 px-4 h2 text-white';
</script>

<section
	id="achievements"
	class="content relative scroll-mt-24 overflow-x-hidden border-t border-surface-200-700-token py-20"
>
	<div
		class="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-surface-50-900-token/0 via-primary-500/5 to-surface-50-900-token/0 dark:via-primary-400/10"
	></div>

	<div class="container mx-auto max-w-6xl px-4 lg:px-8">
		<div class="mb-12 text-center">
			<h2 class="h1 text-token">Achievements</h2>
		</div>

		<div class="flex flex-col gap-4 sm:gap-5 lg:gap-6">
			{#if heroAchievement}
				{@const i = 0}
				<div class="group w-full min-w-0">
					<div class="relative aspect-[16/6] w-full overflow-hidden rounded-xl sm:aspect-[18/5]">
							<img
								src={heroAchievement.image}
								alt={heroAchievement.alt}
								loading="lazy"
								decoding="async"
								class="h-full w-full object-cover {achievementPhoto}"
							/>
						<div class={captionLayer}>
							<p class={captionClass}>
								{heroAchievement.caption}
							</p>
						</div>
					</div>
				</div>
			{/if}

			<div
				class="grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-[minmax(0,1fr)_min(46%,32rem)] lg:items-stretch lg:gap-6"
			>
				<ul class="flex list-none flex-col gap-4 sm:gap-5">
					{#each pairAchievements as item, j}
						{@const i = j + 1}
						<li class="group min-w-0">
							<div class="relative aspect-[16/10] overflow-hidden rounded-xl">
									<img
										src={item.image}
										alt={item.alt}
										loading="lazy"
										decoding="async"
										class="h-full w-full object-cover {achievementPhoto}"
									/>
								<div class={captionLayer}>
									<p class={captionClass}>
										{item.caption}
									</p>
								</div>
							</div>
						</li>
					{/each}
				</ul>

				{#if tallAchievement}
					{@const i = 3}
					<div
						class="group relative min-h-0 w-full max-w-xl justify-self-center sm:max-w-2xl lg:max-w-none lg:justify-self-stretch"
					>
						<div class="relative h-full overflow-hidden rounded-xl">
							<div
								class="relative aspect-[3/5] w-full sm:aspect-[2/3] lg:aspect-auto lg:h-full lg:min-h-[min(72vh,44rem)]"
							>
									<img
										src={tallAchievement.image}
										alt={tallAchievement.alt}
										loading="lazy"
										decoding="async"
										class="absolute inset-0 h-full w-full object-cover {achievementPhoto}"
									/>
							</div>
							<div class={captionLayer}>
								<p class={captionClass}>
									{tallAchievement.caption}
								</p>
							</div>
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>
</section>
