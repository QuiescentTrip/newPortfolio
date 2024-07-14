<script>
	import projects from '$lib/Projects';
	const important = projects.important;
	const unimportant = projects.unimportant;
</script>

<svelte:head>
	<title>Fabian Ø. Tangen — Projects</title>
</svelte:head>

<div class="h-screen w-screen flex lg:flex-row flex-col items-center">
	{#each important as project}
		<div class="group relative flex-1 h-full w-full">
			<a target="_blank" href={project.url}>
				<!-- Blurred background -->
				<div
					class="absolute h-full w-full inset-0 bg-cover bg-center filter blur-sm group-hover:filter-none sepia transition duration-300 ease-in-out"
					style="background-image: url({project.image})"
				></div>
				<!-- Text overlay -->
				<div class="relative flex items-center justify-center h-full z-10">
					<h1 class="h1 bg-primary-900 p-2">{project.title}</h1>
				</div>
			</a>
		</div>
	{/each}
</div>
<div class="content overflow-hidden py-20">
	<div
		class=" flex flex-col items-center gap-8 justify-center container mx-auto overflow-x-hidden text-center w-full lg:w-min"
	>
		<h1 class="h1">Other Projects</h1>
		<p class="note">
			Note: most of my projects are under NDA so I am unable to share those projects. If there is
			anything you would like to see further, please feel free to contact me.
		</p>
		<div class="flex flex-col gap-7">
			{#each unimportant as project}
				<div class="card rounded-xl p-2 w-full lg:w-[70vh]">
					<h2 class="h2 card-header p-2">{project.title}</h2>
					<div>
						<div class="flex flex-row items-center justify-center">
							<p>Technologies:&nbsp</p>
							<code class="code">
								{#each project.technologies as tech}
									{tech}&nbsp;
								{/each}
							</code>
						</div>
						<p class="p-4">{project.description}</p>
					</div>
					<div class="card-footer">
						<a class="btn variant-filled-primary" href={project.url}>Link to Project</a>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
