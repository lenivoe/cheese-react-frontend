import React, { useCallback, useMemo } from 'react';
import List from '../../Items/List';
import ButtonItem from '../../Items/ButtonItem';

interface PrimaryDataListProps {
    name?: string;
    cssPrefix: string;

    title: string;
    deleteButtonLabel: string;

    value?: string;
    itemList?: { id?: number; name: string; isUsing?: boolean }[];

    onSelect: (name: string | undefined, value: string) => void;
    onDelete: (name?: string, value?: string) => void;
}

export default function PrimaryDataList(props: PrimaryDataListProps) {
    const { name, cssPrefix, title, deleteButtonLabel, value, itemList } = props;
    const { onSelect, onDelete } = props;

    const disableDeleteBtn = useMemo(
        () => itemList?.find((item) => item.id?.toString() === value)?.isUsing ?? true,
        [itemList, value]
    );

    const onDeleteCallback = useCallback(
        () => onDelete(name, value),
        [onDelete, value, name]
    );

    const className = `${cssPrefix}-list__property-item list-item`;

    return (
        <form>
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
                        {itemList?.map(({ id, name, isUsing }) => (
                            <div
                                key={id}
                                className={className}
                                style={isUsing ? { color: 'gray' } : undefined}
                            >
                                <span>{name}</span>
                            </div>
                        ))}
                    </List>
                </div>
                <ButtonItem
                    type='submit'
                    label={deleteButtonLabel}
                    disabled={disableDeleteBtn}
                    useDisabledClass={false}
                    className='delete-list-item-button delete-button'
                    onClick={onDeleteCallback}
                />
            </div>
        </form>
    );
}
