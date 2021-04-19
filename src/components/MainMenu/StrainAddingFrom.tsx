import { testStrainToJSON } from '../../models/strain/_test';

function TextFormItem(props: { label: string; id: string }) {
    return (
        <div className='strain-form__item'>
            <label htmlFor={props.id} className='strain-form__label'>
                {props.label}
            </label>
            <input id={props.id} type='text' className='strain-form__input form-input' />
        </div>
    );
}

function SelectFormItem(props: { label: string; id: string; items: string[] }) {
    return (
        <div className='strain-form__item'>
            <label htmlFor={props.id} className='strain-form__label'>
                {props.label}
            </label>
            <select id={props.id} className='strain-form__input form-input'>
                {props.items.map((item) => (
                    <option key={item} value=''>
                        {item}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default function StrainAddingFrom() {
    const bergeyTypes = ['Пункт 1', 'Пункт 2', 'Пункт 3'];

    return (
        <form action='' className='strain-form'>
            <p>{testStrainToJSON()}</p>

            <SelectFormItem
                label='Тип по Берджи'
                id='bergey-type_field'
                items={bergeyTypes}
            />

            <TextFormItem label='Исхродный индекс' id='name_field' />
            <TextFormItem label='Дата получения' id='data_field' />
            <TextFormItem label='Индекс штаммов' id='index_field' />
            <TextFormItem label='Источник' id='source_field' />
            <TextFormItem label='Создатель' id='creator_field' />
        </form>
    );
}
