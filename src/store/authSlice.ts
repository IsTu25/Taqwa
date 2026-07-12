import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
}

interface AuthState {
  user: AuthUser | null;
  initializing: boolean;
}

const initialState: AuthState = { user: null, initializing: true };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthUser>) => {
      state.user = action.payload;
      state.initializing = false;
    },
    clearUser: (state) => {
      state.user = null;
      state.initializing = false;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
