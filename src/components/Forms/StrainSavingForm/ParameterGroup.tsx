export default function ParameterGroup() {
    return (
        <div className='property__group property-group'>
            <div className='property__info'>
                {/*  ------  array of fields  ------ */}
                {/* <div className="strain-form__item form__field">
              <label for="parameter_1" className="strain-form__label form-label">Параметр 1</label>
              <input id="parameter_1" type="text" className="strain-form__input form-input">
            </div> */}
            </div>
            <div className='property-group__buttons-block'>
                <button className='property-group__delete-button delete-button'>-</button>
                <button className='property-group__add-button add-button'>+</button>
            </div>
        </div>
    );
}
