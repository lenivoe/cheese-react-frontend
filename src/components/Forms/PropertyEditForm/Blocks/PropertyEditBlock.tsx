import React from 'react';
import { FormikProps } from 'formik';
import ButtonItem from '../../Items/ButtonItem';
import PropertyEditFormValues from '../PropertyEditFormValues';
import PropertyList from './PropertyList';
import ParameterList from './ParameterList';

const btnClassName = (part: string, isActive: boolean) => {
    const active = isActive ? 'active' : '';
    return `form-menu__${part}-button form-menu__button ${active}`;
};

export default function PropertyEditBlock(props: FormikProps<PropertyEditFormValues>) {
    const {
        values: { state },
        setFieldValue,
    } = props;

    return (
        <div className='property-edit__info-block info-block'>
            <PropertyList
                name='propInfo.selected.id'
                paramListName='paramInfo.selected.id'
                {...props}
            />
            <ParameterList
                name='paramInfo.selected.id'
                {...props}
            />

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
                        // disabled={true}
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
                    />
                    <ButtonItem
                        label='Изменить параметр'
                        className={btnClassName('edit-parameter', state === 'EDIT_PARAM')}
                        onClick={() => setFieldValue('state', 'EDIT_PARAM')}
                    />
                </div>
            </div>
        </div>
    );
}
