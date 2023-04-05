// configureStore.js

import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  combineReducers,
  configureStore
} from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';

import authReducer from './reducers/auth.reducer';

const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage
};

const rootReducer = combineReducers({
  authReducer: persistReducer(
    authPersistConfig,
    authReducer
  )
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage
};

const persistedReducer: any = persistReducer(
  persistConfig,
  rootReducer
);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
});

export default store;
