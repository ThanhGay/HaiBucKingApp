//  import { apiGetListNotification } from '@/api/auth';
import { apiGetNotification } from '@/api/ticket';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface UserState {
  listNotification: Array<any>;
}

export const getListNotification = createAsyncThunk(
  'user/getListNotification',
  async (args: { token: string }) => {
    const res = await apiGetNotification(args);
    if (res.status) {
      return res.data;
    }
  },
);

const initialState: UserState = {
  listNotification: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(
        getListNotification.fulfilled,
        (state, action: PayloadAction<any>) => {
            state.listNotification = action.payload;
        },
    )
  },
});

export const {} = userSlice.actions;

const userReducer = userSlice.reducer;

export default userReducer;
