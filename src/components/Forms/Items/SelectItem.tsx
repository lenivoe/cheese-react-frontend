import { nanoid } from 'nanoid/non-secure';
import React, { useState } from 'react';
import { useField } from 'formik';
import FormItemProps from './FormItemProps';

export default function SelectItem({
    placeholder = '<не задано>',
    label,
    wrapClass,
    labelClass,
    inputClass,
    ...props
}: { placeholder?: string } & FormItemProps) {
    const [cssId] = useState(nanoid());
    const [field, meta] = useField(props);

    return (
        <div className={wrapClass + ' form__field'}>
            <label htmlFor={cssId} className={labelClass + ' form-label'}>
                {label}
            </label>
            <select id={cssId} className={inputClass + ' form-input'} {...field}>
                <option hidden disabled value=''>
                    {placeholder}
                </option>
                {props.children}
            </select>
            {meta.touched && meta.error && <div className='error'>{meta.error}</div>}
        </div>
    );
}
