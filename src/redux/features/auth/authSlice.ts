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
  loginCode: number | null; // 0 - failed, 1 - success
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

    return response.data;
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
  loginCode: 0,
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
        state.loginCode = 1;
        state.user = action.payload.data_user;
        state.token = action.payload.accesToken;
        state.message = action.payload.message;
        state.isLoading = false;
        state.error = false;
      })
      .addCase(authLogin.rejected, (state, action: PayloadAction<any>) => {
        console.log('xx', action.payload);

        state.loginCode = 0;
        state.isLoading = false;
        state.error = true;
        state.message = action.payload.message;
      })
      .addCase(authRegister.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = true;
        state.user = action.payload?.data_user;
        state.token = action.payload.accesToken;
        state.isLoading = false;
      })
      .addMatcher(
        isAnyOf(authLogout.fulfilled, authLogout.rejected),
        (state) => {
          (state.isLoading = false), (state.user = null), (state.token = '');
        },
      );
  },
});

export const { setDataUser, setAuthLoading, setToken } = authSlice.actions;

const authReducer = authSlice.reducer;

export default authReducer;