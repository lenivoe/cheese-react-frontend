import React from 'react';
import { DATE_FORMAT } from '../../../models/ParamDataType';
import DateItem from '../Items/DateItem';
import SelectItem from '../Items/SelectItem';
import TextItem from '../Items/TextItem';
import withCompositeCssClass from '../Items/hoc/withCompositeCssClass';
import withError from '../Items/hoc/withError';

export const TextField = withError(withCompositeCssClass(TextItem, 'strain-form'), 'form-error');

const FormattedDate: typeof DateItem = (props) => (
    <DateItem {...props} format={DATE_FORMAT} />
);

export const DateField = withError(withCompositeCssClass(FormattedDate, 'strain-form'), 'form-error');

export const SelectField = withError(
    withCompositeCssClass(SelectItem, 'strain-form'),
    'form-error'
) as typeof SelectItem;
SelectField.UNSELECTED_VALUE = SelectItem.UNSELECTED_VALUE;
