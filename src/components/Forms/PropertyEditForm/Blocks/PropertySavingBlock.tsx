import React from 'react';
import TextItem from '../../Items/TextItem';

type PropSavingBlockProps = {
  needEdit: boolean;
  visible?: boolean;
};

function PropertySavingBlock(props: PropSavingBlockProps) {
  const { needEdit, visible = true } = props;
  if (!visible) {
    return null;
  }

  const title = needEdit ? 'Изменить свойство' : 'Добавить свойство';
  const className = needEdit ? 'edit-property-form' : 'add-property-form';
  return (
    <div className={`form-block ${className}`}>
      <div className='form-block__title'>{title}</div>
      <form className='form form--flex'>
        <div className='form__fields'>
          <TextItem
            name='propInfo.saving.name'
            label='Наименование'
            className='form__field'
            labelClassName='form-label'
            inputClassName='form-input'
          />
          {/* <div className='form__field'>
                        <label className='form-label' htmlFor='property_name'>
                            Наименование
                        </label>
                        <input
                            className='form-input'
                            id='property_name'
                            type='text'
                            name='property_name'
                        />
                    </div> */}
        </div>
        <button className='form-button' type='submit'>
          Сохранить
        </button>
      </form>
    </div>
  );
}

export default PropertySavingBlock;
