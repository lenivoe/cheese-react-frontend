import React, { useState } from 'react';
import { Formik } from 'formik';
import { useAsync } from 'react-async';
import FormalProperty from '../../../models/Property/FormalProperty';
import FormalParameter from '../../../models/FormalParameter';
import API from '../../../utils/API';
import PropOrParamList from './PropOrParamList';

async function fetchProperties() {
    return API.property.getAllWithParameters();
}

interface FormValues {
    property?: FormalProperty;
    parameter?: FormalParameter;
    propertyList?: FormalProperty[];
}

export default function PropertyEditForm() {
    const asyncResults = useAsync(fetchProperties);
    const { data: propertyList, error: downloadError, isPending } = asyncResults;
    const [uploadError, setUploadError] = useState<Error>();

    return (
        <>
            {isPending && <p>Загрузка данных...</p>}
            {downloadError && <p>Ошибка при получении данных: {downloadError.message}</p>}
            {uploadError && <p>Ошибка при отправке данных: {uploadError.message}</p>}

            <Formik<FormValues>
                enableReinitialize={true}
                initialValues={{
                    propertyList,
                }}
                // validationSchema={() => {}}
                onSubmit={async (values) => {
                    setUploadError(undefined);
                }}
            >
                {({ values, setFieldValue, isSubmitting }) => {
                    if (!values.propertyList) return undefined;

                    return (
                        <div className='property-edit'>
                            <div className='property-edit__info-block info-block'>
                                <PropOrParamList
                                    title='Свойства'
                                    cssPrefix='properties'
                                    name='property.id'
                                    itemList={values.propertyList}
                                />
                                <PropOrParamList
                                    title='Параметры'
                                    cssPrefix='parameters'
                                    name='parameter.id'
                                    itemList={[
                                        ...(values.property?.ungrouped ?? []),
                                        ...(values.property?.groups ?? []).flatMap(
                                            (group) => group.parameters
                                        ),
                                    ]}
                                />

                                <div className='property-edit__property-info property-info'></div>

                                <div className='property-edit__form-menu form-menu'>
                                    <button className='form-menu__edit-groups-button form-menu__button active'>
                                        Группы параметров
                                    </button>

                                    <div className='form-menu__add-buttons form-menu__buttons-block'>
                                        <button className='form-menu__add-property-button form-menu__button'>
                                            Добавить свойство
                                        </button>
                                        <button className='form-menu__add-parameter-button form-menu__button'>
                                            Добавить параметр
                                        </button>
                                    </div>

                                    <div className='form-menu__edit-buttons form-menu__buttons-block'>
                                        <button className='form-menu__edit-property-button form-menu__button disabled-block'>
                                            Изменить свойство
                                        </button>
                                        <button className='form-menu__edit-parameter-button form-menu__button'>
                                            Изменить параметр
                                        </button>
                                    </div>

                                    <div className='form-menu__delete-buttons form-menu__buttons-block'>
                                        <button className='form-menu__delete-property-button form-menu__button'>
                                            Удалить свойство
                                        </button>
                                        <button className='form-menu__delete-parameter-button form-menu__button'>
                                            Удалить параметр
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <FormBlock />
                            <MakeGroupFrom />
                        </div>
                    );
                }}
            </Formik>
        </>
    );
}

function FormBlock() {
    return (
        <div className='property-edit__form-block'>
            <div className='form-block add-property-form hidden-block'>
                <div className='form-block__title'>Добавить свойство</div>
                <form action='' className='form form--flex'>
                    <div className='form__fields'>
                        <div className='form__field'>
                            <label className='form-label' htmlFor='property_name'>
                                Наименование
                            </label>
                            <input
                                className='form-input'
                                id='property_name'
                                type='text'
                                name='property_name'
                            />
                        </div>
                    </div>
                    <button className='form-button' type='submit'>
                        Сохранить
                    </button>
                </form>
            </div>

            <div className='form-block add-parameter-form hidden-block'>
                <div className='form-block__title'>Добавить параметр</div>
                <form action='' className='form form--flex'>
                    <div className='form__fields'>
                        <div className='form-block__item form__field'>
                            <label
                                className='form-block__label form-label'
                                htmlFor='parameter_name'
                            >
                                Наименование
                            </label>
                            <input
                                className='form-block__input form-input'
                                id='parameter_name'
                                type='text'
                                name='parameter_name'
                            />
                        </div>
                        <div className='form-block__item form__field'>
                            <label
                                className='form-block__label form-label'
                                htmlFor='parameter_type'
                            >
                                Тип данных
                            </label>
                            <select
                                className='form-block__input form-input'
                                name='parameter_type'
                                id='parameter_type'
                            >
                                <option value='1'>1</option>
                                <option value='2'>2</option>
                                <option value='3'>3</option>
                            </select>
                        </div>
                    </div>
                    <button className='form-button' type='submit'>
                        Сохранить
                    </button>
                </form>
            </div>

            <div className='form-block edit-property-form hidden-block'>
                <div className='form-block__title'>Изменить свойство</div>
                <form action='' className='form form--flex'>
                    <div className='form__fields'>
                        <div className='form__field'>
                            <label className='form-label' htmlFor='new_property_name'>
                                Наименование
                            </label>
                            <input
                                className='form-input'
                                id='new_property_name'
                                type='text'
                                name='property_name'
                            />
                        </div>
                    </div>
                    <button className='form-button' type='submit'>
                        Сохранить
                    </button>
                </form>
            </div>

            <div className='form-block edit-parameter-form hidden-block'>
                <div className='form-block__title'>Изменить параметр</div>
                <form action='' className='form form--flex'>
                    <div className='form__fields'>
                        <div className='form-block__item form__field'>
                            <label
                                className='form-block__label form-label'
                                htmlFor='new_parameter_name'
                            >
                                Наименование
                            </label>
                            <input
                                className='form-block__input form-input'
                                id='new_parameter_name'
                                type='text'
                                name='parameter_name'
                            />
                        </div>
                        <div className='form-block__item form__field'>
                            <label
                                className='form-block__label form-label'
                                htmlFor='new_parameter_type'
                            >
                                Тип данных
                            </label>
                            <select
                                className='form-block__input form-input'
                                name='parameter_type'
                                id='new_parameter_type'
                            >
                                <option value='1'>1</option>
                                <option value='1'>1</option>
                                <option value='1'>1</option>
                            </select>
                        </div>
                    </div>
                    <button className='form-button' type='submit'>
                        Сохранить
                    </button>
                </form>
            </div>
        </div>
    );
}

function MakeGroupFrom() {
    return (
        <div className='make-group-form'>
            <div className='make-group-form__top'>
                <div className='make-group-form__title'>Группы параметров</div>
                <button className='make-group-form__add-button add-button'>+</button>
            </div>
            <div className='groups-list'>
                <div className='groups-list__group group'>
                    <div className='group-parameters'>
                        <div className='group-parameters__item parameter-item list-item'>
                            <span>свойство 1123123212 23213 13132</span>
                            <div className='parameter-item__buttons'>
                                <button className='parameter-item__delete-button delete-button'>
                                    -
                                </button>
                            </div>
                        </div>
                        <div className='group-parameters__item list-item'>
                            <span>свойство 2</span>
                            <div className='parameter-item__buttons'>
                                <button className='parameter-item__delete-button delete-button'>
                                    -
                                </button>
                            </div>
                        </div>
                        <div className='group-parameters__item list-item '>
                            <span>свойство 3</span>
                            <div className='parameter-item__buttons'>
                                <button className='parameter-item__delete-button delete-button'>
                                    -
                                </button>
                            </div>
                        </div>
                        <div className='group-parameters__item list-item'>
                            <span>свойство 4</span>
                            <div className='parameter-item__buttons'>
                                <button className='parameter-item__delete-button delete-button'>
                                    -
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='group__buttons'>
                        <button className='group__add-button group-button add-button'>
                            добавить
                        </button>
                        <button className='group__delete-button group-button delete-button'>
                            удалить
                        </button>
                    </div>
                </div>
                <div className='groups-list__group group'>
                    <div className='group-parameters'>
                        <div className='group-parameters__item parameter-item list-item'>
                            <span>свойство 1123123212 23213 13132</span>
                            <div className='parameter-item__buttons'>
                                <button className='parameter-item__delete-button delete-button'>
                                    -
                                </button>
                            </div>
                        </div>
                        <div className='group-parameters__item list-item'>
                            <span>свойство 2</span>
                            <div className='parameter-item__buttons'>
                                <button className='parameter-item__delete-button delete-button'>
                                    -
                                </button>
                            </div>
                        </div>
                        <div className='group-parameters__item list-item '>
                            <span>свойство 3</span>
                            <div className='parameter-item__buttons'>
                                <button className='parameter-item__delete-button delete-button'>
                                    -
                                </button>
                            </div>
                        </div>
                        <div className='group-parameters__item list-item'>
                            <span>свойство 4</span>
                            <div className='parameter-item__buttons'>
                                <button className='parameter-item__delete-button delete-button'>
                                    -
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='group__buttons'>
                        <button className='group__add-button group-button add-button'>
                            добавить
                        </button>
                        <button className='group__delete-button group-button delete-button'>
                            удалить
                        </button>
                    </div>
                </div>
                <div className='groups-list__group group'>
                    <div className='group-parameters'>
                        <div className='group-parameters__item parameter-item list-item'>
                            <span>свойство 1123123212 23213 13132</span>
                            <div className='parameter-item__buttons'>
                                <button className='parameter-item__delete-button delete-button'>
                                    -
                                </button>
                            </div>
                        </div>
                        <div className='group-parameters__item list-item'>
                            <span>свойство 2</span>
                            <div className='parameter-item__buttons'>
                                <button className='parameter-item__delete-button delete-button'>
                                    -
                                </button>
                            </div>
                        </div>
                        <div className='group-parameters__item list-item '>
                            <span>свойство 3</span>
                            <div className='parameter-item__buttons'>
                                <button className='parameter-item__delete-button delete-button'>
                                    -
                                </button>
                            </div>
                        </div>
                        <div className='group-parameters__item list-item'>
                            <span>свойство 4</span>
                            <div className='parameter-item__buttons'>
                                <button className='parameter-item__delete-button delete-button'>
                                    -
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='group__buttons'>
                        <button className='group__add-button group-button add-button'>
                            добавить
                        </button>
                        <button className='group__delete-button group-button delete-button'>
                            удалить
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
