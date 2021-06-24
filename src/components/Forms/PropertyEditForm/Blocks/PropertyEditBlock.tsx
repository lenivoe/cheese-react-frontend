import React, { useMemo } from 'react';
import ButtonItem from '../../Items/ButtonItem';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import {
  downloadProperties,
  selectPropertyState,
} from '../../../../store/property/propertySlice';
import classNames from 'classnames';
import DataList from './DataList';

export type EditMode =
  | 'ADD_PROP'
  | 'EDIT_PROP'
  | 'ADD_PARAM'
  | 'EDIT_PARAM'
  | 'NONE';

interface Props {
  selectedPropId?: number;
  onPropSelect: (id: number) => void;
  onPropDelete: (id: number) => void;

  selectedParamId?: number;
  onParamSelect: (id: number) => void;
  onParamDelete: (id: number) => void;

  mode: EditMode;
  onModeChange: (mode: EditMode) => void;
}

const btnClassName = (part: string, active: boolean) => {
  const baseClass = `form-menu__${part}-button form-menu__button`;
  return classNames(baseClass, { active });
};

export default function PropertyEditBlock(props: Props) {
  const {
    selectedPropId,
    onPropSelect,
    onPropDelete,

    selectedParamId,
    onParamSelect,
    onParamDelete,

    mode,
    onModeChange,
  } = props;

  const dispatch = useAppDispatch();
  const { propList, status } = useAppSelector(selectPropertyState);
  const disabled = status !== 'success';

  if (propList.length === 0) {
    dispatch(downloadProperties());
  }

  const paramList = useMemo(() => {
    const prop = propList?.find((prop) => prop.id === selectedPropId);
    return prop?.groups?.[0].parameters ?? [];
  }, [propList, selectedPropId]);

  return (
    <div className='property-edit__info-block info-block'>
      <DataList
        cssPrefix='properties'
        title='Свойства'
        deleteButtonLabel='Удалить свойство'
        selectedId={selectedPropId}
        onSelect={onPropSelect}
        onDelete={onPropDelete}
        itemList={propList}
      />

      <DataList
        cssPrefix='parameters'
        title='Параметры'
        deleteButtonLabel='Удалить параметр'
        selectedId={selectedParamId}
        onSelect={onParamSelect}
        onDelete={onParamDelete}
        itemList={paramList}
      />

      <div className='property-edit__form-menu form-menu'>
        <div className='form-menu__buttons-block'>
          <ButtonItem
            label='Добавить свойство'
            className={btnClassName('add-property', mode === 'ADD_PROP')}
            onClick={() => onModeChange('ADD_PROP')}
            disabled={disabled}
          />
          <ButtonItem
            label='Изменить свойство'
            className={btnClassName('edit-property', mode === 'EDIT_PROP')}
            onClick={() => onModeChange('EDIT_PROP')}
            disabled={disabled}
          />
        </div>

        <div className='form-menu__buttons-block'>
          <ButtonItem
            label='Добавить параметр'
            className={btnClassName('add-parameter', mode === 'ADD_PARAM')}
            onClick={() => onModeChange('ADD_PARAM')}
            disabled={disabled}
          />
          <ButtonItem
            label='Изменить параметр'
            className={btnClassName('edit-parameter', mode === 'EDIT_PARAM')}
            onClick={() => onModeChange('EDIT_PARAM')}
            disabled={disabled}
          />
        </div>
      </div>
    </div>
  );
}
