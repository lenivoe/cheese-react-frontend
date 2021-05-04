import { useField } from 'formik';
import { nanoid } from 'nanoid/non-secure';
import { useState } from 'react';
import FormItemProps from './FormItemProps';

export default function TextItem({
    label,
    wrapClass,
    labelClass,
    inputClass,
    ...props
}: FormItemProps) {
    const [cssId] = useState(nanoid());
    const [field, meta] = useField(props);

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
            {meta.touched && meta.error && <div className='error'>{meta.error}</div>}
        </div>
    );
}
