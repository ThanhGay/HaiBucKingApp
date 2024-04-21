import { configureStore } from '@reduxjs/toolkit';
import authReducer from './feature/authSlice';
import userReducer from './feature/userSlice';

export const store = configureStore({
  reducer: {
    authState: authReducer,
    userState: userReducer,
  },
});

export const makeStore = () => {
  return store;
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;

// Infer the RootState and AppDispatch types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
