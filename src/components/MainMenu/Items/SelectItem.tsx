import { nanoid } from 'nanoid/non-secure';
import { useState } from 'react';

interface Props {
    name?: string;
    label: string;
    items: { text: string; value: string }[];
    activeItem?: string;
    onSelectChange: (sender: HTMLSelectElement) => void;
}

export default function SelectItem(props: Props) {
    const [cssId] = useState(nanoid());

    return (
        <div className='strain-form__item form__field'>
            <label htmlFor={cssId} className='strain-form__label form-label'>
                {props.label}
            </label>
            <select
                name={props.name}
                value={props.activeItem}
                onChange={(e) => props.onSelectChange(e.target)}
                id={cssId}
                className='strain-form__input form-input'
            >
                {props.items.map(({ text, value }) => (
                    <option key={value} value={value}>
                        {text}
                    </option>
                ))}
            </select>
        </div>
    );
}
