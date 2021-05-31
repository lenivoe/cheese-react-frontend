import React from 'react';
import { FormikProps } from 'formik';
import ButtonItem from '../../Items/ButtonItem';
import PropertyEditFormValues from '../PropertyEditFormValues';
import PropOrParamList from './PropOrParamList';

const btnClassName = (part: string, isActive: boolean) => {
    const active = isActive ? 'active' : '';
    return `form-menu__${part}-button form-menu__button ${active}`;
};

export default function PropertyEditBlock({
    values: { state },
    setFieldValue,
}: FormikProps<PropertyEditFormValues>) {
    return (
        <div className='property-edit__info-block info-block'>
            <PropOrParamList title='Свойства' cssPrefix='properties' name='property' />
            <PropOrParamList title='Параметры' cssPrefix='parameters' name='parameter' />

            <div className='property-edit__property-info property-info'></div>

            <div className='property-edit__form-menu form-menu'>
                <ButtonItem
                    label='Группы параметров'
                    className={btnClassName('edit-groups', state === 'EDIT_GROUPS')}
                    onClick={() => setFieldValue('state', 'EDIT_GROUPS')}
                />

                <div className='form-menu__add-buttons form-menu__buttons-block'>
                    <ButtonItem
                        label='Добавить свойство'
                        className={btnClassName('add-property', state === 'ADD_PROP')}
                        onClick={() => setFieldValue('state', 'ADD_PROP')}
                    />
                    <ButtonItem
                        label='Добавить параметр'
                        className={btnClassName('add-parameter', state === 'ADD_PARAM')}
                        onClick={() => setFieldValue('state', 'ADD_PARAM')}
                    />
                </div>

                <div className='form-menu__edit-buttons form-menu__buttons-block'>
                    <ButtonItem
                        label='Изменить свойство'
                        className={btnClassName('edit-property', state === 'EDIT_PROP')}
                        onClick={() => setFieldValue('state', 'EDIT_PROP')}
                        // disabled={true}
                    />
                    <ButtonItem
                        label='Изменить параметр'
                        className={btnClassName('edit-parameter', state === 'EDIT_PARAM')}
                        onClick={() => setFieldValue('state', 'EDIT_PARAM')}
                    />
                </div>

                <div className='form-menu__delete-buttons form-menu__buttons-block'>
                    <ButtonItem
                        label='Удалить свойство'
                        className={btnClassName('delete-property', false)}
                    />
                    <ButtonItem
                        label='Удалить параметр'
                        className={btnClassName('delete-parameter', false)}
                    />
                </div>
            </div>
        </div>
    );
}
