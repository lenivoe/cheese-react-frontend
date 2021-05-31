import React from 'react';
import { WithCssClass } from '../FormItemProps';

export default function withCssClass<P extends WithCssClass>(
    Component: React.ComponentType<P>,
    className: string | ((str: string) => string)
) {
    if (typeof className === 'string') {
        return (props: P) => (
            <Component {...props} className={`${className} ${props.className}`} />
        );
    }
    return (props: P) => (
        <Component {...props} className={props.className && className(props.className)} />
    );
}
