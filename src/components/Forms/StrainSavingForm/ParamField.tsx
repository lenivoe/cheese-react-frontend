import React from 'react';
import { FacticalParameter } from '../../../models/strain/strain';
import { TextField, SelectField, DateField } from './Fields';

export interface ParamFieldProps {
    name: string;
    param: FacticalParameter;
}

export default function ParamField({ name, param }: ParamFieldProps) {
    let Component = TextField;
    switch (param.formalParameter.parameterDataType.name) {
        case 'Date':
        case 'Time':
            Component = DateField;
            break;
        case 'Item':
            Component = SelectField;
            break;
    }

    return <Component label={param.formalParameter.name} name={`${name}.value`} />;
}
