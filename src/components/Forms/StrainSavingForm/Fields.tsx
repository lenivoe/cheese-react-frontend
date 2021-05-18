import React from 'react';
import { DATE_FORMAT } from '../../../models/ParamDataType';
import DateItem from '../Items/DateItem';
import SelectItem from '../Items/SelectItem';
import TextItem from '../Items/TextItem';
import withError from '../Items/hoc/WithError';
import withStyle from '../Items/hoc/WithStyle';

export const TextField = withError(withStyle(TextItem, 'strain-form'), 'form-error');

const FormattedDate: typeof DateItem = (props) => (
    <DateItem {...props} format={DATE_FORMAT} />
);

export const DateField = withError(withStyle(FormattedDate, 'strain-form'), 'form-error');

export const SelectField = withError(
    withStyle(SelectItem, 'strain-form'),
    'form-error'
) as typeof SelectItem;
SelectField.UNSELECTED_VALUE = SelectItem.UNSELECTED_VALUE;
