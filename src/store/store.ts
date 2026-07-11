import { configureStore } from '@reduxjs/toolkit';
import taqwaReducer from './taqwaSlice';

export const store = configureStore({
  reducer: {
    taqwa: taqwaReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
