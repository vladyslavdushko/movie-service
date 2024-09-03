import { createSlice } from '@reduxjs/toolkit';
import { getMe, loginUser, logOutUser, registerUser } from './operations';

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
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoggedIn = false;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoggedIn = false;
      })
      .addCase(getMe.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.user.name = action.payload.name;
        state.user.email = action.payload.email;
        state.isRefreshing = false;
        state.isLoggedIn = true;
      })
      .addCase(getMe.rejected, (state) => {
        state.isRefreshing = false;
      });
  }
});

export const authReducer = authSlice.reducer;
