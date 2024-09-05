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
      })
      .addCase(signInWithGoogle.fulfilled, (state, { payload }) => {
        state.user.email = payload.email;
        state.user.name = payload.displayName;
        state.token = payload.uid;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(signInWithGoogle.rejected, () => {
        return initialState;
      });
  }
});

export const fireBaseReducer = fireBaseAuthSlice.reducer;
