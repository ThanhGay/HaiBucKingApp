import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface TicketState {
  invoiceId: number;
  movieId: string;
  seats: Array<string>;
  room: string;
  amount: number;
  showtime: any;
}

const initialState: TicketState = {
  invoiceId: -1,
  movieId: '',
  seats: [],
  room: '',
  amount: 0,
  showtime: null,
};

export const ticketSlice = createSlice({
  name: 'ticket',
  initialState,
  reducers: {
    setInvoiceId: (state, action: PayloadAction<number>) => {
      state.invoiceId = action.payload;
    },
    setMovieId: (state, action: PayloadAction<string>) => {
      state.movieId = action.payload;
    },
    setSeats: (state, action: PayloadAction<Array<string>>) => {
      state.seats = action.payload;
    },
    setRoom: (state, action: PayloadAction<string>) => {
      state.room = action.payload;
    },
    setAmount: (state, action: PayloadAction<number>) => {
      state.amount = action.payload;
    },
    setShowtime: (state, action: PayloadAction<any>) => {
      state.showtime = action.payload;
    },
  },
});

export const {
  setInvoiceId,
  setMovieId,
  setSeats,
  setRoom,
  setAmount,
  setShowtime,
} = ticketSlice.actions;

const ticketReducer = ticketSlice.reducer;

export default ticketReducer;
