<script lang="ts">
	import ProjectBentoCell from '$lib/components/project-bento-cell.svelte';
	import ScrollFlyIn from '$lib/components/scroll-fly-in.svelte';
	import projects, { type Project } from '$lib/Projects';
	import { shuffleDeterministic } from '$lib/shuffleDeterministic';

	const important = projects.important;
	const unimportant = projects.unimportant;

	const BENTO_ORDER_SEED = 'projects-bento-v1';

	function mixProjects(importantList: Project[], unimportantList: Project[]) {
		const out: { project: Project; featured: boolean }[] = [];
		let i = 0;
		let j = 0;
		while (i < importantList.length || j < unimportantList.length) {
			if (i < importantList.length) out.push({ project: importantList[i++], featured: true });
			if (j < unimportantList.length) out.push({ project: unimportantList[j++], featured: false });
		}
		return out;
	}

	const projectItems = $derived(
		shuffleDeterministic(mixProjects(important, unimportant), BENTO_ORDER_SEED)
	);
</script>

<section id="projects" class="content relative scroll-mt-24 overflow-x-hidden pt-24 pb-16">
	<div
		class="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-surface-50-900-token/0 via-primary-500/5 to-surface-50-900-token/0 dark:via-primary-400/10"
	></div>
	<div class="container mx-auto min-w-0 px-4 lg:px-8">
		<ScrollFlyIn class="mb-6 flex min-h-[4rem] justify-center sm:min-h-[4.5rem]">
			{#snippet children()}
				<div class="flex flex-col items-center gap-1.5">
					<h1 class="h1 text-center">Websites & Projects</h1>
					<p class="text-center text-sm opacity-80 mt-3">
						Press a box to go to corresponding website page of the project
					</p>
				</div>
			{/snippet}
		</ScrollFlyIn>

		<div
			class="grid auto-rows-min grid-cols-2 grid-flow-dense gap-3 min-w-0 md:grid-cols-4 md:gap-4 lg:grid-cols-6"
		>
			{#each projectItems as item, index}
				<ProjectBentoCell project={item.project} featured={item.featured} revealIndex={index} />
			{/each}
		</div>
	</div>
</section>
