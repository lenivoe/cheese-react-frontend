import { nanoid } from 'nanoid/non-secure';
import React, { useState } from 'react';
import { useField } from 'formik';
import FormItemProps from './FormItemProps';

function SelectItem({
    placeholder = '<не задано>',
    label,
    wrapClass,
    labelClass,
    inputClass,
    ...props
}: { placeholder?: string } & FormItemProps) {
    const [cssId] = useState(nanoid());
    const [{ value = SelectItem.UNSELECTED_VALUE, ...field }] = useField(props);

    return (
        <div className={wrapClass + ' form__field'}>
            <label htmlFor={cssId} className={labelClass + ' form-label'}>
                {label}
            </label>
            <select
                {...field}
                id={cssId}
                className={inputClass + ' form-input'}
                value={value}
            >
                <option hidden disabled value={SelectItem.UNSELECTED_VALUE}>
                    {placeholder}
                </option>
                {props.children}
            </select>
        </div>
    );
}

SelectItem.UNSELECTED_VALUE = '__UNSELECTED__VALUE__';

export default SelectItem;
