import React, { useCallback, useMemo } from 'react';
import List from '../../Items/List';
import ButtonItem from '../../Items/ButtonItem';

interface DataListProps {
  cssPrefix: string;

  title: string;
  deleteButtonLabel: string;

  selectedId?: number;
  itemList?: { id: number; name: string; isUsing?: boolean }[];

  onSelect: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function DataList(props: DataListProps) {
  const { cssPrefix, title, deleteButtonLabel, selectedId, itemList } = props;
  const { onSelect, onDelete } = props;

  // const selectedItem = useMemo(
  //   () => itemList?.find((item) => item.id === selectedId),
  //   [itemList, selectedId]
  // );

  const onDeleteCallback = useCallback(() => {
    selectedId && onDelete(selectedId);
  }, [selectedId, onDelete]);

  const className = `${cssPrefix}-list__property-item list-item`;

  return (
    <div className='property-edit__property-parameters property-edit--list'>
      <div className={`${cssPrefix}-list list`}>
        <div className={`${cssPrefix}-list__title list-title`}>
          <span>{title}</span>
        </div>
        <List
          className={`${cssPrefix}-list__data list-data`}
          value={selectedId}
          valueList={(itemList ?? []).map(({ id }) => id)}
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
        type='button'
        label={deleteButtonLabel}
        // disabled={selectedItem?.isUsing ?? true}
        useDisabledClass={false}
        className='delete-list-item-button delete-button'
        onClick={onDeleteCallback}
      />
    </div>
  );
}
