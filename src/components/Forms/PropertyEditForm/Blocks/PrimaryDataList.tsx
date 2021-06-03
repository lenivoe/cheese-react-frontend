import React, { useCallback } from 'react';
import List from '../../Items/List';
import ButtonItem from '../../Items/ButtonItem';

interface PrimaryDataListProps {
    name: string;
    cssPrefix: string;

    title: string;
    deleteButtonLabel: string;

    value?: string;
    itemList?: { id?: number; name: string }[];

    onSelect: (name: string, value: string) => void;
    onDelete: (name: string, value?: string) => void;
}

export default function PrimaryDataList(props: PrimaryDataListProps) {
    const { name, cssPrefix, title, deleteButtonLabel, value, itemList } = props;
    const { onSelect, onDelete } = props;

    const onDeleteCallback = useCallback(
        () => onDelete(name, value),
        [onDelete, value, name]
    );

    const className = `${cssPrefix}-list__property-item list-item`;

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
                    valueList={(itemList ?? []).map(({ id }) => id!.toString())}
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
                type='submit'
                label={deleteButtonLabel}
                className='delete-list-item-button delete-button'
                onClick={onDeleteCallback}
            />
        </div>
    );
}
