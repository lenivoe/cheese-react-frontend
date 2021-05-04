import { nanoid } from 'nanoid/non-secure';
import React, { useState } from 'react';
import { useField, useFormikContext } from 'formik';
import RusDatePicker from '../../utils/RusDatePicker';
import { dateToIso } from '../../../utils/utils';
import FormItemProps from './FormItemProps';

export default function DateItem({
    label,
    wrapClass,
    labelClass,
    inputClass,
    ...props
}: FormItemProps) {
    const [cssId] = useState(nanoid());
    const { setFieldValue } = useFormikContext();
    const [{ value, onChange: _, ...field }] = useField(props);

    const date = value ? new Date(value) : new Date();

    return (
        <div className={wrapClass + ' form__field'}>
            <label htmlFor={cssId} className={labelClass + ' form-label'}>
                {label}
            </label>
            <RusDatePicker
                id={cssId}
                className={inputClass + ' form-input'}
                selected={date}
                onChange={(date) =>
                    setFieldValue(field.name, dateToIso(date as Date | undefined))
                }
                {...field}
            />
        </div>
    );
}
