<script lang="ts">
	import { onMount } from 'svelte';
	import type { Article, PageData } from './types.js';

	export let data: PageData;
	let article: Article = data.article;
	$: article = data.article;
	onMount(() => {
		article.body_html = article.body_html
			.replace(/<p>/g, '<p class="p">')
			.replace(/<a /g, '<a class="text-blue-500 hover:underline" ')
			.replace(/<h1>/g, '<h1 class="h1">')
			.replace(/<h2>/g, '<h2 class="text-2xl font-semibold my-4">')
			.replace(/<ul>/g, '<ul class="list-disc list-inside my-4">')
			.replace(/<li>/g, '<li class="ml-4">')
			.replace(/<div class="highlight js-code-highlight">/g, '<div class="code">');
		article.ok = true;
	});
</script>

{#if article && article.ok}
	<div class="content overflow-x-hidden overflow-y-scroll pt-40 pb-40">
		<div
			class="w-min flex flex-col items-center gap-8 justify-center container mx-auto overflow-x-hidden"
		>
			<h1 class="h1">
				<a class="btn h1" href={article.url} target="_blank" rel="noreferrer">{article.title} </a>
			</h1>
			{@html article.body_html}
		</div>
	</div>
{/if}
