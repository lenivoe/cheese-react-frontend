import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UsingParam, UsingProperty } from '../property/propertySlice';
import { RootState } from '../store';

type Mode = 'ADD_PROP' | 'EDIT_PROP' | 'ADD_PARAM' | 'EDIT_PARAM' | 'NONE';

export interface PropertyEditFormState {
    selected: {
        prop?: UsingProperty;
        param?: UsingParam;
    };
    mode: Mode;
}

const initialState: PropertyEditFormState = {
    selected: {},
    mode: 'NONE',
};

export const propertyEditFormSlice = createSlice({
    name: 'propertyEditForm',
    initialState,
    reducers: {
        setMode: (state, { payload: mode }: PayloadAction<Mode>) => {
            state.mode = mode;
        },
        setProp: (
            state,
            { payload: prop }: PayloadAction<UsingProperty | undefined>
        ) => {
            state.selected.prop = prop;
        },
        setParam: (
            state,
            { payload: param }: PayloadAction<UsingParam | undefined>
        ) => {
            state.selected.param = param;
        },
    },
});

export const { setMode, setProp, setParam } = propertyEditFormSlice.actions;

export const selectMode = (state: RootState) => state.propertyEditFrom.mode;
export const selectProp = (state: RootState) =>
    state.propertyEditFrom.selected.prop;
export const selectParam = (state: RootState) =>
    state.propertyEditFrom.selected.param;

const propertyEditFormReducer = propertyEditFormSlice.reducer;
export default propertyEditFormReducer;
