import useAxios from 'axios-hooks';

interface GetRequestProps {
    url: string;
}

export function useGet<TResponse = any, TError = any>({ url }: GetRequestProps) {
    return useAxios<TResponse, TError>({ url, method: 'GET' }, { ssr: false });
}

interface PostRequestProps extends GetRequestProps {
    data: {};
}

export function usePost<TResponse = any, TError = any>({ url, data }: PostRequestProps) {
    return useAxios<TResponse, TError>({ url, data, method: 'POST' }, { ssr: false });
}
