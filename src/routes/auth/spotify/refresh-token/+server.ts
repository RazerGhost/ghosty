import { NODE_ENV } from '$env/static/private';
import { refreshAccessToken } from '$lib/spotify.js';
import { serialize } from 'cookie'; // Ensure this is imported if you want to serialize cookies.

export async function GET({ cookies }) {
	const refreshToken = cookies.get('refresh_token');

	if (!refreshToken) {
		return new Response('No refresh token.', { status: 401 });
	}

	// Call function to refresh access token using the refresh_token
	const tokens = await refreshAccessToken(refreshToken);

	if (tokens.error) {
		return new Response('Failed to refresh token.', { status: 400 });
	}

	// Get the expiration time for the new access token (in seconds)
	const accessTokenExpiresIn = tokens.expires_in;

	// Serialize cookies for tokens with expiration times
	const accessTokenCookie = serialize('access_token', tokens.access_token, {
		httpOnly: true,
		secure: NODE_ENV === 'production', // Only use secure cookies in production
		path: '/', // Cookie path
		maxAge: accessTokenExpiresIn // Expiry time for access token in seconds
	});

	const tokenTypeCookie = serialize('token_type', tokens.token_type, {
		httpOnly: true,
		secure: NODE_ENV === 'production',
		path: '/',
		maxAge: accessTokenExpiresIn // Expiry time for token type in seconds (same as access token)
	});

	// Optionally, you can also refresh the refresh_token cookie if you want it to expire at a certain time.
	const refreshTokenCookie = serialize('refresh_token', refreshToken, {
		httpOnly: true,
		secure: NODE_ENV === 'production',
		path: '/',
		maxAge: 60 * 60 * 24 * 30 // Set refresh token expiration (e.g., 30 days)
	});

	// Send the updated tokens and set the cookies
	return new Response(JSON.stringify(tokens), {
		status: 200,
		headers: {
			'Content-Type': 'application/json',
			'Set-Cookie': [
				accessTokenCookie,
				tokenTypeCookie,
				refreshTokenCookie // If you want to update the refresh token cookie as well
			].join(', ') // Join cookies in one Set-Cookie header
		}
	});
}
