import React, { useCallback } from 'react';
import { useAsync } from 'react-async';
import { useParams } from 'react-router-dom';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import API from '../../../utils/API';
import Strain, { DATE_FORMAT } from '../../../models/strain/strain';
import { DateField, SelectField, TextField } from './Fields';
import PropertiesList from './PropertiesList';
import FormValues from './FormValues';

interface UrlParams {
    strainId?: string;
}

export default function StrainSavingForm() {
    API.strain.getAll().then((strains) => console.log('strains:', strains));

    const { strainId: strainIdStr } = useParams<UrlParams>();

    const fetchData = useCallback(async () => {
        const strainId = strainIdStr ? Number.parseInt(strainIdStr, 10) : null;
        return Promise.all([
            API.genus.getAll(),
            API.type.getAll(),
            strainId ? API.strain.get(strainId) : undefined,
        ]);
    }, [strainIdStr]);

    const { data, error, isPending } = useAsync(fetchData);

    const [genusList, typeList, strain] = data ?? [[], [], undefined];

    console.log('strain loading:', strain);

    return (
        <div className='strain-adding'>
            {isPending ? <p>Загрузка данных...</p> : null}
            {error ? <p>`Ошибка при получении данных: ${error.message}`</p> : null}

            <Formik<FormValues>
                enableReinitialize={true}
                initialValues={{
                    id: strain?.id,
                    genus: strain?.type?.genus,
                    type: strain?.type,
                    name: strain?.name ?? '',
                    dateReceiving: moment(strain?.dateReceiving).format(DATE_FORMAT),
                    collectionIndex: strain?.collectionIndex ?? '',
                    source: strain?.source ?? '',
                    obtainingMethod: strain?.obtainingMethod ?? '',
                    creator: strain?.creator,
                    dateAdded: moment(strain?.dateAdded).format(DATE_FORMAT),
                    properties: {
                        bio: strain?.properties.filter((prop) => !prop.isNote) ?? [],
                        note: strain?.properties.filter((prop) => prop.isNote) ?? [],
                    },
                }}
                validationSchema={() => {
                    const requiredMsg = 'обязательно';

                    return Yup.object({
                        genus: Yup.object().shape({
                            name: Yup.string()
                                .notOneOf([SelectField.UNSELECTED_VALUE], requiredMsg)
                                .required(requiredMsg),
                        }),
                        type: Yup.object().shape({
                            name: Yup.string()
                                .notOneOf([SelectField.UNSELECTED_VALUE], requiredMsg)
                                .required(requiredMsg),
                        }),
                        name: Yup.string().required(requiredMsg),
                        dateReceiving: Yup.date().required(requiredMsg),
                        collectionIndex: Yup.string().required(requiredMsg),
                        source: Yup.string().required(requiredMsg),
                        obtainingMethod: Yup.string().required(requiredMsg),
                        creator: Yup.string().notRequired(),
                        dateAdded: Yup.date().required(requiredMsg),
                    });
                }}
                onSubmit={async (values, _helpers) => {
                    const { genus: _, properties, ...rest } = values;
                    const strain: Strain = {
                        properties: [...properties.bio, ...properties.note],
                        ...rest,
                    };

                    console.log('input:', strain);
                    const returnedStrain = await API.strain.post(strain);
                    console.log('output:', returnedStrain);

                    // alert(JSON.stringify(values));
                }}
            >
                {({ values, setFieldValue, isSubmitting }) => {
                    // В случае, когда Род и Вид штамма созданы только что (не содержатся в базе), у них нет id.
                    // Тогда, если выбран Род без id, то надо вывести Вид без id
                    const curTypeList = typeList.filter(
                        ({ genus }) =>
                            (!genus.id && !values.genus?.id) ||
                            genus.id === values.genus?.id
                    );

                    const disabled = isPending || !!error || isSubmitting;

                    return (
                        <Form className='strain-form form--position-block-center'>
                            <fieldset disabled={disabled}>
                                <SelectField
                                    name='genus.name'
                                    label='Род'
                                    onValueChange={(_name, value) => {
                                        const genus = genusList.find(
                                            (genus) => genus.name === value
                                        );
                                        setFieldValue('genus', genus);
                                        setFieldValue('type', undefined);
                                    }}
                                >
                                    {genusList.map((genus) => (
                                        <option key={genus.id} value={genus.name}>
                                            {genus.name}
                                        </option>
                                    ))}
                                </SelectField>

                                <SelectField
                                    name='type.name'
                                    label='Вид'
                                    onValueChange={(_name, value) => {
                                        const type = curTypeList.find(
                                            (type) => type.name === value
                                        );
                                        setFieldValue('type', type);
                                    }}
                                >
                                    {curTypeList.map((type) => (
                                        <option key={type.id} value={type.name}>
                                            {type.name}
                                        </option>
                                    ))}
                                </SelectField>

                                {/* часть наименования */}
                                <TextField label='Исхродный индекс' name='name' />
                                {/* часть наименования */}
                                <DateField
                                    label='Дата получения'
                                    name='dateReceiving'
                                    disabled={disabled}
                                />
                                {/* каталожный индекс */}
                                <TextField
                                    label='Индекс штаммов'
                                    name='collectionIndex'
                                />
                                {/* происхождение */}
                                <TextField label='Происхождение' name='source' />
                                {/* способ получения */}
                                <TextField
                                    label='Способ получения'
                                    name='obtainingMethod'
                                />

                                <PropertiesList propType='bio' />
                                <PropertiesList propType='note' />

                                <div className='strain-adding__buttons form-buttons'>
                                    <button
                                        type='submit'
                                        className='form-buttons__submit-button form-button submit-button'
                                    >
                                        Добавить
                                    </button>
                                    <button
                                        type='button'
                                        className='form-buttons__cancel-button form-button cancel-button'
                                    >
                                        Отмена
                                    </button>
                                </div>
                            </fieldset>
                        </Form>
                    );
                }}
            </Formik>
        </div>
    );
}
