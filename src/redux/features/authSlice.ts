import {
    apiChangePassword,
    apiSignIn,
    apiSignOut,
    apiSignUp,
    apiResetPassword,
    apiEditProfile
} from '@/api/auth';
import { useAppSelector } from '@/redux/hooks';
import {
    PayloadAction,
    createAsyncThunk,
    createSlice,
    isAnyOf,
} from '@reduxjs/toolkit';
import { getToken, setToken, deleteToken } from '@/security/token';
import { deleteUser, getUser, setUser } from '@/security/user';

export interface AuthState {
    user: any;
    token: any;
    isLoading: boolean;
    error: boolean;
    loginCode: boolean | null; // 0 - failed, 1 - success
    message: string;
}

export const authLogin = createAsyncThunk(
    'auth/login',
    async (args: {
        phoneNumber: string;
        password: string;
        isRemember: boolean;
    }) => {
        const response = await apiSignIn(args);
        return [response, args.isRemember];
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

export const authChangePassword = createAsyncThunk(
    'auth/change-password',
    async (args: { password: string; newPassword: string; token: string }) => {
        const { user } = useAppSelector((state) => state.authState);

        if (args.password.trim().localeCompare(user.Password) === 0) {
            const response = await apiChangePassword(args);
            return [response, args.newPassword];
        } else return false;
    },
);
export const resetPassword = createAsyncThunk(
    'ticker/resetPassword',
    async (args: {
        phoneNumber: string;
        password: string;
        confirmPassword: string;
    }) => {
        const res = await apiResetPassword(args);
        return res.data;
    },
);
export const editProfile = createAsyncThunk(
    'ticker/editProfile',
    async (args: {
        token: string;
        data: any
    }) => {
        const res = await apiEditProfile(args);
        return res.data;
    },
);

export const getTokenInStorage = createAsyncThunk(
    'auth/getTokenInStorage',
    async () => {
        const res = await getToken();
        return res;
    },
);

export const getUserInStorage = createAsyncThunk(
    'auth/getUserInStorage',
    async () => {
        const res = await getUser();
        return res;
    },
);

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
                state.loginCode = action.payload[0].status;
                state.user = action.payload[0].data.data_user;
                state.token = action.payload[0].data.accesToken;
                state.message = action.payload[0].msg;

                // save to encrypt storage
                if (action.payload[1] === true) {
                    setToken(action.payload[0].data.accesToken);
                    setUser(action.payload[0].data.data_user);
                }
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

                // save to encrypt storage
                setToken(action.payload.data.accesToken);
                setUser(action.payload.data.data_user);
            })
            .addCase(authRegister.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.error = true;
                state.loginCode = false;
            })
            .addCase(getUserInStorage.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(getTokenInStorage.fulfilled, (state, action) => {
                state.token = action.payload;
            })
            .addCase(authChangePassword.fulfilled, (state, action) => {
                console.log('api change password', action.payload);
            })
            .addCase(authChangePassword.rejected, (state, action) => {
                console.log('rejected API', action.payload);
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
                    deleteToken();
                    deleteUser();
                },
            );
    },
});

export const { setDataUser, setAuthLoading } = authSlice.actions;

const authReducer = authSlice.reducer;

export default authReducer;
