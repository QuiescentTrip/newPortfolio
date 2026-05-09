<script lang="ts">
	import AboutSection from '$lib/components/about-section.svelte';
	import AchievementsSection from '$lib/components/achievements-section.svelte';
	import Projects from '$lib/components/projects.svelte';
	import Title from '$lib/components/title.svelte';
</script>

<svelte:head>
	<title>Fabian Ø. Tangen</title>
</svelte:head>
<div class="overflow-x-hidden">
	<Title />
	<Projects />
	<AchievementsSection />
	<AboutSection />
</div>
