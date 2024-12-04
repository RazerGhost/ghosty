import { getTopTracksLongTerm, getTopTracksMediumTerm, getTopTracksShortTerm } from '$lib/spotify';

export async function GET({ cookies }) {
	const accessToken = cookies.get('access_token');
	if (!accessToken) {
		return new Response(JSON.stringify({ error: 'No access token.' }), {
			status: 401,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	try {
		// Fetch all top tracks concurrently
		const [topTracksLongTerm, topTracksMediumTerm, topTracksShortTerm] = await Promise.all([
			getTopTracksLongTerm(accessToken),
			getTopTracksMediumTerm(accessToken),
			getTopTracksShortTerm(accessToken)
		]);

		// Check for errors in any of the responses
		if (topTracksLongTerm.error || topTracksMediumTerm.error || topTracksShortTerm.error) {
			const errorMessage = {
				longTerm: topTracksLongTerm.error || null,
				mediumTerm: topTracksMediumTerm.error || null,
				shortTerm: topTracksShortTerm.error || null
			};
			return new Response(
				JSON.stringify({ error: 'Failed to fetch top tracks.', details: errorMessage }),
				{
					status: 400,
					headers: { 'Content-Type': 'application/json' }
				}
			);
		}
		// Return all data
		return new Response(
			JSON.stringify({
				longTerm: topTracksLongTerm,
				mediumTerm: topTracksMediumTerm,
				shortTerm: topTracksShortTerm
			}),
			{
				headers: { 'Content-Type': 'application/json' }
			}
		);
	} catch (err: any) {
		// Handle unexpected errors
		return new Response(
			JSON.stringify({ error: 'An unexpected error occurred.', details: err.message }),
			{
				status: 500,
				headers: { 'Content-Type': 'application/json' }
			}
		);
	}
}
