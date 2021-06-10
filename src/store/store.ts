import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import formFrameReducer from './formFrame/formFrameSlice';
import propertyReducer from './property/propertySlice';
export const store = configureStore({
    reducer: {
        formFrame: formFrameReducer,
        property: propertyReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
