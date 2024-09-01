import { createAsyncThunk } from '@reduxjs/toolkit';
import { api, setToken, clearToken } from '../../config/api';

export const registerUser = createAsyncThunk('auth/register', async (credentials, thunkAPI) => {
  try {
    const { data } = await api.post('users/signup', credentials);
    setToken(data.token);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const loginUser = createAsyncThunk('auth/login', async (credentials, thunkAPI) => {
  try {
    const { data } = await api.post('users/login', credentials);
    setToken(data.token);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const logOutUser = createAsyncThunk('auth/logout', async (token, thunkAPI) => {
  try {
    await api.post('users/logout');
    clearToken();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
