import { Dispatch, SetStateAction, useEffect, useState } from 'react';

type PossibleNullableString<T> = T extends string ? string : string | null;

export function useLocalStorageState<T extends string | null>(
    key: string,
    defaultValue?: T
): [PossibleNullableString<T>, Dispatch<SetStateAction<PossibleNullableString<T>>>] {
    return useStorageState(localStorage, key, defaultValue);
}

export function useSessionStorageState<T extends string | null>(
    key: string,
    defaultValue?: T
): [PossibleNullableString<T>, Dispatch<SetStateAction<PossibleNullableString<T>>>] {
    return useStorageState(sessionStorage, key, defaultValue);
}

export function useStorageState<T extends string | null>(
    storage: Storage,
    key: string,
    defaultValue?: T
): [PossibleNullableString<T>, Dispatch<SetStateAction<PossibleNullableString<T>>>] {
    const [value, setValue] = useState(
        (storage.getItem(key) ?? defaultValue) as T extends string
            ? string
            : string | null
    );

    useEffect(() => {
        if (value != null) {
            storage.setItem(key, value!);
        } else {
            storage.removeItem(key);
        }
    }, [value, key, storage]);

    return [value, setValue];
}
