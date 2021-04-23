export function delay(ms: number) {
    return new Promise((resolve, _reject) => {
        setTimeout(resolve, ms);
    });
}

export function dateToIso(date: Date) {
    return date.toISOString().split('T')[0];
}
