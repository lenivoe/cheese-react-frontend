import React from 'react';
import { useState } from 'react';
import FormalProperty from '../../../../models/Property/FormalProperty';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import {
  selectPropertyState,
  uploadProperty,
} from '../../../../store/property/propertySlice';
import TextField from '../../Items/TextField';

type PropSavingBlockProps = {
  needEdit: boolean;
  visible?: boolean;
  propertyId?: number;
};

function PropertySavingBlock(props: PropSavingBlockProps) {
  const { needEdit, visible = true, propertyId } = props;
  const [propName, setPropName] = useState('');

  const dispatch = useAppDispatch();
  const { propList } = useAppSelector(selectPropertyState);

  if (!visible) {
    return null;
  }

  const title = needEdit ? 'Изменить свойство' : 'Добавить свойство';
  const className = needEdit ? 'edit-property-form' : 'add-property-form';

  return (
    <div className={`form-block ${className}`}>
      <div className="form-block__title">{title}</div>
      <form className="form form--flex">
        <div className="form__fields">
          <TextField
            label="Наименование"
            onChange={setPropName}
            value={propName}
            className="form__field"
            labelClassName="form-label"
            inputClassName="form-input"
          />
        </div>
        <button
          className="form-button"
          type="button"
          onClick={() => {
            const prop: Omit<FormalProperty, 'id'> = propList.find(
              (prop) => prop.id === propertyId
            ) ?? { name: propName, isNote: false, code: propName, groups: [], ungrouped: [] } as any;

            dispatch(uploadProperty(prop));
          }}
        >
          Сохранить
        </button>
      </form>
    </div>
  );
}

export default PropertySavingBlock;
