import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
	try {
		const token = false;
		const url = `https://api.spotify.com/v1/me/top/artists`;

		const response = await fetch(url, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`
			}
		});

		if (!response.ok) {
			return new Response(JSON.stringify({ error: 'Failed to fetch top artists' }), { status: 500 });
		}

		const data = await response.json();
		return new Response(JSON.stringify(data), { status: 200 });
	} catch (error) {
		return new Response(JSON.stringify({ error: 'Error fetching token or data' }), { status: 500 });
	}
};
