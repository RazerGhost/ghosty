import { getTopTracks } from '$lib/spotify';

export async function GET({ cookies }) {
	const accessToken = cookies.get('access_token');
	if (!accessToken) {
		return new Response('No access token.', { status: 401 });
	}

	const topTracks = await getTopTracks(accessToken);
	if (topTracks.error) {
		return new Response('Failed to fetch top tracks.', { status: 400 });
	}

	return new Response(JSON.stringify(topTracks), {
		headers: { 'Content-Type': 'application/json' }
	});
}
