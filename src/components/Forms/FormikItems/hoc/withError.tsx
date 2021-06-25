import React from 'react';
import { ErrorMessage } from 'formik';

const withError = <P extends { name: string }>(
    Component: React.ComponentType<P>,
    errClass = 'field-error',
    htmlTag = 'div'
) => (props: P) => (
    <>
        <Component {...props} />
        <ErrorMessage name={props.name} component={htmlTag} className={errClass} />
    </>
);

export default withError;
