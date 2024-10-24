<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import * as Tabs from '$lib/components/ui/tabs';
	import Github from '$lib/components/github.svelte';
	import Spotify from '$lib/components/spotify.svelte';
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<Tabs.Root value="about" class="h-full">
	<Tabs.List class="mb-4 flex justify-around">
		<Tabs.Trigger value="about" class="flex-1 text-center">About me</Tabs.Trigger>
		<Tabs.Trigger value="projects" class="flex-1 text-center">Projects</Tabs.Trigger>
		<Tabs.Trigger value="spotify" class="flex-1 text-center">Spotify</Tabs.Trigger>
	</Tabs.List>
	<Tabs.Content value="about">
		<Card.Root class="h-full">
			<Card.Content>
				<h2 class="text-2xl font-bold xl:text-3xl">About me</h2>
				<h1>WIP</h1>
				<p>
					I'm a fullstack developer with a passion for creating functional applications. I'm
					currently working at <a
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
			</Card.Content>
		</Card.Root>
	</Tabs.Content>
	<Tabs.Content value="projects">
		<Card.Root class="h-full">
			<Card.Content>
				<Github />
			</Card.Content>
		</Card.Root>
	</Tabs.Content>
	<Tabs.Content value="spotify">
		<Card.Root class="h-full">
			<Card.Content>
				<Spotify />
			</Card.Content>
		</Card.Root>
	</Tabs.Content>
</Tabs.Root>
