export default interface RequestError {
    message: string;
    name: string;
    stack: string;
    config: {
        url: string;
        method: string;
        headers: { Accept: string };
        baseURL: string;
        transformRequest: [];
        transformResponse: [];
        timeout: number;
        xsrfCookieName: string;
        xsrfHeaderName: string;
        maxContentLength: number;
        maxBodyLength: number;
    };
}
