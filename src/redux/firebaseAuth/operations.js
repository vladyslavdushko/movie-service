import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import { auth } from '../../firebase/firebase';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { clearToken, setToken } from '../../config/api';

export const createUser = createAsyncThunk(
  'fireBaseAuth/register',
  async ({ email, password }, thunkAPI) => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      await setPersistence(auth, browserLocalPersistence);
      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const loginUser = createAsyncThunk(
  'fireBaseAuth/login',
  async ({ email, password }, thunkAPI) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      await setPersistence(auth, browserLocalPersistence);
      setToken(user.user.accessToken);
      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const signOutUser = createAsyncThunk('fireBaseAuth/signout', async (_, thunkAPI) => {
  try {
    await signOut(auth);
    console.log('sign put successfully');
    clearToken();
    return;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const getMe = createAsyncThunk('fireBaseAuth/getMe', async (_, thunkAPI) => {
  try {
    const auth = getAuth();
    return new Promise((resolve, reject) => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // Користувач залогінений
          const userData = {
            email: user.email,
            uid: user.uid,
            displayName: user.displayName,
            accessToken: user.accessToken
          };
          resolve(userData);
        } else {
          // Користувач не залогінений
          reject(new Error('User is not logged in'));
        }
      });
    });
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
