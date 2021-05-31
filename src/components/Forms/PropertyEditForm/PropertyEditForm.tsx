import React from 'react';
import { Formik, FormikProps } from 'formik';
import { useAsync } from 'react-async';
import API from '../../../utils/API';
import PropertyEditFormValues from './PropertyEditFormValues';
import FormalProperty from '../../../models/Property/FormalProperty';
import FormErrorMessage from '../Items/FormErrorMessage';
import PropertyEditBlock from './Blocks/PropertyEditBlock';
import PropertySavingBlock from './Blocks/PropertySavingBlock';
import ParamSavingBlock from './Blocks/ParamSavingBlock';
import MakeGroupFrom from './Blocks/MakeGroupFrom';

const downloadPropListAsync = async () => API.property.getAllWithParameters();
const uploadPropAsync = async ([property]: FormalProperty[]) =>
    API.property.post(property);

export default function PropertyEditForm() {
    const download = useAsync(downloadPropListAsync);
    const upload = useAsync({ deferFn: uploadPropAsync });

    return (
        <>
            <FormErrorMessage download={download} upload={upload} />

            <Formik<PropertyEditFormValues>
                enableReinitialize={true}
                initialValues={{
                    propertyList: download.data,
                    state: 'EDIT_GROUPS',
                }}
                // validationSchema={() => {}}
                onSubmit={async (values) => {
                    upload.run(undefined);
                }}
            >
                {renderPropertyEditForm}
            </Formik>
        </>
    );
}

const renderPropertyEditForm = (props: FormikProps<PropertyEditFormValues>) => {
    const { state, property, parameter } = props.values;
    const needSaveProp = state === 'ADD_PROP' || state === 'EDIT_PROP';
    const needSaveParam = state === 'ADD_PARAM' || state === 'EDIT_PARAM';
    const needEditGroups = state === 'EDIT_GROUPS';

    return (
        <div className='property-edit'>
            <PropertyEditBlock {...props} />
            <div className='property-edit__form-block'>
                <PropertySavingBlock
                    id={property?.id}
                    needEdit={state === 'EDIT_PROP'}
                    visible={needSaveProp}
                />
                <ParamSavingBlock
                    id={parameter?.id}
                    needEdit={state === 'EDIT_PARAM'}
                    visible={needSaveParam}
                />
            </div>
            {needEditGroups && <MakeGroupFrom />}
        </div>
    );
};
