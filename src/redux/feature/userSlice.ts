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

export const getListTicket = createAsyncThunk(
  'user/getListTicket',
  async (args: { token: string }) => {
    const res = await apiGetListTicket(args);
    if (res.status) {
      return res.data;
    }
  },
);

export const getListNowPlaying = createAsyncThunk(
  'user/getListNowPlaying',
  async () => {
    const res = await apiGetNowPlaying();
    if (res.status) return res.data;
  },
);

export const getListComingSoon = createAsyncThunk(
  'user/getListComingSoon',
  async () => {
    const res = await apiGetComingSoon();
    if (res.status) return res.data;
  },
);

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
    setListTicket: (state, action: PayloadAction<any>) => {
      state.listTicket = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        getListNotification.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.listNotification = action.payload;
        },
      )
      .addCase(
        getListTicket.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.listTicket = action.payload;
        },
      )
      .addCase(
        getListNowPlaying.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.listNowPlaying = action.payload;
        },
      )
      .addCase(
        getListComingSoon.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.listComingSoon = action.payload;
        },
      );
  },
});

export const { setListTicket } = userSlice.actions;

const userReducer = userSlice.reducer;

export default userReducer;
