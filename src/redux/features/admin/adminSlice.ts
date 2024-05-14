import { apiGetCategory } from '@/api/movieAdmin';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AdminState {
  listCategory: Array<any>;
}

export const getListCategory = createAsyncThunk(
  'admin/getListCategory',
  async () => {
    const res = await apiGetCategory();
    return res.data;
  },
);

const initialState: AdminState = {
  listCategory: [],
};

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setListCategory: (state, action: PayloadAction<any>) => {
      state.listCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getListCategory.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.listCategory = action.payload;
      },
    );
  },
});

export const { setListCategory } = adminSlice.actions;

const adminReducer = adminSlice.reducer;

export default adminReducer;
