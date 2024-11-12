// src/Redux/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

interface AuthState {
  loggedIn: boolean;
  user: User | null | undefined; // Allow null or undefined
}

const initialState: AuthState = {
  loggedIn: false,
  user: undefined,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.loggedIn = action.payload;
    },
    setUser: (state, action: PayloadAction<User | null | undefined>) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = undefined;
    },
  },
});

export const { setLoggedIn, setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
