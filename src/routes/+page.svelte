<script>
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
</script>

<svelte:head>
	<title>Dimitri de Jong</title>
</svelte:head>

<div class="flex h-screen flex-row items-center justify-center gap-12 p-36">
	<Card.Root class="flex h-full w-1/6 flex-col space-y-6 p-6 shadow-lg">
		<Card.Header>
			<div class="flex flex-col items-center">
				<Avatar.Root class="size-20 rounded-full border border-gray-700">
					<Avatar.Image src={discordpf} alt="Dimitri de Jong" />
					<Avatar.Fallback>DJ</Avatar.Fallback>
				</Avatar.Root>
				<h1 class="mt-4 text-xl font-bold">Dimitri de Jong</h1>
			</div>
		</Card.Header>

		<hr class="w-full border-t border-gray-600" />

		<Card.Content class="flex-grow">
			<div class="space-y-4 text-sm text-black dark:text-gray-300">
				<!-- Increased spacing between sections -->
				<p><span class="font-semibold text-gray-600 dark:text-cyan-400">Age:</span> 19</p>
				<p>
					<span class="font-semibold text-gray-600 dark:text-cyan-400">Location:</span> Almere, The Netherlands
				</p>
				<p>
					<span class="font-semibold text-gray-600 dark:text-cyan-400">Occupation:</span> Fullstack Developer
				</p>
				<p>
					<span class="font-semibold text-gray-600 dark:text-cyan-400">Education:</span> Game Development
				</p>
				<span class="font-semibold text-gray-600 dark:text-cyan-400">Interests:</span>
				<!-- Icons for interests with consistent size -->
				<div class="grid grid-cols-3 grid-rows-1 items-center justify-center gap-6">
					<Tooltip.Root>
						<Tooltip.Trigger>
							<IconMusic size={28} class="text-black dark:text-white" /></Tooltip.Trigger
						>
						<Tooltip.Content>Music</Tooltip.Content>
					</Tooltip.Root>
					<Tooltip.Root>
						<Tooltip.Trigger
							><IconDeviceGamepad2 size={28} class="text-black dark:text-white" /></Tooltip.Trigger
						>
						<Tooltip.Content>Gaming</Tooltip.Content>
					</Tooltip.Root>
					<Tooltip.Root>
						<Tooltip.Trigger
							><IconTerminal2 size={28} class="text-black dark:text-white" /></Tooltip.Trigger
						>
						<Tooltip.Content>Programming</Tooltip.Content>
					</Tooltip.Root>
				</div>

				<span class="font-semibold text-gray-600 dark:text-cyan-400">Skills:</span>
				<!-- Increased spacing between interests and skills, consistent icon sizes -->
				<div class="grid grid-cols-3 grid-rows-2 items-center justify-center gap-6">
					<Tooltip.Root>
						<Tooltip.Trigger
							><IconBrandHtml5 size={28} class="text-black dark:text-white" /></Tooltip.Trigger
						>
						<Tooltip.Content>HTML</Tooltip.Content>
					</Tooltip.Root>
					<Tooltip.Root>
						<Tooltip.Trigger
							><IconBrandCss3 size={28} class="text-black dark:text-white" /></Tooltip.Trigger
						>
						<Tooltip.Content>CSS</Tooltip.Content>
					</Tooltip.Root>

					<Tooltip.Root>
						<Tooltip.Trigger
							><IconBrandPhp size={28} class="text-black dark:text-white" /></Tooltip.Trigger
						>
						<Tooltip.Content>PHP</Tooltip.Content>
					</Tooltip.Root>
					<Tooltip.Root>
						<Tooltip.Trigger
							><IconBrandJavascript size={28} class="text-black dark:text-white" /></Tooltip.Trigger
						>
						<Tooltip.Content>Javascript</Tooltip.Content>
					</Tooltip.Root>
					<Tooltip.Root>
						<Tooltip.Trigger
							><IconBrandTypescript size={28} class="text-black dark:text-white" /></Tooltip.Trigger
						>
						<Tooltip.Content>TypeScript</Tooltip.Content>
					</Tooltip.Root>
				</div>
			</div>
		</Card.Content>

		<hr class="w-full border-t border-gray-600" />

		<Card.Footer class="mt-auto">
			<div class="grid grid-cols-3 grid-rows-2 items-center justify-center gap-6">
				<!-- Consistent icon size for social links -->
				<Button variant="ghost" size="icon" href="https://github.com/RazerGhost" target="_blank">
					<IconBrandGithub size={32} class="text-black dark:text-white" />
				</Button>
				<Button
					variant="ghost"
					size="icon"
					href="https://discordapp.com/users/425729668482859008"
					target="_blank"
				>
					<IconBrandDiscord size={32} class="text-black dark:text-white" />
				</Button>
				<Button
					variant="ghost"
					size="icon"
					href="https://open.spotify.com/user/sc8l2c989xkpofg2a7ypjnpm4?si=f82637894a8143b3"
					target="_blank"
				>
					<IconBrandSpotify size={32} class="text-black dark:text-white" />
				</Button>
				<Button
					variant="ghost"
					size="icon"
					href="https://www.linkedin.com/in/dimitri-eleazar-de-jong/"
					target="_blank"
				>
					<IconBrandLinkedin size={32} class="text-black dark:text-white" />
				</Button>
				<Button
					variant="ghost"
					size="icon"
					href="https://www.instagram.com/dl1mltrl/"
					target="_blank"
				>
					<IconBrandInstagram size={32} class="text-black dark:text-white" />
				</Button>
				<Button
					variant="ghost"
					size="icon"
					href="https://mydramalist.com/profile/RazerGhost"
					target="_blank"
				>
					<IconDeviceTv size={32} class="text-black dark:text-white" />
				</Button>
			</div>
		</Card.Footer>
	</Card.Root>

	<Tabs.Root value="about" class="flex h-full w-5/6 flex-col justify-center">
		<Tabs.List>
			<Tabs.Trigger value="about">About me</Tabs.Trigger>
			<Tabs.Trigger value="projects">Projects</Tabs.Trigger>
			<Tabs.Trigger value="spotify">Spotify</Tabs.Trigger>
		</Tabs.List>
		<Tabs.Content value="about" class="flex-grow">
			<Card.Root class="h-full">
				<Card.Content>
					<h2 class="text-2xl font-bold">About me</h2>
					I'm a fullstack developer with a passion for creating functional applications. I'm currently
					working at<a
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
				</Card.Content>
			</Card.Root>
		</Tabs.Content>
		<Tabs.Content value="projects" class="flex-grow">
			<Card.Root class="h-full">
				<Card.Content>
					<h2 class="text-2xl font-bold">Projects</h2>
					<div class="flex flex-col space-y-4">
						<div class="flex flex-col space-y-2">
							<h3 class="text-lg font-bold">Raion Design</h3>
							<p>
								I'm currently working at Raion Design as a fullstack developer. I'm responsible for
								creating and maintaining the website and the backend services.
							</p>
						</div>
						<div class="flex flex-col space-y-2">
							<h3 class="text-lg font-bold">Dimitri.dev</h3>
							<p>
								This website is my personal portfolio. I created this website to showcase my
								projects and to share my knowledge with the world.
							</p>
						</div>
					</div>
				</Card.Content>
			</Card.Root>
		</Tabs.Content>
		<Tabs.Content value="spotify" class="flex-grow">
			<Card.Root class="h-full">
				<Card.Content>
					<h2 class="text-2xl font-bold">Spotify</h2>
					<div class="flex flex-col space-y-4">
						<div class="flex flex-col space-y-2">
							<h3 class="text-lg font-bold">Currently playing</h3>
							<p>
								I'm currently listening to <strong>Wish You Were Here</strong> by Pink Floyd.
							</p>
						</div>
						<div class="flex flex-col space-y-2">
							<h3 class="text-lg font-bold">Top artists</h3>
							<p>My top artists are Pink Floyd, The Beatles, and Led Zeppelin.</p>
						</div>
					</div>
				</Card.Content>
			</Card.Root>
		</Tabs.Content>
	</Tabs.Root>
</div>
