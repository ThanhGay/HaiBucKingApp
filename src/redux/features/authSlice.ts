import { apiSignIn, apiSignOut, apiSignUp } from '@/api/auth';
import {
  PayloadAction,
  createAsyncThunk,
  createSlice,
  isAnyOf,
} from '@reduxjs/toolkit';
import { useAppDispatch } from '../hooks';

export interface AuthState {
  user: any;
  token: string;
  loading: boolean;
  loginCode: number | null; // 0 - failed, 1 - success
  message: string;
}

export const authLogin = createAsyncThunk(
  'auth/login',
  async (args: { phoneNumber: string; password: string }) => {
    const dataRes = await apiSignIn(args);
    
    return dataRes.status
      ? {
          ...dataRes,
          loginCode: 1,
        }
      : {
          loginCode: 0,
        };
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
    const dataRes = await apiSignUp(args);

    return dataRes.status
      ? {
          ...dataRes.data,
          loginCode: 1,
        }
      : {
          loginCode: 0,
        };
  },
);

export const authLogout = createAsyncThunk('auth/logout', async () => {
  const dataRes = await apiSignOut();
  return dataRes;
});

const initialState: AuthState = {
  user: null,
  token: '',
  loading: false,
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
      state.loading = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authLogin.pending, (state, action: PayloadAction<any>) => {
        state.loading = true;
      })
      .addCase(authLogin.fulfilled, (state, action: PayloadAction<any>) => {
        state.loginCode = 1;
        const dispatch = useAppDispatch()
        dispatch(setDataUser(action.payload.data.data_user));
        state.user = action.payload.data.data_user;
        state.token = action.payload.data.accesToken;
        state.message = action.payload.data.message;
        state.loading = false;
      })
      .addCase(authLogin.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.user = [];
        state.token = '';
        state.message = action.payload.data.message;
        state.loginCode = 0;
      })
      .addCase(authRegister.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = true;
        state.user = action.payload?.data_user;
        state.token = action.payload.accesToken;
        state.loading = false;
      })
      .addMatcher(
        isAnyOf(authLogout.fulfilled, authLogout.rejected),
        (state) => {
          (state.loading = false), (state.user = null), (state.token = '');
        },
      );
  },
});

export const { setDataUser, setAuthLoading, setToken } = authSlice.actions;

const authReducer = authSlice.reducer;

export default authReducer;
