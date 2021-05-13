import { nanoid } from 'nanoid/non-secure';
import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const menuLabels = [
    'Каталог микроорганизмов',
    'Добавить штамм микроорганизма',
    'Поиск и редактирование штаммов микроорганизмов',
    'Редактирование свойств и параметров микроорганзимов',
    '[Тест] редактирование штамма 1',
    '[Тест] редактирование штамма 2',
];

const menuUrlList = [
    '/catalog',
    '/strain/add',
    '/strain/search',
    '/properties',
    '/strain/1/edit',
    '/strain/2/edit',
];

const items = menuUrlList.map(
    (url, i) => ({ id: nanoid(), url, label: menuLabels[i] } as const)
);

export default function useMenuState() {
    const { pathname } = useLocation(); // адрес текущей страницы
    const [active, setActiveItem] = useState(items[0]);
    const [visible, setVisible] = useState(true);

    const toggleVisible = useCallback(() => setVisible((visible) => !visible), []);

    // выделяет пункт меню в зависимости от текущего адреса страницы
    useEffect(() => {
        const item = items.reduce<typeof items[number] | null>((active, item) => {
            const isMatch = pathname.startsWith(item.url);
            const isFound = isMatch && (!active || active.url.length < item.url.length);
            return isFound ? item : active;
        }, null);

        if (item) {
            setActiveItem(item);
        }
    }, [pathname]);

    return { items, active, visible, toggleVisible };
}
