
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ($token) => {
	const url = `https://api.spotify.com/v1/me/top/artists`;

	const response = await fetch(url, {
        method: 'GET',
		headers: {
			Authorization: `Bearer ${$token}`,
		}
	});

	if (response.ok) {
		const data = await response.json();
		return new Response(JSON.stringify(data), { status: 200 });
	} else {
		return new Response(JSON.stringify({ error: 'Failed to fetch user data' }), { status: 500 });
	}
};
