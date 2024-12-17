import { configureStore } from '@reduxjs/toolkit';
import storageSlice from './storageReducer';

export const store = configureStore({
  reducer: {
    storage: storageSlice
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;