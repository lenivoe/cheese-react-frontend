import React, { useCallback } from 'react';
import { useAsync } from 'react-async';
import { useParams } from 'react-router-dom';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import { getAllGenera, getAllStrainTypes, getStrain } from '../../../utils/data_fetch';
import { DATE_FORMAT } from '../../../models/strain/strain';
import { DateField, SelectField, TextField } from './Fields';
import PropertiesList from './PropertiesList';
import { delay } from '../../../utils/utils';
import FormValues from './FormValues';

interface UrlParams {
    strainId?: string;
}

export default function StrainSavingForm() {
    const { strainId: strainIdStr } = useParams<UrlParams>();

    const fetchData = useCallback(async () => {
        const strainId = strainIdStr ? Number.parseInt(strainIdStr, 10) : null;
        return Promise.all([
            getAllGenera(),
            getAllStrainTypes(),
            strainId ? getStrain(strainId) : undefined,
            delay(5000),
        ]);
    }, [strainIdStr]);

    const { data, error, isPending } = useAsync(fetchData);
    const disabled = isPending || !!error;

    const [genusList, typeList, strain] = data ?? [[], [], undefined, null];

    return (
        <div className='strain-adding'>
            {isPending ? <p>Загрузка данных...</p> : null}
            {error ? <p>`Ошибка при получении данных: ${error.message}`</p> : null}

            <Formik<FormValues>
                enableReinitialize={true}
                initialValues={{
                    genus: strain?.type?.genus,
                    type: strain?.type,
                    name: strain?.name ?? '',
                    dateReceiving: moment(strain?.dateReceiving).format(DATE_FORMAT),
                    collectionIndex: strain?.collectionIndex ?? '',
                    source: strain?.source ?? '',
                    obtainingMethod: strain?.obtainingMethod ?? '',
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
                    });
                }}
                onSubmit={(values, _helpers) => {
                    console.log(values);
                    alert(JSON.stringify(values));
                }}
            >
                {({ values, setFieldValue }) => {
                    // В случае, когда Род и Вид штамма созданы только что (не содержатся в базе), у них нет id.
                    // Тогда, если выбран Род без id, то надо вывести Вид без id
                    const curTypeList = typeList.filter(
                        ({ genus }) =>
                            (!genus.id && !values.genus?.id) ||
                            genus.id === values.genus?.id
                    );

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
