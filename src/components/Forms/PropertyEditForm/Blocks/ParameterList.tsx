import React, { useCallback, useMemo } from 'react';
import { FormikProps } from 'formik/dist/types';
import PrimaryDataList from './PrimaryDataList';
import PropertyEditFormValues from '../PropertyEditFormValues';

type ParameterListProps = FormikProps<PropertyEditFormValues> & {
    name: string;
};

export default function ParameterList(props: ParameterListProps) {
    const {
        name,
        values: { propList, propInfo, paramInfo },
        setFieldValue,
    } = props;

    const itemList = useMemo(() => {
        const prop = propList?.find((prop) => prop.id === propInfo.selected.id);
        return [
            ...(prop?.ungrouped ?? []),
            ...(prop?.groups ?? []).flatMap((group) => group.parameters),
        ];
    }, [propList, propInfo.selected.id]);

    const onSelect = useCallback(
        (name: string | undefined, value: string) => setFieldValue(name!, parseInt(value)),
        [setFieldValue]
    );

    const onDelete = useCallback(
        (name?: string, value?: string) => {
            console.log('param del', value)
            setFieldValue('paramInfo.removing.id', value && parseInt(value));
        },
        [setFieldValue]
    );

    return (
        <PrimaryDataList
            name={name}
            cssPrefix='parameters'
            title='Параметры'
            deleteButtonLabel='Удалить параметр'
            value={paramInfo.selected.id?.toString()}
            itemList={itemList}
            onSelect={onSelect}
            onDelete={onDelete}
        />
    );
}
