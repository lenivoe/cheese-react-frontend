import { useEffect, useState } from 'react';

export function useLocalStorage<T = string | null>(key: string, defaultValue?: T) {
    return useStorage(localStorage, key, defaultValue);
}

export function useSessionStorage<T = string | null>(key: string, defaultValue?: T) {
    return useStorage(sessionStorage, key, defaultValue);
}

export function useStorage<T = string | null>(
    storage: Storage,
    key: string,
    defaultValue?: T
) {
    type StrOrNullStr<T> = T extends string ? string : string | null;

    const [value, setValue] = useState(
        (storage.getItem(key) ?? defaultValue) as StrOrNullStr<T>
    );

    useEffect(() => {
        if (value != null) {
            storage.setItem(key, value!);
        } else {
            storage.removeItem(key);
        }
    }, [value, key, storage]);

    return [value, setValue] as const;
}
