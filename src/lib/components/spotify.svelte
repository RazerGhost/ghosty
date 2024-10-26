<script lang="ts">
	import { onMount } from 'svelte';
	let user: any = {};
	let topTracks: any = [];
	let topArtists: any = [];
	let error: string = '';

	const fetchData = async () => {
		try {
			const [userRes, topTracksRes, topArtistsRes] = await Promise.all([
				fetch('/api/spotify/user'),
				fetch('/api/spotify/top-tracks'),
				fetch('/api/spotify/top-artists')
			]);
            console.log(userRes, topTracksRes, topArtistsRes);
			if (userRes.ok && topTracksRes.ok && topArtistsRes.ok) {
				user = await userRes.json();
				topTracks = await topTracksRes.json();
				topArtists = await topArtistsRes.json();
			} else {
				error = 'Failed to load data';
			}
		} catch (e) {
			error = 'Error fetching data';
		}
	};

	onMount(() => {
		fetchData();
	});
</script>

{#if user && topTracks.length > 0 && topArtists.length > 0}
	<div>
		<h2>{user.display_name}'s Spotify Profile</h2>
		<p><strong>Username:</strong> {user.id}</p>
		<p><strong>Followers:</strong> {user.followers.total}</p>

		<h3>Top Tracks</h3>
		<ul>
			{#each topTracks as track}
				<li><a href={track.external_urls.spotify} target="_blank">{track.name}</a></li>
			{/each}
		</ul>

		<h3>Top Artists</h3>
		<ul>
			{#each topArtists as artist}
				<li><a href={artist.external_urls.spotify} target="_blank">{artist.name}</a></li>
			{/each}
		</ul>
	</div>
{:else if error}
	<p>{error}</p>
{:else}
	<p>Loading...</p>
{/if}
