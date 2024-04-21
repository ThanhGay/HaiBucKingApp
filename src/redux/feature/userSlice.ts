import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface UserState {
  listNotification: Array<any>;
  listTicket: Array<any>;
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

const initialState: UserState = {
  listNotification: [],
  listTicket: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setListTicket: (state, action: PayloadAction<Array<any>>) => {
      state.listTicket = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        getListNotification.fulfilled,
        (state, action: PayloadAction<Array<any>>) => {
          state.listNotification = action.payload;
        },
      )
      .addCase(
        getListTicket.fulfilled,
        (state, action: PayloadAction<Array<any>>) => {
          state.listTicket = action.payload;
        },
      );
  },
});

export const { setListTicket } = userSlice.actions;

const userReducer = userSlice.reducer;

export default userReducer;
