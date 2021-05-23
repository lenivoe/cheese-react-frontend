import React, { useCallback } from 'react';
import { useField, useFormikContext } from 'formik';

interface ListProps {
    name: string;
    valueList: string[];
    children?: React.ReactNode;
    className?: string;
    onSelect?: (name: string, value: string) => void;
}

export default function List(props: ListProps) {
    const { name, valueList, className, children, onSelect } = props;
    const [{ value }] = useField(name);

    return (
        <div className={className}>
            {React.Children.map(children, (child, i) => (
                <ListChild
                    name={name}
                    value={valueList[i]}
                    selected={valueList[i] === value}
                    onClick={onSelect}
                >
                    {child}
                </ListChild>
            ))}
        </div>
    );
}

interface ListChildProps {
    name: string;
    value: string;
    disabled?: boolean;
    selected?: boolean;
    onClick?: (name: string, value: string) => void;
    children?: React.ReactNode;
}

function ListChild(props: ListChildProps) {
    const { name, value, selected, disabled, onClick, children } = props;
    const { setFieldValue } = useFormikContext();

    const className = `list-item ${selected ? 'active' : ''}`;
    const action = useCallback(
        () => disabled || (onClick ?? setFieldValue)(name, value),
        [name, value, disabled, onClick, setFieldValue]
    );

    return (
        <div className={className} onClick={action}>
            {children}
        </div>
    );
}
