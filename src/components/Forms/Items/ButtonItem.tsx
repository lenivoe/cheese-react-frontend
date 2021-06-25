import React, { useCallback } from "react";

interface ButtonProps {
  name?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
  onClick?: (name?: string) => void;
  label: string;
  useDisabledClass?: boolean;
}

const ButtonItem = ({
  name,
  className,
  disabled,
  onClick,
  label,
  type = "button",
  useDisabledClass = true,
}: ButtonProps) => {
  const onClickCallback = useCallback(() => onClick?.(name), [onClick, name]);
  return (
    <button
      name={name}
      disabled={disabled}
      onClick={onClickCallback}
      type={type}
      className={`${className} ${
        useDisabledClass && disabled ? "disabled-block" : ""
      }`}
    >
      {label}
    </button>
  );
};

export default ButtonItem;
