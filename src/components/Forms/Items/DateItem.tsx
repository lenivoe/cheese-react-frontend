import assert from 'assert';
import { nanoid } from 'nanoid/non-secure';
import React, { useCallback, useState } from 'react';
import { useField, useFormikContext } from 'formik';
import RusDatePicker from '../../utils/RusDatePicker';
import FormItemProps from './FormItemProps';
import moment from 'moment';

interface DateItemExtraProps {
    format?: string;
}

export default function DateItem({
    format = 'YYYY-MM-DD',
    label,
    onValueChange,
    wrapClass,
    labelClass,
    inputClass,
    ...props
}: DateItemExtraProps & FormItemProps) {
    assert(
        !props.onChange,
        `Field '${props.name}' must use onValueChange instead onChange`
    );

    const [cssId] = useState(nanoid);
    const { setFieldValue } = useFormikContext();

    // обычный onChange не работает
    const [{ value, onChange: _, ...field }] = useField(props);
    const { disabled } = props;

    // если callback не задан, используется функция сохранения нового знаения в поле
    // иначе вся отвественность на сохранении результата ложится на callback
    const sendValue: typeof onValueChange = onValueChange ?? setFieldValue;
    const onDateChange: (date: Date | null) => void = useCallback(
        (date) => sendValue(field.name, moment(date).format(format)),
        [field.name, format, sendValue]
    );

    return (
        <div className={wrapClass + ' form__field'}>
            <label htmlFor={cssId} className={labelClass + ' form-label'}>
                {label}
            </label>
            <RusDatePicker
                {...field}
                id={cssId}
                className={inputClass + ' form-input'}
                selected={new Date(moment(value).format(format))}
                onChange={onDateChange}
                disabled={disabled}
            />
        </div>
    );
}
