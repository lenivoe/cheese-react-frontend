export default function StrainAddingFrom() {
    return (
        <form action='' className='strain-form'>
            <div className='strain-form__item'>
                <label htmlFor='bergey-type_field' className='strain-form__label'>
                    Тип по Берджи
                </label>
                <select id='bergey-type_field' className='strain-form__input form-input'>
                    <option value=''>Пункт 1</option>
                    <option value=''>Пункт 2</option>
                    <option value=''>Пункт 3</option>
                </select>
            </div>

            <div className='strain-form__item'>
                <label htmlFor='name_field' className='strain-form__label'>
                    Исхродный индекс
                </label>
                <input
                    id='name_field'
                    type='text'
                    className='strain-form__input form-input'
                />
            </div>

            <div className='strain-form__item'>
                <label htmlFor='data_field' className='strain-form__label'>
                    Дата получения
                </label>
                <input
                    id='data_field'
                    type='text'
                    className='strain-form__input form-input'
                />
            </div>

            <div className='strain-form__item'>
                <label htmlFor='index_field' className='strain-form__label'>
                    Индекс штаммов
                </label>
                <input
                    id='index_field'
                    type='text'
                    className='strain-form__input form-input'
                />
            </div>

            <div className='strain-form__item'>
                <label htmlFor='source_field' className='strain-form__label'>
                    Источник
                </label>
                <input
                    id='source_field'
                    type='text'
                    className='strain-form__input form-input'
                />
            </div>

            <div className='strain-form__item'>
                <label htmlFor='creator_field' className='strain-form__label'>
                    Создатель
                </label>
                <input
                    id='creator_field'
                    type='text'
                    className='strain-form__input form-input'
                />
            </div>

            <div className='strain-form__item'>
                <label htmlFor='creator_field' className='strain-form__label'>
                    Создатель
                </label>
                <input
                    id='creator_field'
                    type='text'
                    className='strain-form__input form-input'
                />
            </div>
        </form>
    );
}
