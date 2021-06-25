import React from 'react';
import { DATE_FORMAT } from '../../../models/ParamDataType';
import DateItem from '../FormikItems/DateItem';
import SelectItem from '../FormikItems/SelectItem';
import TextItem from '../FormikItems/TextItem';
import withCompositeCssClass from '../FormikItems/hoc/withCompositeCssClass';
import withError from '../FormikItems/hoc/withError';

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
