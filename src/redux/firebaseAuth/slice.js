import { createSlice } from '@reduxjs/toolkit';
import { createUser, getMe, loginUser, signInWithGoogle, signOutUser } from './operations';

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
        state.user.email = payload.email;
        state.token = payload.uid;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(createUser.pending, (state) => {
        state.isLoggedIn = false;
        state.isRefreshing = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.user.email = payload.email;
        state.token = payload.uid;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoggedIn = false;
        state.isRefreshing = true;
      })

      .addCase(signOutUser.fulfilled, () => {
        return initialState;
      })
      .addCase(signOutUser.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(getMe.fulfilled, (state, { payload }) => {
        state.user.email = payload.email;
        state.user.name = payload.displayName || null;
        state.token = payload.uid;
        state.isRefreshing = false;
        state.isLoggedIn = true;
      })
      .addCase(getMe.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(signInWithGoogle.fulfilled, (state, { payload }) => {
        state.user.email = payload.email;
        state.user.name = payload.displayName;
        state.token = payload.uid;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(signInWithGoogle.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(signInWithGoogle.rejected, () => {
        return initialState;
      });
  }
});

export const fireBaseReducer = fireBaseAuthSlice.reducer;
