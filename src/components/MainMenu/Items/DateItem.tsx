import { nanoid } from 'nanoid/non-secure';
import React, { useState } from 'react';
import { dateToIso } from '../../../utils/utils';
import RusDatePicker from '../../utils/RusDatePicker';

interface Props<STR extends string | undefined> {
    name: STR;
    label: string;
    value: string;
    onChange: (value: string, fieldName: STR) => void;
}

export default function DateItem<STR extends string | undefined>(props: Props<STR>) {
    const [cssId] = useState(nanoid());

    return (
        <div className='strain-form__item form__field'>
            <label htmlFor={cssId} className='strain-form__label form-label'>
                {props.label}
            </label>
            <RusDatePicker
                name={props.name}
                selected={props.value === '' ? new Date() : new Date(props.value)}
                onChange={(date) => props.onChange(dateToIso(date as Date), props.name)}
                id={cssId}
                className='strain-form__input form-input'
            />
        </div>
    );
}
