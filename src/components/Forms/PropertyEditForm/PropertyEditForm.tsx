import React, { useEffect } from 'react';
import PropertyEditBlock from './Blocks/PropertyEditBlock';
import {
    MenuKey,
    setActiveMenuItemByKey,
    setTitleByActiveItem,
} from '../../../store/formFrame/formFrameSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { selectPropertyState } from '../../../store/property/propertySlice';
import FormErrorMessage from '../Items/FormErrorMessage';

export default function PropertyEditForm() {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(setActiveMenuItemByKey(MenuKey.PROPERTY_EDIT));
        dispatch(setTitleByActiveItem());
    });

    const { status, error } = useAppSelector(selectPropertyState);

    return (
        <div>
            <FormErrorMessage loading={status === 'loading'} error={error} />

            <div className='property-edit'>
                <PropertyEditBlock />

                {/* <div className='property-edit__form-block'>
                <PropertySavingBlock
                    {...props}
                    needEdit={state === 'EDIT_PROP'}
                    visible={isPropSave}
                />
                <ParamSavingBlock
                    id={undefined && 'parameter?.id'}
                    needEdit={state === 'EDIT_PARAM'}
                    visible={isParamSave}
                /> */}
            </div>
        </div>
    );
}
