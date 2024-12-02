<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Separator } from '$lib/components/ui/separator';
	import {
		IconStar,
		IconGitFork,
		IconCode,
		IconCalendar,
		IconFile,
		IconLink
	} from '@tabler/icons-svelte';

	let user: any = {};
	let repos: any = [];
	let error = '';

	// Pagination state
	let currentPage = 1;
	const itemsPerPage = 9; // Number of repos per page

	// Computed property for paginated repos
	$: paginatedRepos = repos.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

	// Fetch data
	const fetchData = async () => {
		try {
			const [userRes, reposRes] = await Promise.all([
				fetch('api/github/user'),
				fetch('api/github/repos')
			]);

			if (userRes.ok && reposRes.ok) {
				user = await userRes.json();
				repos = await reposRes.json();
				console.log(repos);
			} else {
				error = 'Failed to load data';
			}
		} catch (e) {
			error = 'Error fetching data';
		}
	};

	// Fetch data on component load
	fetchData();

	// Functions to handle pagination
	const totalPages = () => Math.ceil(repos.length / itemsPerPage);

	const nextPage = () => {
		if (currentPage < totalPages()) currentPage++;
	};

	const prevPage = () => {
		if (currentPage > 1) currentPage--;
	};
</script>

<!-- Display User Info -->
{#if user && repos.length > 0}
	<div class="flex flex-grow flex-col items-stretch space-y-6">
		<div class="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
			{#each paginatedRepos as repo}
				<Card.Root class="h-full">
					<Card.Content class="flex h-full flex-col justify-evenly space-y-4 p-4">
						<div class="flex h-full flex-col justify-between rounded-lg p-4">
							<!-- Top Section: Repository Information -->
							<div class="flex flex-col">
								<!-- Repository Name -->
								<a
									href={repo.html_url}
									target="_blank"
									rel="noopener"
									class="text-lg font-semibold hover:underline dark:text-cyan-400"
								>
									{repo.name}
								</a>

								<!-- Description -->
								<div class="mt-2 text-sm">
									<p>{repo.description || 'No description available.'}</p>
								</div>
							</div>

							<!-- Bottom Section: Stats -->
							<div class="mt-4 flex items-center justify-between text-sm">
								<!-- Language -->
								<div class="flex items-center gap-1">
									<IconCode size={18} />
									<span>{repo.language || 'Unknown'}</span>
								</div>

								<!-- Stars -->
								<div class="flex items-center gap-1">
									<IconStar size={18} />
									<span>{repo.stargazers_count}</span>
								</div>

								<!-- Forks -->
								<div class="flex items-center gap-1">
									<IconGitFork size={18} />
									<span>{repo.forks_count}</span>
								</div>
							</div>
						</div>
					</Card.Content>
				</Card.Root>
			{/each}
		</div>

		<Separator />

		<!-- Pagination Controls -->
		<div class="mt-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
			<Button variant="outline" on:click={prevPage} disabled={currentPage === 1}>Previous</Button>
			<p class="text-sm">Page {currentPage} of {totalPages()}</p>
			<Button variant="outline" on:click={nextPage} disabled={currentPage === totalPages()}>
				Next
			</Button>
		</div>
	</div>
{:else if error}
	<p class="text-red-500">{error}</p>
{:else}
	<p>Loading...</p>
{/if}
