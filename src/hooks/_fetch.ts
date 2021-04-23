import useAxios from 'axios-hooks';

interface UseGetProps {
    url: string;
}

export function useGet<TResponse = any, TError = any>({ url }: UseGetProps) {
    return useAxios<TResponse, TError>({ url: url }, { ssr: false });
}

interface UsePostData {
    url: string;
    data: {};
}

export function usePost<TResponse = any, TError = any>({ url, data }: UsePostData) {
    return useAxios<TResponse, TError>({ url: url }, { ssr: false });
}
