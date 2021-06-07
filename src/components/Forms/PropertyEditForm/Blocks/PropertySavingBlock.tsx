import React from 'react';
import { Form, FormikProps } from 'formik';
import PropertyEditFormValues from '../PropertyEditFormValues';
import TextItem from '../../Items/TextItem';

type PropSavingBlockProps = FormikProps<PropertyEditFormValues> & {
    needEdit: boolean;
    visible?: boolean;
};

const PropertySavingBlock = ({
    needEdit,
    visible = true,
    ...props
}: PropSavingBlockProps) => {
    if (!visible) {
        return null;
    }

    const {
        values: { propInfo },
    } = props;

    const title = needEdit ? 'Изменить свойство' : 'Добавить свойство';
    const className = needEdit ? 'edit-property-form' : 'add-property-form';
    return (
        <div className={`form-block ${className}`}>
            <div className='form-block__title'>{title}</div>
            <Form className='form form--flex'>
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
            </Form>
        </div>
    );
};

export default PropertySavingBlock;
