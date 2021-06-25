import { FieldHookConfig } from "formik";

export interface WithCssClass {
  className?: string;
}

export interface CompositeWithCssClass extends WithCssClass {
  labelClassName?: string;
  inputClassName?: string;
}

export interface ExtraItemProps {
  label: string;
  onValueChange?: (name: string, value: string) => void;
}

type FormItemProps = FieldHookConfig<string> &
  CompositeWithCssClass &
  ExtraItemProps;

export default FormItemProps;
