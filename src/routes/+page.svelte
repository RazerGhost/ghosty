<script>
	import Themetoggle from '$lib/components/themetoggle.svelte';
	import * as Avatar from '$lib/components/ui/avatar/';
    import * as Card from "$lib/components/ui/card";
</script>

<div class="flex h-screen items-center justify-center p-52">
    <Card.Root class="flex flex-col w-2/6">
        <Card.Content>
            <div class="flex w-full flex-row items-end justify-end">
                <Themetoggle />
            </div>
            <div class="flex flex-col items-center">
                <Avatar.Root class="size-20">
                    <Avatar.Image src="/discordpf.png" alt="Dimitri de Jong" />
                    <Avatar.Fallback>DJ</Avatar.Fallback>
                </Avatar.Root>
                <h1 class="mt-4 text-4xl font-bold">Dimitri de Jong</h1>
                <p class="mt-2 text-lg">Fullstack Developer</p>
                <div class="space-y-2  text-left text-base">
                    <p>👨‍💻 19 years old</p>
                    <p>🇳🇱 The Netherlands</p>
                    <p>📧 IRazerIGhost@gmail.com</p>
                </div>
            </div>
            <div>
                <h2 class="mt-8 text-2xl font-bold">About me</h2>
                <p class="mt-2 text-lg">
                    I'm a fullstack developer with a passion for creating functional applications.
                    I'm currently working at <a
                        href="https://www.raion-design.com"
                        target="_blank"
                        class="hover:text-blue-500 focus:text-blue-500 transition"
                        rel="noopener noreferrer">Raion Design</a
                    > as a fullstack developer.
                </p>
            </div>
        </Card.Content>
    </Card.Root>
	<div class="flex w-4/6">
    <Card.Root>
    </Card.Root>
    </div>
</div>
