
import { configureStore } from '@reduxjs/toolkit';
import fileBrowserReducer from './fileBrowserSlice';

export const store = configureStore({
    reducer: {
        fileBrowser: fileBrowserReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;