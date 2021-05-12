import assert from 'assert';
import { nanoid } from 'nanoid/non-secure';
import React, { useCallback, useState } from 'react';
import { useField } from 'formik';
import FormItemProps from './FormItemProps';

interface SelectItemExtraProps {
    placeholder?: string;
}

function SelectItem({
    placeholder = '<не задано>',
    label,
    onValueChange,
    wrapClass,
    labelClass,
    inputClass,
    ...props
}: SelectItemExtraProps & FormItemProps) {
    assert(
        !props.onChange,
        `Field '${props.name}' must use onValueChange instead onChange`
    );

    const [cssId] = useState(nanoid());
    const [{ value = SelectItem.UNSELECTED_VALUE, onChange, ...field }] = useField(props);
    const { children, disabled } = props;

    const onSelectChange: React.ChangeEventHandler<HTMLSelectElement> = useCallback(
        (e) =>
            onValueChange ? onValueChange(e.target.name, e.target.value) : onChange(e),
        [onValueChange, onChange]
    );

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
                disabled={disabled}
                onChange={onSelectChange}
            >
                <option hidden disabled value={SelectItem.UNSELECTED_VALUE}>
                    {placeholder}
                </option>
                {children}
            </select>
        </div>
    );
}

SelectItem.UNSELECTED_VALUE = '__UNSELECTED__VALUE__';

export default SelectItem;
