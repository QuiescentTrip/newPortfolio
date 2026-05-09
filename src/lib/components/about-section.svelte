<script lang="ts">
	import skills from '$lib/Skills';
</script>

<section id="about" class="content border-t border-surface-200-700-token py-16 pb-24">
	<div
		class="container mx-auto flex max-w-3xl flex-col items-center gap-8 overflow-x-hidden px-4 text-center lg:px-8"
	>
		<h2 class="h2">About me</h2>
		<p class="text-balance">
			I'm a programmer who enjoys new technologies and small projects that solve real problems. I
			have a few years of light experience with freelancing and personal projects. I like automating
			repetitive work so the next person has an easier time.
		</p>
		<h3 class="h3">Skills</h3>
		{#each Object.entries(skills) as [section, technologies]}
			<div class="w-full">
				<h4 class="font-bold">{section}</h4>
				<div class="mt-2 flex flex-row flex-wrap justify-center gap-2">
					{#each technologies as technology}
						<span>{technology}</span>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</section>
