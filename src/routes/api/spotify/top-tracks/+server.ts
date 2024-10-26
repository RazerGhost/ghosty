import type { RequestHandler } from '@sveltejs/kit';
import { fetchSpotifyToken } from '../token/+server';

export const GET: RequestHandler = async () => {
	try {
		const token = await fetchSpotifyToken();
		const url = `https://api.spotify.com/v1/me/top/tracks`;

		const response = await fetch(url, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`
			}
		});

		if (!response.ok) {
			return new Response(JSON.stringify({ error: 'Failed to fetch top tracks' }), { status: 500 });
		}

		const data = await response.json();
		return new Response(JSON.stringify(data), { status: 200 });
	} catch (error) {
		return new Response(JSON.stringify({ error: 'Error fetching token or data' }), { status: 500 });
	}
};
