import React from 'react';
import { Form, Formik } from 'formik';
import moment from 'moment';
import { DATE_FORMAT } from '../../../models/ParamDataType';
import { DateField, SelectField, TextField } from './Fields';
import PropertiesList from './PropertiesList';
import StrainSavingFormValues from './StrainSavingFormValues';
import { useDownloadData, useUploadStrain } from './BackendDataHooks';
import validationSchema from './validationSchema';
import FormErrorMessage from '../Items/FormErrorMessage';

export default function StrainSavingForm() {
    const download = useDownloadData();
    const upload = useUploadStrain();

    const [genusList, typeList, strain] = download.data ?? [[], [], undefined];

    if (strain) {
        strain.properties.sort((p1, p2) => p1.id! - p2.id!);
        strain.properties.forEach((prop) => {
            prop.ungrouped?.sort((p1, p2) => p1.id! - p2.id!);
            prop.groups?.sort((g1, g2) => g1.groupId! - g2.groupId!);
            prop.groups?.forEach((group) =>
                group.parameters.sort((p1, p2) => p1.id! - p2.id!)
            );
        });
    }

    let initValues: StrainSavingFormValues;
    if (strain) {
        const { properties, ...rest } = strain;
        initValues = {
            ...rest,
            genus: strain.type.genus,
            properties: {
                bio: properties.filter((prop) => !prop.isNote) ?? [],
                note: properties.filter((prop) => prop.isNote) ?? [],
            },
        };
    } else {
        const today = moment().format(DATE_FORMAT);
        initValues = {
            name: '',
            dateReceiving: today,
            collectionIndex: '',
            source: '',
            obtainingMethod: '',
            dateAdded: today,
            properties: { bio: [], note: [] },
        };
    }

    return (
        <div className='strain-adding'>
            <FormErrorMessage download={download} upload={upload} />
            <Formik<StrainSavingFormValues>
                enableReinitialize={true}
                initialValues={initValues}
                validationSchema={validationSchema}
                onSubmit={({ genus: _, type, properties, ...rest }) => {
                    const strainData = {
                        type: type!,
                        properties: [...properties.bio, ...properties.note],
                        ...rest,
                    };
                    upload.run(strainData);
                }}
            >
                {({ values, setFieldValue }) => {
                    // В случае, когда Род и Вид штамма созданы только что (не содержатся в базе), у них нет id.
                    // Тогда, если выбран Род без id, то надо вывести Вид без id
                    const curTypeList = typeList.filter(({ genus }) => {
                        const curGenusId = values.genus?.id;
                        return (!genus.id && !curGenusId) || genus.id === curGenusId;
                    });

                    const disabled = !download.isFulfilled || upload.isPending;

                    return (
                        <Form className='strain-form form--position-block-center'>
                            <fieldset disabled={disabled}>
                                <div className='strain-form__general-info'>
                                    <div className='strain-form__base-field base-field'>
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
                                        <div className='base-field__buttons-block'>
                                            <a
                                                href='#iw-modal-1'
                                                className='iw-modal-btn base-field__add-button add-button'
                                            >
                                                +
                                            </a>
                                        </div>
                                    </div>

                                    <div className='strain-form__base-field base-field'>
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
                                        <div className='base-field__buttons-block'>
                                            <a
                                                href='#iw-modal-2'
                                                className='iw-modal-btn base-field__add-button add-button'
                                            >
                                                +
                                            </a>
                                        </div>
                                    </div>

                                    {/* часть наименования */}
                                    <TextField label='Исходный индекс' name='name' />
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
                                </div>

                                <PropertiesList propType='bio' />
                                <PropertiesList propType='note' />
                            </fieldset>
                            <div className='strain-adding__buttons form-buttons'>
                                <button
                                    type='submit'
                                    className='form-buttons__submit-button form-button submit-button add-button'
                                >
                                    Сохранить
                                </button>
                                <button
                                    type='button'
                                    className='form-buttons__cancel-button form-button cancel-button delete-button'
                                >
                                    Отмена
                                </button>
                            </div>
                        </Form>
                    );
                }}
            </Formik>
        </div>
    );
}
