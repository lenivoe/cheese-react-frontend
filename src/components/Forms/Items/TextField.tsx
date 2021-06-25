import { nanoid } from 'nanoid/non-secure';
import React, { useCallback, useState } from 'react';

interface Props {
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
  disabled?: boolean;
  name?: string;
  label: string;
  value?: string;
  onChange?: (value: string, name?: string) => void;
}

export default function TextField({
  className,
  labelClassName,
  inputClassName,
  disabled,
  name,
  label,
  value,
  onChange,
}: Props) {
  const [cssId] = useState(nanoid);

  const onTextChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => onChange?.(e.target.value, e.target.name),
    [onChange]
  );

  return (
    <div className={className}>
      <label htmlFor={cssId} className={labelClassName}>
        {label}
      </label>
      <input
        id={cssId}
        value={value}
        name={name}
        className={inputClassName}
        disabled={disabled}
        onChange={onTextChange}
      />
    </div>
  );
}
