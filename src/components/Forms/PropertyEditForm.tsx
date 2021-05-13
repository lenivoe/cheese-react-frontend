export default function PropertyEditForm() {
    return (
        <div className='property-edit'>
            <div className='property-edit__info-block info-block'>
                <div className='property-edit__properties-list property-edit--list'>
                    <div className='properties-list list'>
                        <div className='properties-list__title list-title'>
                            <span>Свойства</span>
                        </div>
                        <div className='properties-list__data list-data'>
                            <div className='properties-list__property-item list-item'>
                                <span>свойство 1123123212 23213 13132</span>
                            </div>
                            <div className='properties-list__property-item list-item'>
                                <span>свойство 2</span>
                            </div>
                            <div className='properties-list__property list-item '>
                                <span>свойство 3</span>
                            </div>
                            <div className='properties-list__property list-item active'>
                                <span>свойство 4</span>
                            </div>

                            <div className='properties-list__property list-item'>
                                <span>свойство 4</span>
                            </div>

                            <div className='properties-list__property list-item'>
                                <span>свойство 4</span>
                            </div>

                            <div className='properties-list__property list-item'>
                                <span>свойство 4</span>
                            </div>

                            <div className='properties-list__property list-item'>
                                <span>свойство 4</span>
                            </div>

                            <div className='properties-list__property list-item'>
                                <span>свойство 4</span>
                            </div>

                            <div className='properties-list__property list-item'>
                                <span>свойство 4</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='property-edit__property-parameters property-edit--list'>
                    <div className='parameters-list list'>
                        <div className='parameters-list__title list-title'>
                            <span>Параметры</span>
                        </div>
                        <div className='parameters-list__data list-data'>
                            <div className='parameters-list__parameter-item list-item active'>
                                <span>Параметер 1</span>
                            </div>
                            <div className='parameters-list__parameter-item list-item'>
                                <span>Параметер 1</span>
                            </div>
                            <div className='parameters-list__parameter-item list-item'>
                                <span>Параметер 1</span>
                            </div>
                            <div className='parameters-list__parameter-item list-item'>
                                <span>Параметер 1</span>
                            </div>

                            <div className='parameters-list__parameter-item list-item'>
                                <span>Параметер 1</span>
                            </div>

                            <div className='parameters-list__parameter-item list-item'>
                                <span>Параметер 1</span>
                            </div>

                            <div className='parameters-list__parameter-item list-item'>
                                <span>Параметер 1</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='property-edit__property-info property-info'></div>

                <div className='property-edit__form-menu form-menu'>
                    <div className='form-menu__add-buttons'>
                        <div className='form-menu__add-property-button form-menu__button active'>
                            <span>Добавить свойство</span>
                        </div>
                        <div className='form-menu__add-parameter-button form-menu__button'>
                            <span>Добавить параметр</span>
                        </div>
                    </div>

                    <div className='form-menu__edit-buttons'>
                        <div className='form-menu__edit-property-button form-menu__button disabled-block'>
                            <span>Изменить свойство</span>
                        </div>
                        <div className='form-menu__edit-parameter-button form-menu__button'>
                            <span>Изменить параметр</span>
                        </div>
                    </div>

                    <div className='form-menu__delete-buttons'>
                        <div className='form-menu__delete-property-button form-menu__button'>
                            <span>Удалить свойство</span>
                        </div>
                        <div className='form-menu__delete-parameter-button form-menu__button'>
                            <span>Удалить параметр</span>
                        </div>
                    </div>
                </div>
            </div>

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

                <div className='form-block add-parameter-form '>
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

                <div className='form-block change-property-form hidden-block'>
                    <div className='form-block__title'>Изменить свойство</div>
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

                <div className='form-block edit-parameter-form hidden-block'>
                    <div className='form-block__title'>Изменить параметр</div>
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
        </div>
    );
}
