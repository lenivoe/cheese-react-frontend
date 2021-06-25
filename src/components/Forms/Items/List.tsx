import assert from "assert";
import React, { useCallback } from "react";
import classNames from "classnames";

export interface ListProps<T> {
  value?: T;
  valueList: T[];
  onSelect?: (value: T) => void;
  children: React.ReactNode;
  className?: string;
}

export default function List<T>(props: ListProps<T>) {
  assert(React.Children.count(props.children) === props.valueList.length);

  const { value, valueList, onSelect, className, children } = props;
  return (
    <div className={className}>
      {React.Children.map(children, (child, i) => (
        <ListItem
          value={valueList[i]}
          selected={valueList[i] === value}
          onClick={onSelect}
        >
          {child}
        </ListItem>
      ))}
    </div>
  );
}

interface ListItemProps<T> {
  value: T;
  disabled?: boolean;
  selected?: boolean;
  onClick?: (value: T) => void;
  children?: React.ReactNode;
}

function ListItem<T>(props: ListItemProps<T>) {
  const { value, selected, disabled, onClick, children } = props;
  const className = classNames("list-item", { active: selected });
  const action = useCallback(
    () => disabled || onClick?.(value),
    [value, disabled, onClick]
  );

  return (
    <div className={className} onClick={action}>
      {children}
    </div>
  );
}
