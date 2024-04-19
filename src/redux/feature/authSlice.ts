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
  loading: boolean;
  loginCode: number | null; // 0 - failed, 1 - success
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
          ...dataRes,
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
    builder.addCase(
      authLogin.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = true;
        state.user = action.payload?.data_user;
        state.token = action.payload.accesToken;
        state.loading = false;
      },
    );
    builder.addCase(
      authRegister.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = true;
        state.user = action.payload?.data_user;
        state.token = action.payload.accesToken;
        state.loading = false;
      },
    );
    builder.addCase(
      (authLogout.fulfilled),
     
      (state) => {
        (state.loading = false), (state.user = null), (state.token = '');
        console.log(state);
        
      },
    );
    builder.addCase(
      (authLogout.rejected),
      (state) => {
        (state.loading = false), (state.user = null), (state.token = '');
      },
    );
  },
});

export const { setDataUser, setAuthLoading, setToken } = authSlice.actions;

const authReducer = authSlice.reducer;

export default authReducer;
