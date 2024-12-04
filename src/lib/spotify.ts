import { SECRET_SPOTIFY_CLIENT_ID, SECRET_SPOTIFY_CLIENT_SECRET, SPOTIFY_REDIRECT_URI } from "$env/static/private";

const SPOTIFY_API_BASE = 'https://accounts.spotify.com';
const API_BASE = 'https://api.spotify.com/v1';

export const getAuthorizationUrl = () => {
    const params = new URLSearchParams({
        client_id: SECRET_SPOTIFY_CLIENT_ID,
        response_type: 'code',
        redirect_uri: SPOTIFY_REDIRECT_URI,
        scope: 'user-top-read user-read-recently-played user-library-read',
    });
    return `${SPOTIFY_API_BASE}/authorize?${params.toString()}`;
};

export const getTokens = async (code: string) => {
    const response = await fetch(`${SPOTIFY_API_BASE}/api/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${btoa(`${SECRET_SPOTIFY_CLIENT_ID}:${SECRET_SPOTIFY_CLIENT_SECRET}`)}`,
        },
        body: new URLSearchParams({
            grant_type: 'authorization_code',
            code,
            redirect_uri: SPOTIFY_REDIRECT_URI,
        }),
    });
    return response.json();
};

export const refreshAccessToken = async (refreshToken: string) => {
    const response = await fetch(`${SPOTIFY_API_BASE}/api/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${btoa(`${SECRET_SPOTIFY_CLIENT_ID}:${SECRET_SPOTIFY_CLIENT_SECRET}`)}`,
        },
        body: new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
        }),
    });
    return response.json();
};

export const getUserData = async (accessToken: string) => {
    const response = await fetch(`${API_BASE}/me`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return response.json();
};

export const getTopTracksLongTerm = async (accessToken: string) => {
    const response = await fetch(`${API_BASE}/me/top/tracks?time_range=long_term`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return response.json();
};

export const getTopTracksMediumTerm = async (accessToken: string) => {
    const response = await fetch(`${API_BASE}/me/top/tracks?time_range=medium_term`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return response.json();
};

export const getTopTracksShortTerm = async (accessToken: string) => {
    const response = await fetch(`${API_BASE}/me/top/tracks?time_range=short_term`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return response.json();
};

export const getTopArtistsLongTerm = async (accessToken: string) => {
    const response = await fetch(`${API_BASE}/me/top/artists?time_range=long_term`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return response.json();
};

export const getTopArtistsMediumTerm = async (accessToken: string) => {
    const response = await fetch(`${API_BASE}/me/top/artists?time_range=medium_term`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return response.json();
};

export const getTopArtistsShortTerm = async (accessToken: string) => {
    const response = await fetch(`${API_BASE}/me/top/artists?time_range=short_term`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return response.json();
};
