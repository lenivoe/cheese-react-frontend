import React from 'react';
import { Link } from 'react-router-dom';
import { selectFormFrame } from '../store/formFrame/formFrameSlice';
import { useAppSelector } from '../store/hooks';

const BlockMenu = () => {
  const {
    menu: { isVisible, items, activeItemKey },
  } = useAppSelector(selectFormFrame);

  if (!isVisible) {
    return null;
  }

  return (
    <div className='main-content__menu'>
      <div className='menu'>
        {items.map(({ key: id, label, url }) => (
          <Link className='obscure-a' to={url} key={id}>
            <MenuItem label={label} active={id === activeItemKey} />
          </Link>
        ))}
      </div>
    </div>
  );
};
interface MenuItemProps {
  label: string;
  active: boolean;
  onClick?: JSX.IntrinsicElements['div']['onClick'];
}

const MenuItem = ({ label, active, onClick }: MenuItemProps) => (
  <div
    onClick={onClick}
    className={`menu__item menu-item ${active ? 'active' : ''}`}
  >
    <div className='menu-item__text item-text'>
      <button>{label}</button>
    </div>
  </div>
);

export default BlockMenu;
