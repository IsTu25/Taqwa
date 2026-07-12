import { configureStore } from '@reduxjs/toolkit';
import taqwaReducer from './taqwaSlice';
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    taqwa: taqwaReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
