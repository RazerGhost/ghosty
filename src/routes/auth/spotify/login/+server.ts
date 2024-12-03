import { getAuthorizationUrl } from '$lib/spotify';

export function GET() {
	const spotifyAuthUrl = getAuthorizationUrl();
	return Response.redirect(spotifyAuthUrl, 302);
}
