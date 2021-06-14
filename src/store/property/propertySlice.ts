import {
    createAsyncThunk,
    createSlice,
    SerializedError,
} from '@reduxjs/toolkit';
import { RootState } from '../store';
import API from '../../utils/API';
import FormalProperty from '../../models/Property/FormalProperty';
import FormalParameter from '../../models/FormalParameter';
import Property from '../../models/Property/Property';


export type UsingParam = FormalParameter & { isUsing?: boolean };
export type UsingProperty = Property<UsingParam> & { isUsing?: boolean };

export interface PropertyState {
    prop?: UsingProperty;
    propList: UsingProperty[];
    status: 'idle' | 'loading' | 'failed' | 'success';
    error?: SerializedError;
}

const initialState: PropertyState = {
    propList: [],
    status: 'idle',
};

export const downloadProperties = createAsyncThunk(
    'properties/downloadListWithParams',
    async () => {
        const allProperties = await API.property.getAllWithParameters();
        const paramIdList = allProperties.flatMap((prop) => {
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

        const propList = allProperties.map((prop) => {
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

export const uploadProperty = createAsyncThunk(
    'properties/uploadOneWithParams',
    async (property: FormalProperty) => {
        return API.property.postWithParams(property);
    }
);

export const deleteProperty = createAsyncThunk(
    'properties/deleteOne',
    async (id: number) => {
        const deleted = await API.property.delete(id);
        console.log('>>> [test] deleted property', deleted);
        return id;
    }
);

export const propertySlice = createSlice({
    name: 'properties',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // download property list
            .addCase(downloadProperties.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(
                downloadProperties.fulfilled,
                (state, { payload: propList }) => {
                    state.status = 'success';
                    state.propList = propList;
                }
            )
            .addCase(downloadProperties.rejected, (state, { error }) => {
                state.status = 'failed';
                state.error = error;
            })

            // add/edit one property
            .addCase(uploadProperty.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(
                uploadProperty.fulfilled,
                (state, { payload: uploadedProp }) => {
                    state.status = 'success';

                    console.log('>>> [test] uploadedProp, response:', uploadedProp);

                    // обновление или добавление загруженного на сервер свойства
                    const idx = state.propList.findIndex(
                        (prop) => prop.id === uploadedProp.id
                    );
                    if (idx >= 0) {
                        state.propList[idx] = uploadedProp;
                    } else {
                        state.propList.push(uploadedProp);
                    }
                }
            )
            .addCase(uploadProperty.rejected, (state, { error }) => {
                state.status = 'failed';
                state.error = error;
            })

            // remove property by id
            .addCase(deleteProperty.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteProperty.fulfilled, (state, { payload: id }) => {
                state.status = 'success';
                const idx = state.propList.findIndex((prop) => prop.id === id);
                if (idx >= 0) {
                    state.propList.splice(idx, 1);
                } else {
                    console.warn(
                        `DELETE: propList has not element with id = ${id}`
                    );
                }
            })
            .addCase(deleteProperty.rejected, (state, { error }) => {
                state.status = 'failed';
                state.error = error;
            });
    },
});

export const selectPropertyState = (state: RootState) => state.property;

const propertyReducer = propertySlice.reducer;
export default propertyReducer;
