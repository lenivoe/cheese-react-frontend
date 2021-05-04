import React, { useCallback } from 'react';
import { useAsync } from 'react-async';
import { useParams } from 'react-router-dom';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { getAllGenera, getAllStrainTypes, getStrain } from '../../utils/data_fetch';
import SelectItem from './Items/SelectItem';
import TextItem from './Items/TextItem';
import DateItem from './Items/DateItem';
import withStyle from './Items/WithStyle';

interface UrlParams {
    strainIdStr?: string;
}

const Text = withStyle(TextItem, 'strain-form');
const Date = withStyle(DateItem, 'strain-form');
const Select = withStyle(SelectItem, 'strain-form');

function TypeSelect(props: Parameters<typeof Select>[0]) {
    return <Select {...props} />;
}

export default function StrainSavingForm() {
    const { strainIdStr } = useParams<UrlParams>();

    const fetchData = useCallback(async () => {
        const strainId = strainIdStr ? Number.parseInt(strainIdStr, 10) : null;
        return strainId
            ? Promise.all([getAllGenera(), getAllStrainTypes(), getStrain(strainId)])
            : Promise.all([getAllGenera(), getAllStrainTypes()]);
    }, [strainIdStr]);

    const { data, error, isPending } = useAsync(fetchData);

    if (isPending) {
        return <p>Загрузка данных...</p>;
    }
    if (error) {
        return <p>`Ошибка при получении данных: ${error.message}`</p>;
    }

    const [genusList, typeList, strain] = data!;

    const bioProperties = strain?.properties.map((property) => !property.isNote) ?? [];
    const notes = strain?.properties.map((property) => property.isNote) ?? [];

    return (
        <Formik
            initialValues={{
                genus: strain?.type?.genus.id ?? '',
                type: strain?.type?.id ?? '',
                name: strain?.name ?? '',
                dateReceiving: strain?.dateReceiving ?? '',
                collectionIndex: strain?.collectionIndex ?? '',
                source: strain?.source ?? '',
                obtainingMethod: strain?.obtainingMethod ?? '',
                bioProperties: bioProperties,
                notes: notes,
            }}
            validationSchema={Yup.object({
                genus: Yup.string().required('обязательное поле'),
                type: Yup.string().required('обязательное поле'),
                name: Yup.string().required('обязательное поле'),
                dateReceiving: Yup.date().required('обязательное поле'),
                collectionIndex: Yup.string().required('обязательное поле'),
                source: Yup.string().required('обязательное поле'),
                obtainingMethod: Yup.string().required('обязательное поле'),
            })}
            onSubmit={(values, _helpers) => {
                alert(JSON.stringify(values));
            }}
        >
            <div className='strain-adding'>
                <Form className='strain-form form--position-block-center'>
                    <Select name='genus' label='Род'>
                        {genusList.map((genus) => {
                            console.log(genus);
                            return (
                                <option key={genus.id} value={genus.id}>
                                    {genus.name}
                                </option>
                            );
                        })}
                    </Select>

                    <TypeSelect name='type' label='Вид'>
                        {typeList.map((type) => (
                            <option key={type.id} value={type.id}>
                                {type.name}
                            </option>
                        ))}
                    </TypeSelect>

                    {/* часть наименования */}
                    <Text label='Исхродный индекс' name='name' />
                    {/* часть наименования */}
                    <Date label='Дата получения' name='dateReceiving' />
                    {/* каталожный индекс */}
                    <Text label='Индекс штаммов' name='collectionIndex' />
                    {/* происхождение */}
                    <Text label='Происхождение' name='source' />
                    {/* способ получения */}
                    <Text label='Способ получения' name='obtainingMethod' />

                    {/** properties */}
                    {/* <div className='strain-form__properties properties'>
                        {strain.properties.map((property) => (
                            <PropertyItem
                                key={property.propertyId}
                                title={property.propertyName}
                            >
                                {property.ungroupedParameters?.map((param) => (
                                    <FieldFromParam
                                        key={param.id}
                                        param={param}
                                        onChange={(value, _) => {
                                            param.value = value;
                                            this.forceUpdate();
                                        }}
                                    />
                                ))}

                                {property.groups?.map((group) => (
                                    <div
                                        key={group.groupId}
                                        style={{ border: '1px dashed' }}
                                    >
                                        {group.parameters.map((param) => (
                                            <FieldFromParam
                                                key={param.id}
                                                param={param}
                                                onChange={(value, _) => {
                                                    param.value = value;
                                                    this.forceUpdate();
                                                }}
                                            />
                                        ))}
                                    </div>
                                ))}
                            </PropertyItem>
                        ))}
                    </div> */}

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
                </Form>
            </div>
        </Formik>
    );
}
