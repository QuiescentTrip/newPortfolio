<script>
	import skills from '$lib/Skills';
</script>

<svelte:head>
	<title>Fabian Ø. Tangen — About</title>
</svelte:head>

<div class="content overflow-x-hidden overflow-y-scroll pt-40 pb-40">
	<div
		class=" flex flex-col items-center gap-8 justify-center container mx-auto overflow-x-hidden text-center"
	>
		<h1 class="h1">About</h1>
		<p>
			I'm a programmer that loves new techonologies. I have a few years of light experience with
			freelancing and making small projects for myself. I've always been lazy, which is why I'm a
			programmer. I want to automate and automate so no one else after me will have to struggle with
			the stuff I did.
		</p>
		<h2 class="h2">Skills</h2>
		{#each Object.entries(skills) as [section, technologies]}
			<ul>
				<li>
					<h4 class="">
						{section}:
					</h4>
					<br />
					<div class="pre flex flex-row">
						{#each technologies as technology}
							<div>
								{technology}
							</div>
						{/each}
					</div>
				</li>
			</ul>
		{/each}
	</div>
</div>
