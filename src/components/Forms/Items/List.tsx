import React, { useCallback } from 'react';
import assert from 'assert';

export interface ListProps {
    name?: string;
    value?: string;
    valueList: string[];
    children: React.ReactNode;
    className?: string;
    onSelect?: (name: string | undefined, value: string) => void;
}

export default function List(props: ListProps) {
    assert(React.Children.count(props.children) === props.valueList.length);

    const { name, value, valueList, className, children, onSelect } = props;

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
    name?: string;
    value: string;
    disabled?: boolean;
    selected?: boolean;
    onClick?: (name: string | undefined, value: string) => void;
    children?: React.ReactNode;
}

function ListChild(props: ListChildProps) {
    const { name, value, selected, disabled, onClick, children } = props;

    const className = `list-item ${selected ? 'active' : ''}`;
    const action = useCallback(
        () => disabled || onClick?.(name, value),
        [name, value, disabled, onClick]
    );

    return (
        <div className={className} onClick={action}>
            {children}
        </div>
    );
}
