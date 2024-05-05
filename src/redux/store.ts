import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import userReducer from './features/userSlice';
import ticketReducer from './features/ticketSlice';
import movieReducer from './features/movie/movieSlice';

export const store = configureStore({
  reducer: {
    authState: authReducer,
    userState: userReducer,
    ticketState: ticketReducer,
    movieState: movieReducer,
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
