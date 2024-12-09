<script lang="ts">
	import * as Card from '$lib/components/ui/card';

	export let data;
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<Card.Root class="shadow-lg">
	<Card.Content>
		<h2 class="text-2xl font-bold xl:text-3xl">About me</h2>
		<h1>WIP</h1>
		<p>
			I'm a fullstack developer with a passion for creating functional applications. I'm currently
			working at <a
				href="https://www.raion-design.com"
				target="_blank"
				class="transition hover:text-cyan-400 focus:text-cyan-400"
				rel="noopener noreferrer">Raion Design</a
			>
			as a fullstack developer & I'm currently studying Game Development at the
			<a
				href="https://www.hva.nl"
				target="_blank"
				class="transition hover:text-cyan-400 focus:text-cyan-400"
				rel="noopener noreferrer">Hogeschool van Amsterdam</a
			>.
		</p>

		<ul>
			{#each data.countries as country}
				<li>{country.name}</li>
			{/each}
		</ul>
	</Card.Content>
</Card.Root>
