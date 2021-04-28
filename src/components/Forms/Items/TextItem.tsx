import { nanoid } from 'nanoid/non-secure';
import { useState } from 'react';

export interface TextItemProps<STR extends string | undefined> {
    name: STR;
    label: string;
    value: string;
    onChange: (value: string, fieldName: STR) => void;
}

export default function TextItem<STR extends string | undefined>(
    props: TextItemProps<STR>
) {
    const [cssId] = useState(nanoid());

    return (
        <div className='strain-form__item form__field'>
            <label htmlFor={cssId} className='strain-form__label form-label'>
                {props.label}
            </label>
            <input
                name={props.name}
                value={props.value}
                onChange={(e) => props.onChange(e.target.value, e.target.name as STR)}
                id={cssId}
                type='text'
                className='strain-form__input form-input'
            />
        </div>
    );
}
