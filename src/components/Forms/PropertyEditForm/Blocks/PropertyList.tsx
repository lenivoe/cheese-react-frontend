import React, { useCallback } from 'react';
import { FormikProps } from 'formik/dist/types';
import PrimaryDataList from './PrimaryDataList';
import PropertyEditFormValues from '../PropertyEditFormValues';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import {
    deleteProperty,
    downloadProperties,
    selectPropertyState,
} from '../../../../store/property/propertySlice';
import {
    selectProp,
    setParam,
    setProp,
} from '../../../../store/propertyEditForm/propertyEditFormSlice';

export default function PropertyList() {
    const dispatch = useAppDispatch();
    const { propList, status, error } = useAppSelector(selectPropertyState);
    if (propList.length === 0) {
        dispatch(downloadProperties());
    }
    const selectedProp = useAppSelector(selectProp);

    const onSelect = useCallback(
        (name: string | undefined, value: string) => {
            const id = parseInt(value);
            if (!selectedProp || selectedProp.id !== id) {
                const prop = propList.find((prop) => prop.id === id);
                dispatch(setProp(prop));
                dispatch(setParam(undefined));
            }
        },
        [dispatch, propList, selectedProp]
    );

    const onDelete = useCallback(
        (name?: string, value?: string) => {
            if (value) {
                dispatch(deleteProperty(parseInt(value)));
            }
        },
        [dispatch]
    );

    return (
        <PrimaryDataList
            cssPrefix='properties'
            title='Свойства'
            deleteButtonLabel='Удалить свойство'
            value={selectedProp?.id?.toString()}
            itemList={propList}
            onSelect={onSelect}
            onDelete={onDelete}
        />
    );
}
