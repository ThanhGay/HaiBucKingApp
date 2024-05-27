// import { apiGetListNotification } from '@/api/auth';
import { apiGetComingSoon, apiGetNowPlaying } from '@/api/movie';
import { apiGetListTicket } from '@/api/ticket';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface UserState {
    listNotification: Array<any>;
    listTicket: Array<any>;
    listNowPlaying: Array<any>;
    listComingSoon: Array<any>;
}

export const getListNotification = createAsyncThunk(
    'user/getListNotification',
    async (args: { token: string }) => {
        const res = await apiGetListNotification(args);
        if (res.status) {
            return res.data;
        }
    },
);

export const getListTicket = createAsyncThunk('user/getListTicket', async (args: { token: string }) => {
    const res = await apiGetListTicket(args);
    if (res.status) return res.data;
});

export const getListNowPlaying = createAsyncThunk('user/getListNowPlaying', async () => {
    const res = await apiGetNowPlaying();
    if (res.status) return res.data;
});

export const getListComingSoon = createAsyncThunk('user/getListComingSoon', async () => {
    const res = await apiGetComingSoon();
    if (res.status) return res.data;
});

const initialState: UserState = {
    listNotification: [],
    listTicket: [],
    listNowPlaying: [],
    listComingSoon: [],
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addTicket: (state, action: PayloadAction<any>) => {
            state.listTicket = [action.payload, ...state.listTicket];
        },
    },
    extraReducers: (builder) => {
        builder
            // .addCase(
            //     getListNotification.fulfilled,
            //     (state, action: PayloadAction<any>) => {
            //         state.listNotification = action.payload;
            //     },
            // )
            .addCase(getListTicket.fulfilled, (state, action: PayloadAction<any>) => {
                const formatListTicket: any[] = [];

                const rtnData = action.payload;
                rtnData.forEach((element: any) => {
                    const splitIndex = element.StartTime.indexOf('T');
                    const formatTicket = {
                        ...element,
                        Date: element.StartTime.slice(0, splitIndex),
                        Time: element.StartTime.slice(splitIndex + 1, splitIndex + 6),
                    };
                    formatListTicket.push(formatTicket);
                });

                state.listTicket = formatListTicket;
            })
            .addCase(getListNowPlaying.fulfilled, (state, action: PayloadAction<any>) => {
                state.listNowPlaying = action.payload;
            })
            .addCase(getListComingSoon.fulfilled, (state, action: PayloadAction<any>) => {
                state.listComingSoon = action.payload;
            });
    },
});

export const { addTicket } = userSlice.actions;

const userReducer = userSlice.reducer;

export default userReducer;
