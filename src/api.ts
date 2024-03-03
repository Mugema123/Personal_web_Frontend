import axios from 'axios';
import useSWR from 'swr';

export const API = axios.create({
    baseURL: (import.meta as any).env.VITE_APP_D_CORE_URL,
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
}); 

export const fetcher = async (path) => {
    return API.get(path)
        .then((res) => res.data)
        .catch((error) => {
            throw error.response?.data?.message || error.message || 'Unknown error occurred';
        });
};

export const useFetcher = (pathname, opts) => {
    const { data, error, isLoading } = useSWR(pathname, fetcher, opts);
    return {
        data,
        isLoading: isLoading || (!error && !data),
        isError: error
    };
};