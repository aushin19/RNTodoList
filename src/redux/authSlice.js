// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  isAuthenticated: false,
  isLoading: false,
  user: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
    },
    loginSuccess: (state, action) => {
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.isLoading = false;
    },
    loginFailure: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.isLoading = false;
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.user = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    }
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  setUser
} = authSlice.actions;

export default authSlice.reducer;