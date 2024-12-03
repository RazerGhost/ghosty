import { getUserData } from '$lib/spotify.js';

export async function GET({ cookies }) {
	const accessToken = cookies.get('access_token');
	if (!accessToken) {
		return new Response('No access token.', { status: 401 });
	}

	const userData = await getUserData(accessToken);
	if (userData.error) {
		return new Response('Failed to fetch user data.', { status: 400 });
	}

	return new Response(JSON.stringify(userData), {
		headers: { 'Content-Type': 'application/json' }
	});
}
