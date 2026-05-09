<script lang="ts">
	import skills from '$lib/Skills';

	/** Put your portrait at `static/images/about/me.jpg` (or change path). */
	const PORTRAIT_SRC = '/images/about/me.jpg';

	let portraitReady = $state(false);
	let portraitFailed = $state(false);
</script>

<!-- Replace the `.bio-skeleton` block below with real <p> paragraphs when ready. -->
<section
	id="about"
	class="content relative overflow-x-hidden border-t border-surface-200-700-token py-20 pb-28"
>
	<div
		class="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-surface-50-900-token/0 via-primary-500/5 to-surface-50-900-token/0 dark:via-primary-400/10"
	></div>

	<div class="container mx-auto max-w-5xl px-4 lg:px-8">
		<div class="mb-12 text-center lg:text-left">
			<span class="variant-soft-primary chip mb-3">About</span>
			<h2 class="h1 text-token">About me</h2>
			<p class="text-surface-600-300-token mt-2 max-w-2xl text-lg text-balance lg:mx-0 mx-auto">
				A quick snapshot of who I am and what I like to work with.
			</p>
		</div>

		<div class="grid items-start gap-12 lg:grid-cols-12 lg:gap-14">
			<div class="lg:col-span-5">
				<div
					class="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-2xl shadow-xl ring-2 ring-surface-200-700-token lg:mx-0 lg:max-w-none"
				>
					{#if !portraitFailed}
						<img
							src={PORTRAIT_SRC}
							alt="Portrait"
							loading="lazy"
							decoding="async"
							class="h-full w-full object-cover transition-opacity duration-500 {portraitReady
								? 'opacity-100'
								: 'opacity-0'}"
							onload={() => (portraitReady = true)}
							onerror={() => (portraitFailed = true)}
						/>
					{/if}
					{#if portraitFailed}
						<div
							class="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-surface-200-700-token/50 to-surface-100-800-token p-6 text-center"
						>
							<div class="h-28 w-28 shrink-0 rounded-full bg-surface-200-700-token animate-pulse"></div>
							<p class="text-sm font-medium opacity-80">Your portrait</p>
							<p class="text-xs opacity-60">
								Add an image at <code class="code">static/images/about/me.jpg</code>
							</p>
						</div>
					{:else if !portraitReady}
						<div
							class="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-surface-200-700-token/40 animate-pulse"
						>
							<div class="h-28 w-28 rounded-full bg-surface-100-800-token/50"></div>
							<div class="h-3 w-32 rounded-full bg-surface-100-800-token/40"></div>
						</div>
					{/if}
				</div>
			</div>

			<div class="flex flex-col gap-10 lg:col-span-7">
				<div class="card variant-soft p-6 sm:p-8">
					<h3 class="h3 mb-6">Story</h3>
					<div class="bio-skeleton space-y-4" aria-hidden="true">
						<div
							class="h-3.5 rounded-full bg-surface-200-700-token/70 animate-pulse"
							style="width: 100%"
						></div>
						<div
							class="h-3.5 rounded-full bg-surface-200-700-token/60 animate-pulse"
							style="width: 94%"
						></div>
						<div
							class="h-3.5 rounded-full bg-surface-200-700-token/50 animate-pulse"
							style="width: 88%"
						></div>
						<div
							class="h-3.5 rounded-full bg-surface-200-700-token/55 animate-pulse"
							style="width: 72%"
						></div>
						<div
							class="h-3.5 rounded-full bg-surface-200-700-token/45 animate-pulse"
							style="width: 40%"
						></div>
					</div>
					<p class="text-surface-600-300-token mt-6 text-sm text-balance border-t border-surface-200-700-token pt-6">
						Replace the pulse lines above with your own paragraphs (remove the
						<code class="code">.bio-skeleton</code> wrapper).
					</p>
				</div>

				<div>
					<h3 class="h3 mb-4">Skills</h3>
					<div class="flex flex-col gap-6">
						{#each Object.entries(skills) as [section, technologies]}
							<div>
								<h4 class="mb-2 font-bold capitalize opacity-90">{section}</h4>
								<div class="flex flex-row flex-wrap gap-2">
									{#each technologies as technology}
										<span class="chip variant-soft-primary text-sm">{technology}</span>
									{/each}
								</div>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
