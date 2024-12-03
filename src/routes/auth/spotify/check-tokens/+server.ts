import { parse } from 'cookie'; // Parse method from 'cookie' library

export async function GET({ request }) {
	// Parse cookies from the request
	const cookieHeader = request.headers.get('cookie');
	const cookies = cookieHeader ? parse(cookieHeader) : {};

	// Check if access_token or refresh_token exists
	const hasAccessToken = !!cookies.access_token || !!cookies.refresh_token;

	return new Response(JSON.stringify({ hasAccessToken }), {
		headers: { 'Content-Type': 'application/json' }
	});
}
