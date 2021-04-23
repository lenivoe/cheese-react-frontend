import React from 'react';
import { useLocation } from 'react-router-dom';
import { ButtonLink } from '../utils/ButtonLink';

export interface MenuItemInfo {
    id: number;
    label: string;
    linkTo: string;
}
interface BlockMenuProps {
    items: MenuItemInfo[];
    onChoose?: (item: MenuItemInfo) => void;
}

export default function BlockMenu({ items, onChoose }: BlockMenuProps) {
    const location = useLocation();

    // выделяет пункт меню в зависимости от текущего адреса страницы
    const activeItem = items.reduce<MenuItemInfo | undefined>((active, item) => {
        const isMatch = location.pathname.startsWith(item.linkTo);
        const isFound = isMatch && (!active || active.linkTo.length < item.linkTo.length);
        return isFound ? item : active;
    }, undefined);

    return (
        <div className='main-content__menu'>
            <div className='menu'>
                {items.map(({ id, label, linkTo }) => (
                    <ButtonLink to={linkTo} key={id}>
                        <MenuItem
                            label={label}
                            isActive={id === activeItem?.id}
                            onClick={
                                onChoose &&
                                (() => onChoose(items.find((item) => item.id === id)!))
                            }
                        />
                    </ButtonLink>
                ))}
            </div>
        </div>
    );
}

interface MenuItemProps {
    label: string;
    isActive: boolean;
    onClick?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

function MenuItem({ label, isActive, onClick }: MenuItemProps) {
    const active = isActive ? ' active' : '';

    return (
        <div onClick={onClick} className={'menu__item menu-item' + active}>
            <div className='menu-item__text item-text'>
                <span>{label}</span>
            </div>
        </div>
    );
}
