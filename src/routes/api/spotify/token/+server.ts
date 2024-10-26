// Imports
import { SECRET_SPOTIFY_CLIENT_ID, SECRET_SPOTIFY_CLIENT_SECRET } from '$env/static/private';
import type { RequestHandler } from '@sveltejs/kit';

// In-memory token cache
let accessToken: string | null = null;
let tokenExpiry: number | null = null;

async function fetchSpotifyToken() {
	if (accessToken && tokenExpiry && tokenExpiry > Date.now()) {
		return accessToken;
	}

	const response = await fetch('https://accounts.spotify.com/api/token', {
		method: 'POST',
		headers: {
			Authorization: 'Basic ' + btoa(`${SECRET_SPOTIFY_CLIENT_ID}:${SECRET_SPOTIFY_CLIENT_SECRET}`),
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: new URLSearchParams({ grant_type: 'client_credentials' })
	});

	if (!response.ok) {
		throw new Error('Failed to fetch Spotify token');
	}

	const data = await response.json();
	accessToken = data.access_token;
	tokenExpiry = Date.now() + data.expires_in * 1000;
	return accessToken;
}

export const GET: RequestHandler = async () => {
	try {
		const token = await fetchSpotifyToken();
		return new Response(JSON.stringify({ access_token: token }), { status: 200 });
	} catch (e) {
		return new Response(JSON.stringify({ error: 'Token fetch failed' }), { status: 500 });
	}
};


export { fetchSpotifyToken }
