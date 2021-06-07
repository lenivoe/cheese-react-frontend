import React from 'react';
import { Formik, FormikProps } from 'formik';
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
import FormalParameter from '../../../models/FormalParameter';

async function downloadPropListAsync() {
    const allProperty = await API.property.getAllWithParameters();
    const paramIdList = allProperty.flatMap((prop) => {
        const paramList = [
            ...(prop.ungrouped ?? []),
            ...(prop.groups ?? []).flatMap((group) => group.parameters),
        ];
        return paramList.map((param) => param.id!);
    });

    const isUsingList = await API.formalParameter.isListUsing(paramIdList);

    const addUsingInfo = (param: FormalParameter) => ({
        ...param,
        isUsing: isUsingList[param.id!],
    });

    const propList = allProperty.map((prop) => {
        const ungrouped = prop.ungrouped?.map(addUsingInfo);
        const groups = prop.groups?.map(({ parameters, ...rest }) => ({
            ...rest,
            parameters: parameters.map(addUsingInfo),
        }));

        const isUsing =
            !!ungrouped?.find((param) => param.isUsing) ||
            !!groups?.find((group) => !!group.parameters.find((param) => param.isUsing));

        return { ...prop, ungrouped, groups, isUsing };
    });

    return propList;
}
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
                    console.log('values', JSON.parse(JSON.stringify(values)));

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
        <div className='property-edit'>
            <PropertyEditBlock {...props} />
            <div className='property-edit__form-block'>
                <PropertySavingBlock
                    {...props}
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
    );
};
