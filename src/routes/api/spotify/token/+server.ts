import { SECRET_SPOTIFY_CLIENT_ID, SECRET_SPOTIFY_CLIENT_SECRET } from '$env/static/private';
import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async () => {
	const tokenUrl = 'https://accounts.spotify.com/api/token';

	// Step 1: Request the access token from Spotify
	const tokenResponse = await fetch(tokenUrl, {
		method: 'POST',
		headers: {
			'Authorization': 'Basic ' + btoa(`${SECRET_SPOTIFY_CLIENT_ID}:${SECRET_SPOTIFY_CLIENT_SECRET}`),
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: new URLSearchParams({
			grant_type: 'client_credentials'
		})
	});

	if (!tokenResponse.ok) {
		return new Response(JSON.stringify({ error: 'Failed to fetch access token' }), { status: 500 });
	}

	const tokenData = await tokenResponse.json();
	const accessToken = tokenData.access_token;

	// Step 2: Return the access token as the response
	return new Response(JSON.stringify({ access_token: accessToken }), { status: 200 });
};
