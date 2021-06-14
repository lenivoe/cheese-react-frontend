import { FormFrameState, MenuKey } from "./formFrameSlice";

export function getInitState(): FormFrameState {
    const menuLabels = [
        'Каталог микроорганизмов',
        'Добавить штамм микроорганизма',
        'Редактирование свойств и параметров микроорганзимов',
    ];

    const menuUrlList = [
        '/catalog',
        '/strain/add',
        '/properties',
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
