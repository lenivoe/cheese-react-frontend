import React from 'react';
import { Link } from 'react-router-dom';

export interface MenuItemInfo {
    id: string;
    label: string;
    url: string;
}

interface BlockMenuProps {
    active: MenuItemInfo;
    items: MenuItemInfo[];
    visible?: boolean;
}

const BlockMenu = ({ active, items, visible = true }: BlockMenuProps) =>
    !visible ? null : (
        <div className='main-content__menu'>
            <div className='menu'>
                {items.map(({ id, label, url }) => (
                    <Link className='obscure-a' to={url} key={id}>
                        <MenuItem label={label} active={id === active?.id} />
                    </Link>
                ))}
            </div>
        </div>
    );

interface MenuItemProps {
    label: string;
    active: boolean;
    onClick?: JSX.IntrinsicElements['div']['onClick'];
}

const MenuItem = ({ label, active, onClick }: MenuItemProps) => (
    <div onClick={onClick} className={`menu__item menu-item ${active ? 'active' : ''}`}>
        <div className='menu-item__text item-text'>
            <span>{label}</span>
        </div>
    </div>
);

export default BlockMenu;
