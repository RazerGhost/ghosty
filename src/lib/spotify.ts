import { SECRET_SPOTIFY_CLIENT_ID, SECRET_SPOTIFY_CLIENT_SECRET, SPOTIFY_REDIRECT_URI } from "$env/static/private";

const SPOTIFY_API_BASE = 'https://accounts.spotify.com';
const API_BASE = 'https://api.spotify.com/v1';

/**
 * Generates the Spotify authorization URL with the necessary query parameters.
 *
 * @returns {string} The URL to redirect the user for Spotify authorization.
 */
export const getAuthorizationUrl = () => {
    const params = new URLSearchParams({
        client_id: SECRET_SPOTIFY_CLIENT_ID,
        response_type: 'code',
        redirect_uri: SPOTIFY_REDIRECT_URI,
        scope: 'user-top-read user-read-recently-played user-library-read',
    });
    return `${SPOTIFY_API_BASE}/authorize?${params.toString()}`;
};

/**
 * Fetches Spotify tokens using the provided authorization code.
 *
 * @param {string} code - The authorization code received from Spotify.
 * @returns {Promise<any>} A promise that resolves to the response JSON containing the tokens.
 *
 * @throws {Error} If the fetch request fails or the response is not in JSON format.
 */
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

/**
 * Refreshes the Spotify access token using the provided refresh token.
 *
 * @param {string} refreshToken - The refresh token used to obtain a new access token.
 * @returns {Promise<any>} A promise that resolves to the response JSON containing the new access token and other related information.
 */
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

/**
 * Fetches the user data from the Spotify API.
 *
 * @param accessToken - The access token used for authorization.
 * @returns A promise that resolves to the user data in JSON format.
 */
export const getUserData = async (accessToken: string) => {
    const response = await fetch(`${API_BASE}/me`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return response.json();
};


/** Top Tracks API **/

/**
 * Fetches the user's top tracks over the long term from the Spotify API.
 *
 * @param {string} accessToken - The access token for authenticating the request.
 * @returns {Promise<any>} A promise that resolves to the JSON response containing the top tracks.
 */
export const getTopTracksLongTerm = async (accessToken: string) => {
    const response = await fetch(`${API_BASE}/me/top/tracks?time_range=long_term`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return response.json();
};

/**
 * Fetches the user's top tracks for the medium term (approximately 6 months).
 *
 * @param {string} accessToken - The access token for Spotify API authentication.
 * @returns {Promise<any>} A promise that resolves to the JSON response containing the top tracks.
 */
export const getTopTracksMediumTerm = async (accessToken: string) => {
    const response = await fetch(`${API_BASE}/me/top/tracks?time_range=medium_term`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return response.json();
};

/**
 * Fetches the user's top tracks for the short term (last 4 weeks) from the Spotify API.
 *
 * @param {string} accessToken - The access token for authenticating the request to the Spotify API.
 * @returns {Promise<any>} A promise that resolves to the JSON response containing the user's top tracks.
 */
export const getTopTracksShortTerm = async (accessToken: string) => {
    const response = await fetch(`${API_BASE}/me/top/tracks?time_range=short_term`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return response.json();
};

/** Top Artists API **/

/**
 * Fetches the user's top artists over the long term from the Spotify API.
 *
 * @param {string} accessToken - The access token for authenticating with the Spotify API.
 * @returns {Promise<any>} A promise that resolves to the JSON response containing the user's top artists.
 */
export const getTopArtistsLongTerm = async (accessToken: string) => {
    const response = await fetch(`${API_BASE}/me/top/artists?time_range=long_term`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return response.json();
};

/**
 * Fetches the current user's top artists over the medium term (approximately 6 months).
 *
 * @param {string} accessToken - The access token for Spotify API authentication.
 * @returns {Promise<any>} A promise that resolves to the JSON response containing the top artists data.
 */
export const getTopArtistsMediumTerm = async (accessToken: string) => {
    const response = await fetch(`${API_BASE}/me/top/artists?time_range=medium_term`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return response.json();
};

/**
 * Fetches the current user's top artists over the short term (approximately 4 weeks).
 *
 * @param {string} accessToken - The access token for Spotify API authentication.
 * @returns {Promise<any>} A promise that resolves to the JSON response containing the user's top artists.
 */
export const getTopArtistsShortTerm = async (accessToken: string) => {
    const response = await fetch(`${API_BASE}/me/top/artists?time_range=short_term`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return response.json();
};
