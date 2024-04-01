import { createSlice } from "@reduxjs/toolkit"

export interface AuthState {
    user: any,
    token: string,
}

const initialState: AuthState = {
    user: null,
    token: '',
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