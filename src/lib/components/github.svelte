<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button/index.js';

	let user: any = {};
	let repos: any = [];
	let error = '';

	// Pagination state
	let currentPage = 1;
	const itemsPerPage = 6; // Number of repos per page

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
	<div class="space-x-4 space-y-4">
		<h3>My Repos/Forks</h3>
		<div class="grid grid-cols-1 gap-6 md:grid-cols-3">
			{#each paginatedRepos as repo}
				<Card.Root class="w-full rounded-lg p-4">
					<Card.Header class="mb-2 border-b pb-2">
						<Card.Title class="text-lg font-bold hover:underline">
							<a href={repo.html_url} target="_blank">{repo.name}</a>
						</Card.Title>
					</Card.Header>
					<Card.Content class="space-y-4">
						<div>
							{#if repo.description}
								<p class="text-sm">{repo.description}</p>
							{/if}
							<p class="text-sm"><strong>Language:</strong> {repo.language}</p>
							<p class="text-sm"><strong>Stars:</strong> {repo.stargazers_count}</p>
						</div>
						<div>
							<p class="text-sm"><strong>Forks:</strong> {repo.forks_count}</p>
							<p class="text-sm"><strong>Watchers:</strong> {repo.watchers_count}</p>
							<p class="text-sm">
								<strong>Open Issues:</strong>
								{repo.open_issues_count}
							</p>
						</div>
						<div>
							<p class="text-sm">
								<strong>Created:</strong>
								{new Date(repo.created_at).toLocaleDateString()}
							</p>
							<p class="text-sm">
								<strong>Updated:</strong>
								{new Date(repo.updated_at).toLocaleDateString()}
							</p>
							<p class="text-sm">
								<strong>License:</strong>
								{repo.license?.name || 'None'}
							</p>
						</div>
						<div>
							<p class="text-sm"><strong>Size:</strong> {repo.size} KB</p>
							<p class="text-sm">
								<strong>Default Branch:</strong>
								{repo.default_branch}
							</p>
							<p class="text-sm"><strong>Clone URL:</strong> {repo.clone_url}</p>
						</div>
					</Card.Content>
				</Card.Root>
			{/each}
		</div>

		<!-- Pagination Controls -->
		<div class="mt-4 flex justify-between">
			<Button variant="outline" on:click={prevPage} disabled={currentPage === 1}>Previous</Button>
			<p class="text-sm">
				Page {currentPage} of {totalPages()}
			</p>
			<Button variant="outline" on:click={nextPage} disabled={currentPage === totalPages()}>Next</Button>
		</div>
	</div>
{:else if error}
	<p>{error}</p>
{:else}
	<p>Loading...</p>
{/if}
