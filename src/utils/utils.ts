export function delay(ms: number) {
    return new Promise((resolve, _reject) => {
        setTimeout(resolve, ms);
    });
}

export interface AnyObj {
    [key: string]: any;
}
