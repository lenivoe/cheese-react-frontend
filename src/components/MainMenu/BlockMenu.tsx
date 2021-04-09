export default function BlockMenu() {
    return (
        <div className='menu'>
            <div className='menu__item menu-item active'>
                <div className='menu-item__text item-text'>
                    <span>Добавить штамм микроорганизма</span>
                </div>
            </div>

            <div className='menu__item menu-item'>
                <div className='menu-item__text item-text'>
                    <span>Поиск и редактирование штаммов микроорганизмов</span>
                </div>
            </div>

            <div className='menu__item menu-item'>
                <div className='menu-item__text item-text'>
                    <span>Редактирование свойств и параметров микроорганзимов</span>
                </div>
            </div>
        </div>
    );
}
