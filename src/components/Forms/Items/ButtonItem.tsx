import React from 'react';

interface ButtonProps {
    name?: string;
    type?: 'button' | 'submit';
    disabled?: boolean;
    className?: string;
    onClick?: (name: string | undefined) => void;
    label: string;
}

const ButtonItem = ({
    name,
    className,
    disabled,
    onClick,
    label,
    type = 'button',
}: ButtonProps) => (
    <button
        name={name}
        disabled={disabled}
        onClick={() => onClick?.(name)}
        type={type}
        className={`${className} ${disabled ? 'disabled-block' : ''}`}
    >
        {label}
    </button>
);

export default ButtonItem;
