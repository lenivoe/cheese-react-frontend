import { nanoid } from 'nanoid/non-secure';
import React, { useCallback, useState } from 'react';
import { useField, useFormikContext } from 'formik';
import RusDatePicker from '../../utils/RusDatePicker';
import FormItemProps from './FormItemProps';
import moment from 'moment';

export default function DateItem({
    format = 'YYYY-MM-DD',
    label,
    wrapClass,
    labelClass,
    inputClass,
    ...props
}: { format?: string } & FormItemProps) {
    const [cssId] = useState(nanoid());
    const { setFieldValue } = useFormikContext();
    const [{ value, onChange: _, ...field }] = useField(props);

    const onChange = useCallback(
        (date: Date | null) => setFieldValue(field.name, moment(date).format(format)),
        [field.name, format, setFieldValue]
    );

    return (
        <div className={wrapClass + ' form__field'}>
            <label htmlFor={cssId} className={labelClass + ' form-label'}>
                {label}
            </label>
            <RusDatePicker
                id={cssId}
                className={inputClass + ' form-input'}
                selected={new Date(moment(value).format(format))}
                onChange={onChange}
                {...field}
            />
        </div>
    );
}
