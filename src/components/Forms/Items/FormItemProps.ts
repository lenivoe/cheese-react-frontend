import { FieldHookConfig } from 'formik';

export interface StyleProps {
    wrapClass?: string;
    labelClass?: string;
    inputClass?: string;
}

export interface ExtraItemProps {
    label: string;
    onValueChange?: (name: string, value: string) => void;
}

type FormItemProps = FieldHookConfig<string> & StyleProps & ExtraItemProps;

export default FormItemProps;
