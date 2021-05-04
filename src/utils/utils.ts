export function delay(ms: number) {
    return new Promise((resolve, _reject) => {
        setTimeout(resolve, ms);
    });
}

export function dateToIso(date?: Date) {
    return (date ?? new Date()).toISOString().split('T')[0] ?? '';
}
