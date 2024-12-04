<script lang="ts">
	import { toast } from 'svelte-sonner';
	import * as Select from '$lib/components/ui/select';
	import * as Card from '$lib/components/ui/card';
	import { onMount } from 'svelte';

	let selectedTerm: any = { value: 'longTerm', label: '1 Year' }; // Default term length
	let terms: any = [
		{ value: 'longTerm', label: '1 Year' },
		{ value: 'mediumTerm', label: '6 Months' },
		{ value: 'shortTerm', label: '4 Weeks' }
	];

	let user: any = {};
	let topTracks: any = { longTerm: [], mediumTerm: [], shortTerm: [] };
	let topArtists: any = { longTerm: [], mediumTerm: [], shortTerm: [] };

	let error: string = '';
	let isLoading = true; // Track the loading state
	let hasTokens = false; // Track whether tokens are available

	// Function to check token existence
	const checkTokens = async (): Promise<boolean> => {
		try {
			// Check for refresh token (or other mechanism to determine logged-in status)
			const response = await fetch('/auth/spotify/check-tokens', { method: 'GET' });
			if (response.ok) {
				const { hasAccessToken } = await response.json();
				return hasAccessToken;
			}
			return false;
		} catch (err) {
			console.error('Error checking tokens:', err);
			return false;
		}
	};

	// Function to refresh the access token
	const refreshAccessToken = async (): Promise<boolean> => {
		try {
			const response = await fetch('/auth/spotify/refresh-token', { method: 'GET' });

			if (response.ok) {
				toast.success('Token refreshed successfully', {
					duration: 3000
				});
				return true; // Token refresh was successful
			} else {
				toast.error('Could not find a refresh token.', {
					description:
						'If you want to see my Spotify data, please log in with your Spotify account.',
					duration: 5000
				});
				console.error('Failed to refresh token');
				return false;
			}
		} catch (err) {
			console.error('Error refreshing token:', err);
			toast.error('Error refreshing token. Please try again.');
			return false;
		}
	};

	// Function to fetch Spotify data
	const fetchData = async () => {
		try {
			// Check for tokens
			hasTokens = await checkTokens();
			if (!hasTokens) {
				error = 'No tokens found. Please log in.';
				isLoading = false;
				return;
			}

			// Attempt to refresh the token
			const tokenRefreshed = await refreshAccessToken();
			if (!tokenRefreshed) {
				error = 'Failed to refresh token. Please log in again.';
				isLoading = false; // Stop loading on failure
				return;
			}

			// Fetch Spotify data if the token is valid
			const [userRes, topTracksRes, topArtistsRes] = await Promise.all([
				fetch('/api/spotify/user'),
				fetch('/api/spotify/top-tracks'),
				fetch('/api/spotify/top-artists')
			]);

			if (userRes.ok && topTracksRes.ok && topArtistsRes.ok) {
				user = await userRes.json();
				const tracksData = await topTracksRes.json();
				const artistsData = await topArtistsRes.json();

				// Assign structured data to state variables
				topTracks = {
					longTerm: tracksData.longTerm,
					mediumTerm: tracksData.mediumTerm,
					shortTerm: tracksData.shortTerm
				};

				console.log(topTracks);

				topArtists = {
					longTerm: artistsData.longTerm,
					mediumTerm: artistsData.mediumTerm,
					shortTerm: artistsData.shortTerm
				};

				console.log(topArtists);
			} else {
				error = 'Failed to load data from Spotify.';
			}
		} catch (e) {
			console.error('Error fetching data:', e);
			error = 'Error fetching data.';
		} finally {
			isLoading = false; // Stop loading after attempt
		}
	};

	// Use onMount to trigger data fetching
	onMount(() => {
		fetchData();
	});
</script>

<!-- Template -->
{#if !isLoading && !hasTokens}
	<a href="/auth/spotify/login" class="btn btn-primary">Log in with Spotify</a>
{:else if isLoading}
	<p>Loading...</p>
{:else if user}
	<div>
		{#if user && user.external_urls?.spotify && user.followers?.total}
			<a href={user.external_urls.spotify} target="_blank"
				><h2>{user.display_name}'s Spotify Profile</h2></a
			>
			<p><strong>Followers:</strong> {user.followers.total}</p>
		{/if}

		<!-- Term Selector -->
		<div>
			<Select.Root
				portal={null}
				selected={selectedTerm.value}
				onSelectedChange={(v) => {
					v && (selectedTerm.value = v.value) && (selectedTerm.label = v.label);
				}}
			>
				<Select.Trigger class="w-[180px]">
					<Select.Value placeholder={selectedTerm.label} />
				</Select.Trigger>
				<Select.Content>
					{#each terms as term}
						<Select.Item value={term.value} label={term.label}>{term.label}</Select.Item>
					{/each}
				</Select.Content>
				<Select.Input name="selectedTerm" />
			</Select.Root>
		</div>

		<div>
			<h3>Top Tracks</h3>
			<ul>
				{#each topTracks[selectedTerm.value].items as track}
					<li>
						{track.name} by
						{#each track.artists as artist}
							{artist.name}{#if artist !== track.artists[track.artists.length - 1]}
								,
							{/if}
						{/each}
					</li>
				{/each}
			</ul>

			<h3>Top Artists</h3>
			<ul>
				{#each topArtists[selectedTerm.value].items as artist}
					<li>{artist.name}</li>
				{/each}
			</ul>
		</div>
	</div>
{:else if error}
	<p>{error}</p>
{/if}
