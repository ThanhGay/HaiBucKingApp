import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { apiLogin, apiLogout } from "@/api/auth";

export interface AuthState {
    user: any,
    token: string,
    loginCode: number | null,       // 0 - failed, 1 - success
}

export const authLogin = createAsyncThunk(
    'auth/login',
    async (args: { email: string; password: string }) => {
        const dataRes = await apiLogin(args);
        return dataRes.status
            ? {
                ...dataRes,
                loginCode: 1,
            }
            : {
                loginCode: 0,
            };
    }
);

export const authLogout = createAsyncThunk(
    'auth/logout',
    async (args: { token: string; data?: any; url: string }) => {
        await apiLogout(args);
    }
);

const initialState: AuthState = {
    user: null,
    token: '',
    loginCode: 0,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

    },
})

export const { } = authSlice.actions

const authReducer = authSlice.reducer

export default authReducer