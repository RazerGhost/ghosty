<script lang="ts">
	let user: any = {};
	let repos: any = [];
	let error = '';

	const fetchData = async () => {
		try {
			// Fetch user and repos data simultaneously
			const [userRes, reposRes] = await Promise.all([
				fetch('api/github/user'), // Fetch user data
				fetch('api/github/repos') // Fetch repos data
			]);

			// Check if both requests were successful
			if (userRes.ok && reposRes.ok) {
				user = await userRes.json(); // Parse user data
				repos = await reposRes.json(); // Parse repo data
			} else {
				error = 'Failed to load data';
			}
		} catch (e) {
			error = 'Error fetching data';
		}
	};

	// Fetch data on component load
	fetchData();
</script>

<!-- Display User Info -->
{#if user && repos.length > 0}
	<div>
		<h2>{user.name}'s GitHub Profile</h2>
		<p><strong>Username:</strong> {user.login}</p>
		<p><strong>Public Repos:</strong> {user.public_repos}</p>

		<h3>Repositories</h3>
		<ul>
			{#each repos as repo}
				<li><a href={repo.html_url} target="_blank">{repo.name}</a></li>
			{/each}
		</ul>
	</div>
{:else if error}
	<p>{error}</p>
{:else}
	<p>Loading...</p>
{/if}
