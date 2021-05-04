import { FieldHookConfig } from 'formik';

export interface StyleProps {
    wrapClass?: string;
    labelClass?: string;
    inputClass?: string;
}

type FormItemProps = FieldHookConfig<string> &
    StyleProps & {
        label: string;
    };

export default FormItemProps;
