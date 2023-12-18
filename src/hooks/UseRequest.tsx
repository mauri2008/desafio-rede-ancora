
import { useState } from 'react';
import { api } from '../Providers/axios';
import axios from 'axios';
import querystring from 'querystring';

interface IHandleRequest {
    url: string;
    method: 'get' | 'post' | 'put' | 'delete';
    data?: object  ;
    query?: any,
    headers?: object 
}

export function UseRequest() {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    function formatErrorMessages(err: Error) {
        if (axios.isAxiosError(err) && err.response) {
            return `Request failed with status code ${err.response.status}: ${err.response.data.message}`;
        } else {
            return err.message || 'An unknown error occurred';
        }
    }

    async function handleRequest({url, method, data, query, headers}: IHandleRequest) {

        setLoading(true);

        if(query) url = url + '?' + querystring.stringify(query);

        try {
            const responseRequest = await api[method](url, data, headers);

            return responseRequest?.data;
        } catch (err) {
            setError(formatErrorMessages(err as Error));
            throw err;
        } finally {
            setLoading(false);
        }

    }

 return {handleRequest, loading, error};
}
