import { configureStore } from '@reduxjs/toolkit';
// import { authReducer } from './auth/slice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { fireBaseReducer } from './firebaseAuth/slice';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['token']
};
export const store = configureStore({
  reducer: {
    fireBaseAuth: persistReducer(persistConfig, fireBaseReducer)
    // fireBaseAuth: fireBaseReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
});

export const persistor = persistStore(store);
