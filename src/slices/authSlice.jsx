
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: !!localStorage.getItem('token'), 
    token: localStorage.getItem('token') || null,
    user: null,
  };
  

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload;
      localStorage.setItem('token', action.payload);
        console.log(action);
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.isAuthenticated = false;
      state.token = null;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      localStorage.removeItem('token');
    },
    registerSuccess: (state, action) => {
      state.isAuthenticated = true;
      
    },
    registerFailure: (state, action) => {
      state.isAuthenticated = false;
      
    },
  },
});

export const {
  loginSuccess,
  loginFailure,
  logout,
  registerSuccess,
  registerFailure,
} = authSlice.actions;

export default authSlice.reducer;
