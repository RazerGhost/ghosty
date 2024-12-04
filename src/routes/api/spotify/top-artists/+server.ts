import {
	getTopArtistsLongTerm,
	getTopArtistsMediumTerm,
	getTopArtistsShortTerm
} from '$lib/spotify';

export async function GET({ cookies }) {
	const accessToken = cookies.get('access_token');
	if (!accessToken) {
		return new Response(JSON.stringify({ error: 'No access token.' }), {
			status: 401,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	try {
		// Fetch all top artists concurrently
		const [topArtistsLongTerm, topArtistsMediumTerm, topArtistsShortTerm] = await Promise.all([
			getTopArtistsLongTerm(accessToken),
			getTopArtistsMediumTerm(accessToken),
			getTopArtistsShortTerm(accessToken)
		]);

		// Check for errors in any of the responses
		if (topArtistsLongTerm.error || topArtistsMediumTerm.error || topArtistsShortTerm.error) {
			const errorMessage = {
				longTerm: topArtistsLongTerm.error || null,
				mediumTerm: topArtistsMediumTerm.error || null,
				shortTerm: topArtistsShortTerm.error || null
			};
			return new Response(
				JSON.stringify({ error: 'Failed to fetch top artists.', details: errorMessage }),
				{
					status: 400,
					headers: { 'Content-Type': 'application/json' }
				}
			);
		}

		// Return all data
		return new Response(
			JSON.stringify({
				longTerm: topArtistsLongTerm,
				mediumTerm: topArtistsMediumTerm,
				shortTerm: topArtistsShortTerm
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
