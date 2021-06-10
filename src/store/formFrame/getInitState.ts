import { MenuKey } from "./formFrameSlice";

interface MenuItem {
    id: MenuKey;
    url: string;
    label: string;
}

interface FormFrameState {
    title: string;
    menu: {
        isVisible: boolean;
        activeId: MenuItem['id'];
        items: MenuItem[];
    };
}

export function getInitState(): FormFrameState {
    const menuLabels = [
        'Каталог микроорганизмов',
        'Добавить штамм микроорганизма',
        'Редактирование свойств и параметров микроорганзимов',
        '[Тест] редактирование штамма 1',
        '[Тест] редактирование штамма 2',
    ];

    const menuUrlList = [
        '/catalog',
        '/strain/add',
        '/properties',
        '/strain/1/edit',
        '/strain/2/edit',
    ];

    const items = menuUrlList.map(
        (url, i) => ({ id: i, url, label: menuLabels[i] } as const)
    );

    const activeId = MenuKey.CATALOG;

    return {
        title: items[activeId].label,
        menu: {
            isVisible: true,
            activeId: activeId,
            items: items,
        },
    };
}
