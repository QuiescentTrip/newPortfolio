<script lang="ts">
	import { revealOnScroll } from '$lib/actions/revealOnScroll';
	import type { Project } from '$lib/Projects';
	import { cubicOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';

	type Props = {
		project: Project;
		featured: boolean;
		revealIndex?: number;
	};

	let { project, featured, revealIndex = 0 }: Props = $props();

	let revealed = $state(false);

	const spanClass = $derived(
		featured
			? 'md:col-span-2 md:row-span-2 min-h-[13rem] md:min-h-[16rem]'
			: 'min-h-[10rem] md:h-[11rem] md:max-h-[11rem]'
	);

	const titleWrapClass = $derived(
		featured
			? 'flex min-h-0 flex-1 flex-col items-center justify-center max-md:items-start max-md:justify-start md:group-hover:items-start md:group-hover:justify-start md:group-hover:pt-0'
			: 'flex min-h-0 flex-1 flex-col items-center justify-center overflow-hidden transition-all duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] max-md:items-start max-md:justify-start md:group-hover:flex-none md:group-hover:max-h-0 md:group-hover:opacity-0 md:group-hover:overflow-hidden'
	);

	const descOuterClass =
		'grid translate-y-0 opacity-100 transition-[grid-template-rows,opacity,transform] duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] max-md:grid-rows-[1fr] md:grid-rows-[0fr] md:translate-y-1 md:opacity-0 md:group-hover:grid-rows-[1fr] md:group-hover:translate-y-0 md:group-hover:opacity-100';

	const descPClass = $derived(
		featured
			? 'text-left text-xs leading-snug opacity-95 md:text-sm max-md:line-clamp-3'
			: 'text-left text-xs leading-snug opacity-95 md:text-sm max-md:line-clamp-2 md:line-clamp-none'
	);
</script>

<a
	href={project.url}
	target="_blank"
	rel="noreferrer"
	use:revealOnScroll={{ onReveal: () => (revealed = true) }}
	class="group card relative flex min-h-0 min-w-0 flex-col overflow-hidden rounded-xl {spanClass}"
>
	{#if project.image}
		<div
			class="absolute inset-0 scale-105 bg-cover bg-center filter blur-sm sepia transition-[filter,transform] duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-100 group-hover:blur-none group-hover:sepia-0"
			style="background-image: url({project.image})"
		></div>
		<div
			class="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/45 via-black/55 to-black/75 transition-all duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:from-black/35 group-hover:to-black/65"
		></div>
	{:else}
		<div
			class="absolute inset-0 bg-surface-100-800-token transition-[filter] duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:brightness-105"
		></div>
	{/if}

	{#if revealed}
		<div
			class="relative z-10 flex h-full min-h-0 flex-1 flex-col p-3 sm:p-4 {project.image ? 'text-white' : 'text-token'}"
			in:fly={{ y: 18, duration: 400, delay: revealIndex * 55, easing: cubicOut }}
		>
			<div class={titleWrapClass}>
				{#if featured}
					<h2
						class="h2 line-clamp-3 max-w-full px-1 text-center max-md:text-left transition-[margin,transform,opacity] duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] md:group-hover:mx-0 md:group-hover:mr-auto md:group-hover:text-left {project.image
							? 'text-white drop-shadow-md'
							: ''}"
					>
						{project.title}
					</h2>
				{:else}
					<h3
						class="h3 line-clamp-3 max-w-full px-1 text-center max-md:text-left transition-[margin,transform,opacity] duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] {project.image
							? 'text-white drop-shadow-md'
							: ''}"
					>
						{project.title}
					</h3>
				{/if}
			</div>

			{#if !featured}
				<div
					class="flex min-h-0 min-w-0 max-w-full flex-wrap justify-center gap-0.5 px-1 transition-all duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] max-md:mt-1 max-md:justify-start md:mt-1 md:overflow-hidden md:group-hover:pointer-events-none md:group-hover:mt-0 md:group-hover:max-h-0 md:group-hover:opacity-0"
				>
					{#each project.technologies as tech, i}
						<span
							class="chip variant-soft-primary min-w-0 max-w-full truncate text-xs {i >= 2
								? 'hidden'
								: ''}">{tech}</span
						>
					{/each}
					{#if project.technologies.length > 2}
						<span class="chip variant-soft-secondary text-xs"
							>+{project.technologies.length - 2}</span
						>
					{/if}
				</div>
			{/if}

			<div class={descOuterClass}>
				<div
					class="min-h-0 overflow-hidden md:min-h-0 {!featured
						? 'md:overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden'
						: ''}"
				>
					<div
						class="mt-2 rounded-lg max-md:p-1.5 md:p-2 {project.image
							? 'bg-black/40 backdrop-blur-sm'
							: 'bg-surface-200-700-token/60'}"
					>
						<p class={descPClass}>
							{project.description}
						</p>
						{#if featured}
							<div class="mt-1.5 flex max-md:line-clamp-1 flex-wrap gap-0.5 md:mt-2 md:gap-1">
								{#each project.technologies as tech, i}
									<span
										class="chip variant-soft-primary text-xs {i >= 2 ? 'max-md:hidden' : ''}"
										>{tech}</span
									>
								{/each}
								{#if project.technologies.length > 2}
									<span class="chip variant-soft-secondary text-xs md:hidden"
										>+{project.technologies.length - 2}</span
									>
								{/if}
							</div>
						{/if}
					</div>
				</div>
			</div>
		</div>
	{/if}
</a>
