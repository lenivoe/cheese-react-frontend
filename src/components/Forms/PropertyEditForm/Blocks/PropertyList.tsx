import React, { useCallback } from 'react';
import { FormikProps } from 'formik/dist/types';
import PrimaryDataList from './PrimaryDataList';
import PropertyEditFormValues from '../PropertyEditFormValues';

type PropertyListProps = FormikProps<PropertyEditFormValues> & {
    name: string;
    paramListName: string;
};

export default function PropertyList(props: PropertyListProps) {
    const {
        name,
        paramListName,
        values: { propList, propInfo },
        setFieldValue,
    } = props;

    const onSelect = useCallback(
        (name: string, value: string) => {
            const id = parseInt(value);
            if (propInfo.selected.id !== id) {
                setFieldValue(name, id);
                setFieldValue(paramListName, undefined);
            }
        },
        [paramListName, propInfo, setFieldValue]
    );

    const onDelete = useCallback(
        (name: string, value?: string) =>
            setFieldValue('propInfo.removing.id', value && parseInt(value)),
        [setFieldValue]
    );

    return (
        <PrimaryDataList
            name={name}
            cssPrefix='properties'
            title='Свойства'
            deleteButtonLabel='Удалить свойство'
            value={propInfo.selected.id?.toString()}
            itemList={propList}
            onSelect={onSelect}
            onDelete={onDelete}
        />
    );
}
