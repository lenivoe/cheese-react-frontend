interface Props {
    onMenuButtonClick: () => void;
    isMenuButtonActive: boolean;
}

export default function Header({ onMenuButtonClick, isMenuButtonActive }: Props) {
    const active = isMenuButtonActive ? ' active' : '';

    return (
        <header className='header container'>
            <div className='header__content header-content'>
                <div
                    className={'header__menu-button menu-button' + active}
                    onClick={onMenuButtonClick}
                >
                    Меню
                </div>
                <div className='header__title'>Добавление штамма</div>
            </div>
        </header>
    );
}
