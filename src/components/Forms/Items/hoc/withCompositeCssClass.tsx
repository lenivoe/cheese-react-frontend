import React from 'react';
import { CompositeWithCssClass } from '../FormItemProps';

export default function withCompositeCssClass<P extends CompositeWithCssClass>(
    Component: React.ComponentType<P>,
    classNamePrefix: string
) {
    const wrap = `${classNamePrefix}__item`;
    const label = `${classNamePrefix}__label`;
    const input = `${classNamePrefix}__input`;

    return (props: P) => (
        <Component
            {...props}
            className={`${wrap} ${props.className}`}
            labelClassName={`${label} ${props.labelClassName}`}
            inputClassName={`${input} ${props.inputClassName}`}
        />
    );
}
