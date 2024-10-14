<script lang="ts">
	import discordpf from '$lib/assets/discordpf.png';
	import * as Avatar from '$lib/components/ui/avatar/';
	import * as Card from '$lib/components/ui/card';
	import * as Tabs from '$lib/components/ui/tabs';
	import { Button } from '$lib/components/ui/button';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import {
		IconBrandGithub,
		IconBrandLinkedin,
		IconBrandInstagram,
		IconBrandDiscord,
		IconBrandSpotify,
		IconBrandFigma,
		IconDeviceTv,
		IconDeviceGamepad2,
		IconMusic,
		IconTerminal2,
		IconBrandHtml5,
		IconBrandCss3,
		IconBrandJavascript,
		IconBrandPhp,
		IconBrandTypescript
	} from '@tabler/icons-svelte';

	const birthday = new Date('2005-06-12');

	function calculateAge() {
		const ageDifMs = Date.now() - birthday.getTime();
		const ageDate = new Date(ageDifMs);
		return Math.abs(ageDate.getUTCFullYear() - 1970);
	}
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<div
	class="flex flex-grow flex-col items-center justify-center gap-12 p-6 xl:h-screen xl:flex-row xl:p-36"
>
	<Card.Root class="flex h-full w-full flex-col space-y-6 p-6 shadow-lg xl:w-1/4">
		<Card.Header>
			<div class="flex flex-col items-center">
				<Avatar.Root class="size-20 rounded-full border border-gray-700">
					<Avatar.Image src={discordpf} alt="Dimitri de Jong" />
					<Avatar.Fallback>DJ</Avatar.Fallback>
				</Avatar.Root>
				<h1 class="mt-4 text-2xl font-bold xl:text-xl">Dimitri de Jong</h1>
			</div>
		</Card.Header>

		<hr class="w-full border-t border-gray-600" />

		<Card.Content class="flex-grow text-sm text-black dark:text-gray-300">
			<p>
				<span class="font-semibold text-gray-600 dark:text-cyan-400">Age:</span>
				{calculateAge()}
			</p>
			<p>
				<span class="font-semibold text-gray-600 dark:text-cyan-400">Occupation:</span> Fullstack Developer
			</p>
			<p>
				<span class="font-semibold text-gray-600 dark:text-cyan-400">Education:</span> Game Development
			</p>
			<p><span class="font-semibold text-gray-600 dark:text-cyan-400">Interests:</span></p>
			<div class="grid grid-cols-3 gap-6 xl:grid-cols-6">
				<Tooltip.Root>
					<Tooltip.Trigger>
						<IconMusic size={28} class="text-black dark:text-white" />
					</Tooltip.Trigger>
					<Tooltip.Content>Music</Tooltip.Content>
				</Tooltip.Root>
				<Tooltip.Root>
					<Tooltip.Trigger>
						<IconDeviceGamepad2 size={28} class="text-black dark:text-white" />
					</Tooltip.Trigger>
					<Tooltip.Content>Gaming</Tooltip.Content>
				</Tooltip.Root>
				<Tooltip.Root>
					<Tooltip.Trigger>
						<IconTerminal2 size={28} class="text-black dark:text-white" />
					</Tooltip.Trigger>
					<Tooltip.Content>Programming</Tooltip.Content>
				</Tooltip.Root>
			</div>

			<p><span class="font-semibold text-gray-600 dark:text-cyan-400">Skills:</span></p>
			<div class="grid grid-cols-3 gap-6 xl:grid-cols-6">
				<Tooltip.Root>
					<Tooltip.Trigger>
						<IconBrandHtml5 size={32} class="text-black dark:text-white" />
					</Tooltip.Trigger>
					<Tooltip.Content>HTML</Tooltip.Content>
				</Tooltip.Root>
				<Tooltip.Root>
					<Tooltip.Trigger>
						<IconBrandCss3 size={32} class="text-black dark:text-white" />
					</Tooltip.Trigger>
					<Tooltip.Content>CSS</Tooltip.Content>
				</Tooltip.Root>
				<Tooltip.Root>
					<Tooltip.Trigger>
						<IconBrandPhp size={32} class="text-black dark:text-white" />
					</Tooltip.Trigger>
					<Tooltip.Content>PHP</Tooltip.Content>
				</Tooltip.Root>
				<Tooltip.Root>
					<Tooltip.Trigger>
						<IconBrandJavascript size={32} class="text-black dark:text-white" />
					</Tooltip.Trigger>
					<Tooltip.Content>JavaScript</Tooltip.Content>
				</Tooltip.Root>
				<Tooltip.Root>
					<Tooltip.Trigger>
						<IconBrandTypescript size={32} class="text-black dark:text-white" />
					</Tooltip.Trigger>
					<Tooltip.Content>TypeScript</Tooltip.Content>
				</Tooltip.Root>
				<Tooltip.Root>
					<Tooltip.Trigger>
						<IconBrandFigma size={32} class="text-black dark:text-white" />
					</Tooltip.Trigger>
					<Tooltip.Content>Figma</Tooltip.Content>
				</Tooltip.Root>
			</div>
		</Card.Content>

		<hr class="w-full border-t border-gray-600" />

		<Card.Footer class="mt-auto self-center ">
			<div class="grid self-center grid-cols-3 sm:grid-cols-6">
				<Button variant="ghost" size="icon" href="https://github.com/RazerGhost" target="_blank">
					<IconBrandGithub size={26} class="text-black dark:text-white" />
				</Button>
				<Button
					variant="ghost"
					size="icon"
					href="https://discordapp.com/users/425729668482859008"
					target="_blank"
				>
					<IconBrandDiscord size={26} class="text-black dark:text-white" />
				</Button>
				<Button
					variant="ghost"
					size="icon"
					href="https://open.spotify.com/user/sc8l2c989xkpofg2a7ypjnpm4?si=f82637894a8143b3"
					target="_blank"
				>
					<IconBrandSpotify size={26} class="text-black dark:text-white" />
				</Button>
				<Button
					variant="ghost"
					size="icon"
					href="https://www.linkedin.com/in/dimitri-eleazar-de-jong/"
					target="_blank"
				>
					<IconBrandLinkedin size={26} class="text-black dark:text-white" />
				</Button>
				<Button
					variant="ghost"
					size="icon"
					href="https://www.instagram.com/dl1mltrl/"
					target="_blank"
				>
					<IconBrandInstagram size={26} class="text-black dark:text-white" />
				</Button>
				<Button
					variant="ghost"
					size="icon"
					href="https://mydramalist.com/profile/RazerGhost"
					target="_blank"
				>
					<IconDeviceTv size={26} class="text-black dark:text-white" />
				</Button>
			</div>
		</Card.Footer>
	</Card.Root>

	<Tabs.Root value="about" class="flex h-full w-full flex-col justify-center xl:w-3/4">
		<Tabs.List class="mb-4 flex justify-around">
			<Tabs.Trigger value="about" class="flex-1 text-center">About me</Tabs.Trigger>
			<Tabs.Trigger value="projects" class="flex-1 text-center">Projects</Tabs.Trigger>
			<Tabs.Trigger value="spotify" class="flex-1 text-center">Spotify</Tabs.Trigger>
		</Tabs.List>
		<Tabs.Content value="about" class="flex-grow">
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
		<Tabs.Content value="projects" class="flex-grow">
			<Card.Root class="h-full">
				<Card.Content>
					<h2 class="text-2xl font-bold xl:text-3xl">Projects</h2>
					<div class="flex flex-col space-y-4">
						<h1>WIP</h1>
					</div>
				</Card.Content>
			</Card.Root>
		</Tabs.Content>
		<Tabs.Content value="spotify" class="flex-grow">
			<Card.Root class="h-full">
				<Card.Content>
					<h2 class="text-2xl font-bold xl:text-3xl">Spotify</h2>
					<div class="flex flex-col space-y-4">
						<h1>WIP</h1>
					</div>
				</Card.Content>
			</Card.Root>
		</Tabs.Content>
	</Tabs.Root>
</div>
