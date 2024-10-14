import { configureStore } from '@reduxjs/toolkit';
import common from '../reducers/common';

export const store = configureStore({
    reducer: {
        common,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;