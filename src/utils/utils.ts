export function delay(ms: number) {
    return new Promise((resolve, _reject) => {
        setTimeout(resolve, ms);
    });
}
