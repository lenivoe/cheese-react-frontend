import React from 'react';
import { useFormikContext } from 'formik';
import List, { ListProps } from '../../Items/List';
import PropertyEditFormValues from '../PropertyEditFormValues';
import ButtonItem from "../../Items/ButtonItem";

interface PropOrParamListProps {
    title: string;
    cssPrefix: 'properties' | 'parameters';
    name: 'property' | 'parameter';
}

export default function PropOrParamList(props: PropOrParamListProps) {
    const { title, cssPrefix, name } = props;
    const className = `${cssPrefix}-list__property-item list-item`;
    const { values, setFieldValue } = useFormikContext<PropertyEditFormValues>();
    const { value, itemList, getSelected } = getListData(name, values);

    const onSelect: NonNullable<ListProps['onSelect']> = (name, selectedName) => {
        if (name === 'property') {
            setFieldValue('parameter', undefined)
        }
        setFieldValue(name, getSelected(selectedName));
    };
    return (
        <div className='property-edit__property-parameters property-edit--list'>
            <div className={`${cssPrefix}-list list`}>
                <div className={`${cssPrefix}-list__title list-title`}>
                    <span>{title}</span>
                </div>
                <List
                    className={`${cssPrefix}-list__data list-data`}
                    name={name}
                    value={value}
                    valueList={(itemList ?? []).map(({ name }) => name)}
                    onSelect={onSelect}
                >
                    {itemList?.map(({ id, name }) => (
                        <div key={id} className={className}>
                            <span>{name}</span>
                        </div>
                    ))}
                </List>
            </div>
            <ButtonItem
                label='Удалить свойство'
                className="delete-list-item-button delete-button"
            />
        </div>
    );
}

function getListData(type: 'property' | 'parameter', values: PropertyEditFormValues) {
    if (type !== 'property' && type !== 'parameter') {
        throw Error('unexpected data type');
    }
    const { property, parameter, propertyList } = values;
    let value: string | undefined;
    let itemList: { id?: number; name: string }[] | undefined;
    switch (type) {
        case 'property':
            value = property?.name;
            itemList = propertyList;
            break;
        case 'parameter':
            value = parameter?.name;
            itemList = [
                ...(property?.ungrouped ?? []),
                ...(property?.groups ?? []).flatMap((group) => group.parameters),
            ];
            break;
    }
    const getSelected = (selectedName: string) =>
        itemList?.find(({ name }) => name === selectedName);

    return { value, itemList, getSelected };
}
