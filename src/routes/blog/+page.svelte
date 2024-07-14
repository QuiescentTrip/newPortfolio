<script>
	export let data;
	let devToArticles = data.devToArticles;

	const blackListedArticles = [];

	const articles = [...devToArticles];

	const filteredArticles = articles.filter((article) => !blackListedArticles.includes(article?.id));
</script>

<svelte:head>
	<title>Fabian Ø. Tangen — Blog</title>
</svelte:head>

<div class="flex flex-col gap-4 justify-center items-center h-screen container mx-auto">
	<h1 class="h1">Articles</h1>
	{#each filteredArticles as article}
		<div class="w-[70vh] card p-4 flex-col gap-4">
			<div>
				<h2 class="h3 card-header">
					{article.title}
				</h2>
			</div>

			<div class="p-4">
				<p class="code w-min">Tags: {article.tags || article.category}</p>
				<p class="p-2">
					{article.description || ''}
				</p>
			</div>
			<a
				class="card-footer"
				href={article.id ? `/blog/${article.id}` : article.link}
				target={!article.id ? '_blank' : '_self'}
			>
				<div class="btn variant-filled-primary">Read Article =></div>
			</a>
		</div>
	{/each}
</div>
