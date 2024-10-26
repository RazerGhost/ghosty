import type { RequestHandler } from '@sveltejs/kit';
import { fetchSpotifyToken } from '../token/+server';

export const GET: RequestHandler = async () => {
	try {
		const token = await fetchSpotifyToken();


		const response = await fetch('https://api.spotify.com/v1/me', {
			headers: { Authorization: `Bearer ${token}` }
		});

		if (!response.ok) throw new Error('Failed to fetch user data');
		const data = await response.json();
		return new Response(JSON.stringify(data), { status: 200 });
	} catch (error) {
		return new Response(JSON.stringify({ error: 'User fetch failed' }), { status: 500 });
	}
};
