import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export interface MenuItemInfo {
    id: number;
    label: string;
    url: string;
}

interface BlockMenuProps {
    items: MenuItemInfo[];
    onChoose?: (item: MenuItemInfo) => void;
}

export default function BlockMenu({ items, onChoose }: BlockMenuProps) {
    const { pathname } = useLocation(); // адрес текущей страницы

    // выделяет пункт меню в зависимости от текущего адреса страницы
    const activeItem = items.reduce<MenuItemInfo | undefined>((active, item) => {
        const isMatch = pathname.startsWith(item.url);
        const isFound = isMatch && (!active || active.url.length < item.url.length);
        return isFound ? item : active;
    }, undefined);

    return (
        <div className='main-content__menu'>
            <div className='menu'>
                {items.map(({ id, label, url }) => (
                    <Link className='obscure-a' to={url} key={id}>
                        <MenuItem
                            label={label}
                            isActive={id === activeItem?.id}
                            onClick={
                                onChoose &&
                                (() => onChoose(items.find((item) => item.id === id)!))
                            }
                        />
                    </Link>
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
