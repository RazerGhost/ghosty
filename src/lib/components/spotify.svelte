<script lang="ts">
	import { toast } from 'svelte-sonner';
	import * as Select from '$lib/components/ui/select';
	import * as Carousel from '$lib/components/ui/carousel/index.js';
	import Autoplay from 'embla-carousel-autoplay';
	import * as Card from '$lib/components/ui/card';
	import * as Avatar from '$lib/components/ui/avatar/';
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
{:else if error}
	<p>{error}</p>
{:else}
	<div class="space-y-12">
		<div class="flex flex-row justify-between">
			<!-- User Profile Section -->
			{#if user && user.external_urls?.spotify && user.followers?.total}
				<div class="">
					<a
						href={user.external_urls.spotify}
						target="_blank"
						class="text-2xl font-bold hover:underline"
					>
						{user.display_name}'s Spotify Profile
					</a>
					<p class="text-sm">
						<strong>Followers:</strong>
						{user.followers.total}
					</p>
				</div>
			{/if}

			<!-- Term Selector Section -->
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
		</div>
		<!-- Top Tracks Section -->
		<div>
			<h3 class="mb-4 text-center text-2xl font-bold">Top Tracks</h3>
			<Carousel.Root
				plugins={[
					Autoplay({
						delay: 2000
					})
				]}
				class="flex gap-4 overflow-x-scroll"
			>
				<Carousel.Content>
					{#each topTracks[selectedTerm.value].items as track}
						<Carousel.Item class="basis-full sm:basis-1/2 lg:basis-1/3">
							<div
								class="relative overflow-hidden rounded-lg shadow-md"
								style="background-image: url('{track.album?.images?.[0]?.url ||
									'/placeholder.jpg'}'); background-size: cover; background-position: center;"
							>
								<!-- Blurred Background Overlay -->
								<div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

								<!-- Content Overlay -->
								<div class="relative z-10 flex h-full flex-col justify-center p-6 text-white">
									<h4 class="text-lg font-semibold">{track.name}</h4>
									<p class="text-sm">
										by {#each track.artists as artist, i}
											{artist.name}{#if i !== track.artists.length - 1},
											{/if}
										{/each}
									</p>
								</div>
							</div>
						</Carousel.Item>
					{/each}
				</Carousel.Content>
			</Carousel.Root>
		</div>

		<!-- Top Artists Section -->
		<div>
			<h3 class="mb-4 text-center text-2xl font-bold">Top Artists</h3>
			<Carousel.Root
				plugins={[
					Autoplay({
						delay: 2000
					})
				]}
				class="flex gap-4 overflow-x-scroll"
			>
				<Carousel.Content>
					{#each topArtists[selectedTerm.value].items as artist}
						<Carousel.Item class="basis-full sm:basis-1/2 lg:basis-1/3">
							<div
								class="relative flex flex-col items-center justify-center overflow-hidden rounded-lg text-center shadow-md"
								style="background-image: url('{artist.images?.[0]?.url ||
									'/placeholder.jpg'}'); background-size: cover; background-position: center;"
							>
								<!-- Blurred Background Overlay -->
								<div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

								<!-- Content Overlay -->
								<div class="relative z-10 flex flex-col items-center space-y-3 p-4 text-white">
									<div class="h-20 w-20 overflow-hidden rounded-full border-2 border-white">
										<img
											src={artist.images?.[0]?.url || '/placeholder.jpg'}
											alt={artist.name}
											class="h-full w-full object-cover"
										/>
									</div>
									<p class="text-lg font-medium">{artist.name}</p>
								</div>
							</div>
						</Carousel.Item>
					{/each}
				</Carousel.Content>
			</Carousel.Root>
		</div>
	</div>
{/if}
