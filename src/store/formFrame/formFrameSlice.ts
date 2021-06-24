import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { getInitState } from './getInitState';

export enum MenuKey {
  CATALOG,
  STRAIN_SAVE,
  PROPERTY_EDIT,
}

interface MenuItem {
  key: MenuKey;
  url: string;
  label: string;
}

export interface FormFrameState {
  headerTitle: string;
  menu: {
    isVisible: boolean;
    activeItemKey: MenuItem['key'];
    items: MenuItem[];
  };
}

export const formFrameSlice = createSlice({
  name: 'formFrame',
  initialState: getInitState(),
  reducers: {
    // переключает видимость бокового меню
    toggleMenuVisibility: (state) => {
      state.menu.isVisible = !state.menu.isVisible;
    },
    setActiveMenuItemByKey: (state, { payload }: PayloadAction<MenuKey>) => {
      state.menu.activeItemKey = state.menu.items[payload].key;
    },
    setTitleByActiveItem: (state) => {
      const key = state.menu.activeItemKey;
      state.headerTitle = state.menu.items[key].label;
    },
    // задает заголовок напрямую
    setHeaderTitle: (state, { payload: title }: PayloadAction<string>) => {
      state.headerTitle = title;
    },
  },
});

export const {
  toggleMenuVisibility,
  setActiveMenuItemByKey,
  setTitleByActiveItem,
  setHeaderTitle,
} = formFrameSlice.actions;

export const selectFormFrame = (state: RootState) => state.formFrame;

const formFrameReducer = formFrameSlice.reducer;
export default formFrameReducer;
