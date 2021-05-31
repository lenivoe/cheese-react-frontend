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
    className,
    labelClassName,
    inputClassName,
    ...props
}: SelectItemExtraProps & FormItemProps) {
    assert(
        !props.onChange,
        `Field '${props.name}' must use onValueChange instead onChange`
    );

    const [cssId] = useState(nanoid);
    const [{ value = SelectItem.UNSELECTED_VALUE, onChange, ...field }] = useField(props);
    const { children, disabled } = props;

    const onSelectChange: React.ChangeEventHandler<HTMLSelectElement> = useCallback(
        (e) =>
            onValueChange ? onValueChange(e.target.name, e.target.value) : onChange(e),
        [onValueChange, onChange]
    );

    return (
        <div className={className + ' form__field'}>
            <label htmlFor={cssId} className={labelClassName + ' form-label'}>
                {label}
            </label>
            <select
                {...field}
                id={cssId}
                className={inputClassName + ' form-input'}
                value={value}
                disabled={disabled || React.Children.count(children) === 0}
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
