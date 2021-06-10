import React, { useCallback } from 'react';
import { selectFormFrame, toggleMenuVisibility } from '../store/formFrame/formFrameSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';

export default function Header() {
    const dispatch = useAppDispatch();
    const {
        title,
        menu: { isVisible },
    } = useAppSelector(selectFormFrame);

    const toggleVisible = useCallback(() => dispatch(toggleMenuVisibility()), [dispatch]);

    const active = isVisible ? ' active' : '';

    return (
        <header className='header container'>
            <div className='header__content header-content'>
                <button
                    className={'header__menu-button menu-button' + active}
                    onClick={toggleVisible}
                >
                    Меню
                </button>
                <div className='header__title'>{title}</div>
            </div>
        </header>
    );
}
