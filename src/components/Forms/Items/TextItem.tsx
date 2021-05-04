import { useField } from 'formik';
import { nanoid } from 'nanoid/non-secure';
import React, { useState } from 'react';
import FormItemProps from './FormItemProps';

export default function TextItem({
    label,
    wrapClass,
    labelClass,
    inputClass,
    ...props
}: FormItemProps) {
    const [cssId] = useState(nanoid());
    const [field] = useField(props);

    return (
        <div className={wrapClass + ' form__field'}>
            <label htmlFor={cssId} className={labelClass + ' form-label'}>
                {label}
            </label>
            <input
                id={cssId}
                className={inputClass + ' form-input'}
                {...field}
                placeholder={props.placeholder}
                type={props.type}
            />
        </div>
    );
}
