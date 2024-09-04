import { createSlice } from '@reduxjs/toolkit';
import { createUser, getMe, loginUser, signOutUser } from './operations';

const initialState = {
  user: {
    name: null,
    email: null
  },
  token: null,
  isLoggedIn: false,
  isRefreshing: false
};

export const fireBaseAuthSlice = createSlice({
  name: 'fireBaseAuth',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(createUser.fulfilled, (state, { payload }) => {
        state.user.email = payload.user.email;
        state.token = payload.user.uid;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.user.email = payload.user.email;
        state.token = payload.user.uid;

        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(signOutUser.fulfilled, () => {
        return initialState;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.user.email = action.payload.email;
        state.user.name = action.payload.displayName || null;
        state.token = action.payload.uid;
        state.isRefreshing = false;
        state.isLoggedIn = true;
      });
  }
});

export const fireBaseReducer = fireBaseAuthSlice.reducer;
