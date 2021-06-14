import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { getInitState } from './getInitState';

export enum MenuKey {
    CATALOG,
    STRAIN_SAVE,
    PROPERTY_EDIT,
}

interface MenuItem {
    id: MenuKey;
    url: string;
    label: string;
}

export interface FormFrameState {
    title: string;
    menu: {
        isVisible: boolean;
        activeId: MenuItem['id'];
        items: MenuItem[];
    };
}

export const formFrameSlice = createSlice({
    name: 'formFrame',
    initialState: getInitState(),
    reducers: {
        // задает заголовок напрямую
        setTitle: (state, action: PayloadAction<string>) => {
            state.title = action.payload;
        },
        // переключает видимость бокового меню
        toggleMenuVisibility: (state) => {
            state.menu.isVisible = !state.menu.isVisible;
        },
        setActiveMenuItemByKey: (state, action: PayloadAction<MenuKey>) => {
            state.menu.activeId = state.menu.items[action.payload].id;
        },
        setTitleByActiveItem: (state) => {
            const id = state.menu.activeId;
            state.title = state.menu.items[id].label;
        },
    },
});

export const {
    setTitle,
    toggleMenuVisibility,
    setActiveMenuItemByKey,
    setTitleByActiveItem,
} = formFrameSlice.actions;

export const selectFormFrame = (state: RootState) => state.formFrame;

const formFrameReducer = formFrameSlice.reducer;
export default formFrameReducer;
