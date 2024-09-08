import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  signInWithRedirect,
  getRedirectResult
} from 'firebase/auth';
import { auth, provider } from '../../firebase/firebase';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const createUser = createAsyncThunk(
  'fireBaseAuth/register',
  async ({ email, password }, thunkAPI) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      const user = userCredential.user;
      if (user) {
        return {
          email: user.email,
          uid: user.uid,
          displayName: user.displayName || null
        };
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const loginUser = createAsyncThunk(
  'fireBaseAuth/login',
  async ({ email, password }, thunkAPI) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      console.log(userCredential);
      if (user) {
        return {
          email: user.email,
          uid: user.uid,
          displayName: user.displayName || null
        };
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const signOutUser = createAsyncThunk('fireBaseAuth/signout', async (_, thunkAPI) => {
  try {
    await signOut(auth);
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
          const userData = {
            email: user.email,
            uid: user.uid,
            displayName: user.displayName,
            accessToken: user.accessToken
          };
          resolve(userData);
        } else {
          reject(new Error('User is not logged in'));
        }
      });
    });
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const signInWithGoogle = createAsyncThunk(
  'fireBaseAuth/googleSignIn',
  async (_, thunkAPI) => {
    try {
      await signInWithRedirect(auth, provider);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const redirectResult = createAsyncThunk(
  'fireBaseAuth/redirectResult',
  async (_, thunkAPI) => {
    try {
      const result = await getRedirectResult(auth);
      console.log(result, 'redirect result');
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
