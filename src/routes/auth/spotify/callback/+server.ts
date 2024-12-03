import { NODE_ENV } from '$env/static/private';
import { getTokens } from '$lib/spotify.js';
import { serialize } from 'cookie'; // Install 'cookie' package if needed


export async function GET({ url }) {
	const code = url.searchParams.get('code');

	if (!code) {
		return new Response('Authorization code is missing.', { status: 400 });
	}

	const tokens = await getTokens(code);

	if (tokens.error) {
		return new Response('Failed to get tokens.', { status: 400 });
	}

	// Serialize cookies for tokens
	const accessTokenCookie = serialize('access_token', tokens.access_token, {
		httpOnly: true,
		secure: NODE_ENV === 'production',
		path: '/',
		maxAge: tokens.expires_in // in seconds
	});

	const tokenTypeCookie = serialize('token_type', tokens.token_type, {
		httpOnly: true,
		secure: NODE_ENV === 'production',
		path: '/',
		maxAge: tokens.expires_in
	});

	const refreshTokenCookie = serialize('refresh_token', tokens.refresh_token, {
		httpOnly: true,
		secure: NODE_ENV === 'production',
		path: '/',
		maxAge: 60 * 60 * 24 * 30 // 30 days
	});

	// Redirect to the homepage with cookies set
	return new Response(null, {
		status: 303,
		headers: {
			Location: '/', // Redirect to homepage
			'Set-Cookie': [accessTokenCookie, tokenTypeCookie, refreshTokenCookie].join(', ')
		}
	});
}
