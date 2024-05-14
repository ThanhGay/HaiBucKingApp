import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import userReducer from './features/user/userSlice';
import ticketReducer from './features/ticket/ticketSlice';
import movieReducer from './features/movie/movieSlice';
import adminReducer from './features/admin/adminSlice';

export const store = configureStore({
  reducer: {
    authState: authReducer,
    userState: userReducer,
    ticketState: ticketReducer,
    movieState: movieReducer,
    adminState: adminReducer,
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
