export default function ModalWindow() {
    const modalCssId = 'iw-modal-1';
    const title = 'Добавление рода';
    return (
        <div id={modalCssId} className='iw-modal'>
            <div className='iw-modal-wrapper'>
                <div className='iw-CSS-modal-inner'>
                    <div className='iw-modal-header'>
                        <h3 className='iw-modal-title'>{title}</h3>
                    </div>
                    <div className='iw-modal-text'>
                        <form className='add-main-field-form' action=''>
                            {/* <div className="main-field">
                        <label for="gen-type">Наименование</label>
                        <input type="text" className="main-field__input" id="gen-type" name="gen-type" value="123">
                    </div> */}
                            <div className='main-field__buttons'>
                                <button
                                    type='submit'
                                    className='main-field__button add-button'
                                >
                                    Добавить
                                </button>
                                <a
                                    href='#close'
                                    title='Закрыть'
                                    className='cancel-button'
                                >
                                    Отмена
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}