
import querystring from 'querystring';

export const authEndpoint = "https://accounts.spotify.com/authorize";

const REDIRECT_URI = "http://localhost:5173/callback";

const CLIENT_ID = 'a1822ac7b31d49c591abe8cf01bd2fcf'

const SCOPE = [
    "user-top-read",

];

const query = querystring.stringify({
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    response_type: 'token',
    scope: SCOPE.join('%20'),
    
}) 

export const loginUrl = `${authEndpoint}?${query}`;