import React from 'react';
import { Form, Formik, FormikProps } from 'formik';
import * as Yup from 'yup';
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
const removePropAsync = async ([id]: number[]) => API.property.delete(id);

export default function PropertyEditForm() {
    const download = useAsync(downloadPropListAsync);
    const uploadProp = useAsync({ deferFn: uploadPropAsync });
    const removeProp = useAsync({ deferFn: removePropAsync });

    return (
        <div>
            <FormErrorMessage download={download} upload={uploadProp} />

            <Formik<PropertyEditFormValues>
                enableReinitialize={true}
                initialValues={{
                    propInfo: { removing: {}, selected: {} },
                    paramInfo: { removing: {}, selected: {} },
                    propList: download.data,
                    state: 'EDIT_GROUPS',
                }}
                validationSchema={() =>
                    Yup.object({
                        // state: Yup.string().required('надо'),
                    })
                }
                onSubmit={(values) => {
                    console.log('values', values);

                    const { propInfo, paramInfo } = values;
                    for (const info of [propInfo, paramInfo]) {
                        if (info.saving) {
                            uploadProp.run(info.saving);
                            info.saving = undefined;
                        }
                        if (info.removing.id) {
                            removeProp.run(info.removing.id);
                            info.removing = {};
                        }
                    }
                }}
            >
                {FormInner}
            </Formik>
        </div>
    );
}

const FormInner = (props: FormikProps<PropertyEditFormValues>) => {
    const { state } = props.values;
    const isPropSave = state === 'ADD_PROP' || state === 'EDIT_PROP';
    const isParamSave = state === 'ADD_PARAM' || state === 'EDIT_PARAM';
    const isGroupEdit = state === 'EDIT_GROUPS';

    return (
        <Form>
            <div className='property-edit'>
                <PropertyEditBlock {...props} />
                <div className='property-edit__form-block'>
                    <PropertySavingBlock
                        id={undefined && 'property?.id'}
                        needEdit={state === 'EDIT_PROP'}
                        visible={isPropSave}
                    />
                    <ParamSavingBlock
                        id={undefined && 'parameter?.id'}
                        needEdit={state === 'EDIT_PARAM'}
                        visible={isParamSave}
                    />
                </div>
                <MakeGroupFrom visible={isGroupEdit} />
            </div>
        </Form>
    );
};
