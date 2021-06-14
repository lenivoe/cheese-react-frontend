import React from 'react';
import ButtonItem from '../../Items/ButtonItem';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { selectPropertyState } from '../../../../store/property/propertySlice';
import {
    selectMode,
    setMode,
} from '../../../../store/propertyEditForm/propertyEditFormSlice';
import ParameterList from './ParameterList';
import PropertyList from './PropertyList';

const btnClassName = (part: string, isActive: boolean) => {
    const active = isActive ? 'active' : '';
    return `form-menu__${part}-button form-menu__button ${active}`;
};

export default function PropertyEditBlock() {
    const dispatch = useAppDispatch();
    const { propList, status, error } = useAppSelector(selectPropertyState);
    const disabled = status !== 'success';
    const mode = useAppSelector(selectMode);

    return (
        <div className='property-edit__info-block info-block'>
            <PropertyList />
            {/* <ParameterList name='paramInfo.selected.id' /> */}

            <div className='property-edit__form-menu form-menu'>
                <div className='form-menu__buttons-block'>
                    <ButtonItem
                        label='Добавить свойство'
                        className={btnClassName(
                            'add-property',
                            mode === 'ADD_PROP'
                        )}
                        onClick={() => dispatch(setMode('ADD_PROP'))}
                    />
                    <ButtonItem
                        label='Изменить свойство'
                        className={btnClassName(
                            'edit-property',
                            mode === 'EDIT_PROP'
                        )}
                        onClick={() => dispatch(setMode('EDIT_PROP'))}
                    />
                </div>

                <div className='form-menu__buttons-block'>
                    <ButtonItem
                        label='Добавить параметр'
                        className={btnClassName(
                            'add-parameter',
                            mode === 'ADD_PARAM'
                        )}
                        onClick={() => dispatch(setMode('ADD_PARAM'))}
                    />
                    <ButtonItem
                        label='Изменить параметр'
                        className={btnClassName(
                            'edit-parameter',
                            mode === 'EDIT_PARAM'
                        )}
                        onClick={() => dispatch(setMode('EDIT_PARAM'))}
                    />
                </div>
            </div>
        </div>
    );
}
