import React, { useEffect, useState } from 'react';
import { Field, Form, Formik } from 'formik';
import moment from 'moment';
import { DATE_FORMAT } from '../../../models/ParamDataType';
import { DateField, SelectField, TextField } from './Fields';
import PropertiesList from './PropertiesList';
import StrainSavingFormValues from './StrainSavingFormValues';
import { useDownloadData, useUploadStrain } from './BackendDataHooks';
import validationSchema from './validationSchema';
import FormErrorMessage from '../Items/FormErrorMessage';
import {
    setActiveMenuItemByKey,
    MenuKey,
    setTitleByActiveItem,
} from '../../../store/formFrame/formFrameSlice';
import { useAppDispatch } from '../../../store/hooks';
import { useHistory } from 'react-router-dom';
import FacticalProperty from '../../../models/Property/FacticalProperty';

export default function StrainSavingForm() {
    const [extraProps, setExtraProps] = useState([] as FacticalProperty[]);

    const history = useHistory();

    const download = useDownloadData();
    const upload = useUploadStrain();

    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(setActiveMenuItemByKey(MenuKey.STRAIN_SAVE));
        dispatch(setTitleByActiveItem());
    });

    const defaultData = [[], [], [], undefined] as NonNullable<
        typeof download.data
    >;
    const [propList, genusList, typeList, strain] =
        download.data ?? defaultData;

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
            property: {
                selected: {
                    id:
                        propList.length > 0
                            ? propList[0].id.toString()
                            : undefined,
                },
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
            property: {
                selected: {
                    id:
                        propList.length > 0
                            ? propList[0].id.toString()
                            : undefined,
                },
            },
        };
    }

    initValues.properties.bio = [...initValues.properties.bio, ...extraProps];

    return (
        <div className='strain-adding'>
            <FormErrorMessage
                loading={download.isPending || upload.isPending}
                error={download.error ?? upload.error}
            />
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
                        return (
                            (!genus.id && !curGenusId) ||
                            genus.id === curGenusId
                        );
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
                                                    (genus) =>
                                                        genus.name === value
                                                );
                                                setFieldValue('genus', genus);
                                                setFieldValue(
                                                    'type',
                                                    undefined
                                                );
                                            }}
                                        >
                                            {genusList.map((genus) => (
                                                <option
                                                    key={genus.id}
                                                    value={genus.name}
                                                >
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
                                                    (type) =>
                                                        type.name === value
                                                );
                                                setFieldValue('type', type);
                                            }}
                                        >
                                            {curTypeList.map((type) => (
                                                <option
                                                    key={type.id}
                                                    value={type.name}
                                                >
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
                                    <TextField
                                        label='Исходный индекс'
                                        name='name'
                                    />
                                    {/* часть наименования */}
                                    <DateField
                                        label='Дата получения'
                                        name='dateReceiving'
                                        disabled={disabled}
                                    />
                                    {/* каталожный индекс */}
                                    <TextField
                                        label='Каталожный номер СКМ'
                                        name='collectionIndex'
                                    />
                                    {/* происхождение */}
                                    <TextField
                                        label='Происхождение'
                                        name='source'
                                    />
                                    {/* способ получения */}
                                    <TextField
                                        label='Способ получения'
                                        name='obtainingMethod'
                                    />
                                </div>

                                <PropertiesList propType='bio' />
                                <PropertiesList propType='note' />

                                {/* добавление свойств */}
                                <div className='add-property-block'>
                                    <label
                                        className='add-property-block__label'
                                        htmlFor='add-property-block__select'
                                    >
                                        Все свойства
                                    </label>
                                    <Field
                                        as='select'
                                        className='add-property-block__select'
                                        name='property.selected.id'
                                        id='add-property-block__select'
                                    >
                                        {propList.map(({ id, name }) => {
                                            return (
                                                <option key={id} value={id}>
                                                    {name}
                                                </option>
                                            );
                                        })}
                                    </Field>
                                    <button
                                        type='button'
                                        className='add-property-block__button add-button'
                                        onClick={() => {
                                            const idStr =
                                                values.property.selected.id;
                                            if (idStr) {
                                                const id = parseInt(idStr);
                                                const prop = propList.find(
                                                    (prop) => prop.id === id
                                                )!;
                                                const paramList = [
                                                    ...(prop.ungrouped ?? []),
                                                    ...(
                                                        prop.groups ?? []
                                                    ).flatMap(
                                                        (group) =>
                                                            group.parameters
                                                    ),
                                                ];
                                                const ungrouped = paramList.map(
                                                    (param) => ({
                                                        value: '',
                                                        formalParameter: param,
                                                    })
                                                );
                                                const facticalProp: FacticalProperty =
                                                    {
                                                        ...prop,
                                                        ungrouped,
                                                        groups: undefined,
                                                    };
                                                setExtraProps([
                                                    ...extraProps,
                                                    facticalProp,
                                                ]);
                                                // values.properties.bio.push(facticalProp);
                                            }
                                        }}
                                    >
                                        добавить
                                    </button>
                                </div>
                                {/* без логиги */}

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
                                        onClick={() => history.goBack()}
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
