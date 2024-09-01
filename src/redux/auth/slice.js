import { createSlice } from '@reduxjs/toolkit';
import { loginUser, logOutUser, registerUser } from './operations';

const initialState = {
  user: {
    name: null,
    email: null
  },
  token: null,
  isLoggedIn: false,
  isRefreshing: false
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(logOutUser.fulfilled, () => {
        return initialState;
      });
  }
});

export const authReducer = authSlice.reducer;
