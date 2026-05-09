<script lang="ts">
	import projects, { type Project } from '$lib/Projects';
	import ProjectBentoCell from '$lib/components/project-bento-cell.svelte';
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

<section class="content pt-24 pb-16">
	<div class="container mx-auto min-w-0 px-4 lg:px-8">
		<h1 class="h1 mb-6 text-center">Websites & Projects</h1>

		<div
			class="grid auto-rows-min grid-cols-2 grid-flow-dense gap-3 min-w-0 md:grid-cols-4 md:gap-4 lg:grid-cols-6"
		>
			{#each projectItems as item, index}
				<ProjectBentoCell project={item.project} featured={item.featured} revealIndex={index} />
			{/each}
		</div>
	</div>
</section>
