import axios from 'axios'
import { getSession } from '../helpers/session';

export const api = axios.create({
    baseURL: 'https://api.spotify.com/v1'
})

api.interceptors.request.use(config => {
    const token = getSession('token');

    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
})