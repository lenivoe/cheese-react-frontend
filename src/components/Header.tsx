import classNames from 'classnames';
import React, { useCallback } from 'react';
import {
  selectFormFrame,
  toggleMenuVisibility,
} from '../store/formFrame/formFrameSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';

export default function Header() {
  const dispatch = useAppDispatch();
  const {
    headerTitle: title,
    menu: { isVisible: active },
  } = useAppSelector(selectFormFrame);

  const toggleVisible = useCallback(
    () => dispatch(toggleMenuVisibility()),
    [dispatch]
  );

  return (
    <header className='header container'>
      <div className='header__content header-content'>
        <button
          className={classNames('header__menu-button menu-button', { active })}
          onClick={toggleVisible}
        >
          Меню
        </button>
        <div className='header__title'>{title}</div>
      </div>
    </header>
  );
}
