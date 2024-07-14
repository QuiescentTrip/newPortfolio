<script>
	import projects from '$lib/Projects';
</script>

<svelte:head>
	<title>Fabian Ø. Tangen — Projects</title>
</svelte:head>

<div class="content overflow-x-hidden overflow-y-scroll pt-40 pb-40">
	<div
		class=" flex flex-col items-center gap-8 justify-center container mx-auto overflow-x-hidden text-center w-min"
	>
		<h1 class="h1">Projects</h1>
		<p class="note">
			Note: most of my projects are under NDA so I am unable to share those projects. If there is
			anything you would like to see further, please feel free to contact me.
		</p>
		<div class="flex flex-col gap-7">
			{#each projects as project}
				<div class="card rounded-xl p-2 w-[70vh]">
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
