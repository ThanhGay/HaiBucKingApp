import { apiSignIn, apiSignOut, apiSignUp } from '@/api/auth';
import {
  PayloadAction,
  createAsyncThunk,
  createSlice,
  isAnyOf,
} from '@reduxjs/toolkit';

export interface AuthState {
  user: any;
  token: string;
  isLoading: boolean;
  error: boolean;
  loginCode: boolean | null; // 0 - failed, 1 - success
  message: string;
}

export const authLogin = createAsyncThunk(
  'auth/login',
  async (args: { phoneNumber: string; password: string }) => {
    const response = await apiSignIn(args);
    return response;
  },
);

export const authRegister = createAsyncThunk(
  'auth/register',
  async (args: {
    phoneNumber: string;
    password: string;
    email: string;
    fullname: string;
    dob: Date;
  }) => {
    const response = await apiSignUp(args);

    return response;
  },
);

export const authLogout = createAsyncThunk('auth/logout', async () => {
  const response = await apiSignOut();
  return response;
});

const initialState: AuthState = {
  user: null,
  token: '',
  isLoading: false,
  error: false,
  loginCode: false,
  message: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setDataUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
    setAuthLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authLogin.pending, (state, action: PayloadAction<any>) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(authLogin.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = false;
        state.loginCode = action.payload.status;
        state.user = action.payload.data.data_user;
        state.token = action.payload.data.accesToken;
        state.message = action.payload.msg;
      })
      .addCase(authLogin.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = true;
        state.loginCode = false;
      })
      .addCase(authRegister.pending, (state, action: PayloadAction<any>) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(authRegister.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = false;
        state.loginCode = action.payload.status;
        state.user = action.payload.data.data_user;
        state.token = action.payload.data.accesToken;
        state.message = action.payload.msg;
      })
      .addCase(authRegister.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = true;
        state.loginCode = false;
      })
      .addMatcher(
        isAnyOf(authLogout.fulfilled, authLogout.rejected),
        (state) => {
          state.isLoading = false;
          state.user = null;
          state.token = '';
          state.error = false;
          state.message = '';
          state.loginCode = false;
        },
      );
  },
});

export const { setDataUser, setAuthLoading, setToken } = authSlice.actions;

const authReducer = authSlice.reducer;

export default authReducer;
