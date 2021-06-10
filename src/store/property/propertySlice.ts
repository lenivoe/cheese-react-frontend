import { createAsyncThunk, createSlice, SerializedError } from '@reduxjs/toolkit';
import { RootState } from '../store';
import API from '../../utils/API';
import FormalProperty from '../../models/Property/FormalProperty';
import FormalParameter from '../../models/FormalParameter';

type RemoteData<T> = {
    value: T;
    status: 'idle' | 'loading' | 'failed' | 'success';
    error?: SerializedError;
};

export interface PropertyState {
    prop?: RemoteData<FormalProperty>;
    param?: RemoteData<FormalParameter>;
    propList: RemoteData<FormalProperty[]>;
}

const initialState: PropertyState = {
    propList: { value: [], status: 'idle' },
};

export const fetchPropertyList = createAsyncThunk(
    'properties/fetchPropertyListWithParameters',
    async () => {
        const allProperty = await API.property.getAllWithParameters();
        const paramIdList = allProperty.flatMap((prop) => {
            const paramList = [
                ...(prop.ungrouped ?? []),
                ...(prop.groups ?? []).flatMap((group) => group.parameters),
            ];
            return paramList.map((param) => param.id!);
        });

        const isUsingList = await API.formalParameter.isListUsing(paramIdList);

        const addUsingInfo = (param: FormalParameter) => ({
            ...param,
            isUsing: isUsingList[param.id!],
        });

        const propList = allProperty.map((prop) => {
            const ungrouped = prop.ungrouped?.map(addUsingInfo);
            const groups = prop.groups?.map(({ parameters, ...rest }) => ({
                ...rest,
                parameters: parameters.map(addUsingInfo),
            }));

            const isUsing =
                !!ungrouped?.find((param) => param.isUsing) ||
                !!groups?.find(
                    (group) => !!group.parameters.find((param) => param.isUsing)
                );

            return { ...prop, ungrouped, groups, isUsing };
        });

        return propList;
    }
);

export const propertySlice = createSlice({
    name: 'properties',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPropertyList.pending, (state) => {
                state.propList.status = 'loading';
            })
            .addCase(fetchPropertyList.fulfilled, (state, action) => {
                state.propList.status = 'success';
                state.propList.value = action.payload;
            })
            .addCase(fetchPropertyList.rejected, (state, action) => {
                state.propList.status = 'failed';
                state.propList.error = action.error;
            });
    },
});

export const selectPropertyList = (state: RootState) => state.property.propList;

const propertyReducer = propertySlice.reducer;

export default propertyReducer;
