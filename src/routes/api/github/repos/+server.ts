import { SECRET_GITHUB_TOKEN } from '$env/static/private';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
	const url = `https://api.github.com/user/repos`;

	const response = await fetch(url, {
		headers: {
			Authorization: `token ${SECRET_GITHUB_TOKEN}`,
		}
	});

	if (response.ok) {
		const data = await response.json();
		return new Response(JSON.stringify(data), { status: 200 });
	} else {
		return new Response(JSON.stringify({ error: 'Failed to fetch repositories' }), { status: 500 });
	}
};
