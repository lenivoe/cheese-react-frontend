import React from 'react';
import { Form } from 'formik';

interface PropSavingBlockProps {
    id?: number;
    needEdit: boolean;
    visible?: boolean;
}

const PropertySavingBlock = ({ id, needEdit, visible = true }: PropSavingBlockProps) => {
    if (!visible) {
        return null;
    }

    const title = needEdit ? 'Изменить свойство' : 'Добавить свойство';
    const className = needEdit ? 'edit-property-form' : 'add-property-form';
    return (
        <div className={`form-block ${className}`}>
            <div className='form-block__title'>{title}</div>
            <Form className='form form--flex'>
                <div className='form__fields'>
                    <div className='form__field'>
                        <label className='form-label' htmlFor='property_name'>
                            Наименование
                        </label>
                        <input
                            className='form-input'
                            id='property_name'
                            type='text'
                            name='property_name'
                        />
                    </div>
                </div>
                <button className='form-button' type='submit'>
                    Сохранить
                </button>
            </Form>
        </div>
    );
};

export default PropertySavingBlock;
