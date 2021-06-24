import {
  createAsyncThunk,
  createSlice,
  SerializedError,
} from '@reduxjs/toolkit';
import { RootState } from '../store';
import API from '../../utils/API';
import FormalProperty from '../../models/Property/FormalProperty';

export interface PropertyState {
  propList: FormalProperty[];
  isUsingById: {
    prop: { [key: number]: boolean };
    param: { [key: number]: boolean };
  };
  status: 'idle' | 'loading' | 'failed' | 'success';
  error?: SerializedError;
}

const initialState: PropertyState = {
  propList: [],
  isUsingById: { prop: {}, param: {} },
  status: 'idle',
};

export const downloadProperties = createAsyncThunk(
  'properties/downloadAllWithParams',
  async () => {
    const propList = await API.property.getAllWithParameters();
    const paramIdList = propList.flatMap((prop) => {
      const paramList = prop.groups?.[0].parameters ?? [];
      return paramList.map((param) => param.id);
    });

    const isUsingList = await API.formalParameter.isListUsing(paramIdList);

    const isUsingParamById: { [key: number]: boolean } = {};
    paramIdList.forEach((id, i) => {
      isUsingParamById[id] = isUsingList[i];
    });

    const isUsingPropById: { [key: number]: boolean } = {};
    propList.forEach((prop) => {
      if (!prop.groups) {
        isUsingPropById[prop.id] = false;
      } else {
        const isUsing = prop.groups[0].parameters.some(
          (param) => isUsingParamById[param.id]
        );
        isUsingPropById[prop.id] = isUsing;
      }
    });

    return {
      propList,
      isUsingById: {
        prop: isUsingPropById,
        param: isUsingParamById,
      },
    };
  }
);

export const uploadProperty = createAsyncThunk(
  'properties/uploadOneWithParams',
  async (property: FormalProperty | Omit<FormalProperty, 'id'>) => {
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
      .addCase(downloadProperties.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.propList = payload.propList;
        state.isUsingById = payload.isUsingById;
      })
      .addCase(downloadProperties.rejected, (state, { error }) => {
        state.status = 'failed';
        state.error = error;
      })

      // add/edit one property
      .addCase(uploadProperty.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(uploadProperty.fulfilled, (state, { payload: uploadedProp }) => {
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
      })
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
          console.warn(`DELETE: propList has not element with id = ${id}`);
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
