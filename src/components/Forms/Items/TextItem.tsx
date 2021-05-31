import assert from 'assert';
import { useField } from 'formik';
import { nanoid } from 'nanoid/non-secure';
import React, { useCallback, useState } from 'react';
import FormItemProps from './FormItemProps';

export default function TextItem({
    label,
    onValueChange,
    className,
    labelClassName,
    inputClassName,
    ...props
}: FormItemProps) {
    assert(
        !props.onChange,
        `Field '${props.name}' must use onValueChange instead onChange`
    );

    const [cssId] = useState(nanoid);
    const [{ onChange, ...field }] = useField(props);
    const { placeholder, type, disabled } = props;

    const onTextChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
        (e) =>
            onValueChange ? onValueChange(e.target.name, e.target.value) : onChange(e),
        [onValueChange, onChange]
    );

    return (
        <div className={className + ' form__field'}>
            <label htmlFor={cssId} className={labelClassName + ' form-label'}>
                {label}
            </label>
            <input
                {...field}
                id={cssId}
                className={inputClassName + ' form-input'}
                placeholder={placeholder}
                type={type}
                disabled={disabled}
                onChange={onTextChange}
            />
        </div>
    );
}
