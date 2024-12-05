<script>
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	import Themetoggle from '$lib/components/themetoggle.svelte';
	import discordpf from '$lib/assets/discordpf.png';
	import * as Avatar from '$lib/components/ui/avatar/';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Separator } from '$lib/components/ui/separator';
	import { Toaster } from '$lib/components/ui/sonner';
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

<ModeWatcher />
<Toaster />
<div class="flex flex-col">
	<div class="flex justify-end p-6 xl:absolute xl:right-0 xl:top-0">
		<Themetoggle />
	</div>
	<div
		class="flex shrink-0 flex-col items-start justify-center gap-10 p-6 xl:h-screen xl:flex-row xl:p-28"
	>
		<div
			class="flex w-full flex-col space-y-6 overflow-hidden rounded-lg border p-6 shadow-lg lg:w-1/3 xl:w-1/6"
		>
			<div class="flex flex-col items-center">
				<Avatar.Root class="size-20 rounded-full border border-gray-700">
					<Avatar.Image src={discordpf} alt="Dimitri de Jong" />
					<Avatar.Fallback>DJ</Avatar.Fallback>
				</Avatar.Root>
				<h1 class="mt-4 text-xl font-bold sm:text-2xl lg:text-xl">Dimitri de Jong</h1>
			</div>

			<Separator />

			<div class="space-y-4 text-sm dark:text-gray-300">
				<p>
					<span class="font-semibold dark:text-cyan-400">Age:</span>
					{calculateAge()}
				</p>
				<p>
					<span class="font-semibold dark:text-cyan-400">Occupation:</span> Fullstack Developer
				</p>
				<p>
					<span class="font-semibold dark:text-cyan-400">Education:</span> Game Development
				</p>

				<p><span class="font-semibold dark:text-cyan-400">Interests:</span></p>
				<div class="flex-auto">
					<Tooltip.Root>
						<Tooltip.Trigger>
							<IconMusic size={28} />
						</Tooltip.Trigger>
						<Tooltip.Content>Music</Tooltip.Content>
					</Tooltip.Root>
					<Tooltip.Root>
						<Tooltip.Trigger>
							<IconDeviceGamepad2 size={28} />
						</Tooltip.Trigger>
						<Tooltip.Content>Gaming</Tooltip.Content>
					</Tooltip.Root>
					<Tooltip.Root>
						<Tooltip.Trigger>
							<IconTerminal2 size={28} />
						</Tooltip.Trigger>
						<Tooltip.Content>Programming</Tooltip.Content>
					</Tooltip.Root>
				</div>

				<p><span class="font-semibold text-gray-600 dark:text-cyan-400">Skills:</span></p>
				<div class="flex-auto">
					<Tooltip.Root>
						<Tooltip.Trigger>
							<IconBrandHtml5 size={32} />
						</Tooltip.Trigger>
						<Tooltip.Content>HTML</Tooltip.Content>
					</Tooltip.Root>
					<Tooltip.Root>
						<Tooltip.Trigger>
							<IconBrandCss3 size={32} />
						</Tooltip.Trigger>
						<Tooltip.Content>CSS</Tooltip.Content>
					</Tooltip.Root>
					<Tooltip.Root>
						<Tooltip.Trigger>
							<IconBrandPhp size={32} />
						</Tooltip.Trigger>
						<Tooltip.Content>PHP</Tooltip.Content>
					</Tooltip.Root>
					<Tooltip.Root>
						<Tooltip.Trigger>
							<IconBrandJavascript size={32} />
						</Tooltip.Trigger>
						<Tooltip.Content>JavaScript</Tooltip.Content>
					</Tooltip.Root>
					<Tooltip.Root>
						<Tooltip.Trigger>
							<IconBrandTypescript size={32} />
						</Tooltip.Trigger>
						<Tooltip.Content>TypeScript</Tooltip.Content>
					</Tooltip.Root>
					<Tooltip.Root>
						<Tooltip.Trigger>
							<IconBrandFigma size={32} />
						</Tooltip.Trigger>
						<Tooltip.Content>Figma</Tooltip.Content>
					</Tooltip.Root>
				</div>
			</div>

			<Separator />

			<div class="flex-auto self-center">
				<Button variant="ghost" size="icon" href="https://github.com/RazerGhost" target="_blank">
					<IconBrandGithub size={26} />
				</Button>
				<Dialog.Root>
					<Dialog.Trigger class={buttonVariants({ variant: 'ghost', size: 'icon' })}>
						<IconBrandDiscord size={26} />
					</Dialog.Trigger>
					<Dialog.Content>
						<Dialog.Header>
							<Dialog.Description>
								<p>
									Since discord is stupid and doesn't have any user profile links, Just copy my
									username: RazerGhost
								</p>
							</Dialog.Description>
						</Dialog.Header>
					</Dialog.Content>
				</Dialog.Root>
				<Button
					variant="ghost"
					size="icon"
					href="https://open.spotify.com/user/sc8l2c989xkpofg2a7ypjnpm4?si=f82637894a8143b3"
					target="_blank"
				>
					<IconBrandSpotify size={26} />
				</Button>
				<Button
					variant="ghost"
					size="icon"
					href="https://www.linkedin.com/in/dimitri-eleazar-de-jong/"
					target="_blank"
				>
					<IconBrandLinkedin size={26} />
				</Button>
				<Button
					variant="ghost"
					size="icon"
					href="https://www.instagram.com/dl1mltrl/"
					target="_blank"
				>
					<IconBrandInstagram size={26} />
				</Button>
				<Button
					variant="ghost"
					size="icon"
					href="https://mydramalist.com/profile/RazerGhost"
					target="_blank"
				>
					<IconDeviceTv size={26} />
				</Button>
			</div>
		</div>

		<div class=" w-full xl:w-5/6">
			<slot />
		</div>
	</div>
</div>
