import { apiCreateInvoice } from '@/api/ticket';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface TicketState {
  ticketId: string;
  movieId: string;
  seats: Array<string>;
  amount: number;
  showtime: any;
}

const initialState: TicketState = {
  ticketId: '',
  movieId: '',
  seats: [],
  amount: 0,
  showtime: null,
};

export const ticketSlice = createSlice({
  name: 'ticket',
  initialState,
  reducers: {
    setTicketId: (state, action: PayloadAction<string>) => {
      state.ticketId = action.payload;
    },
    setMovieId: (state, action: PayloadAction<string>) => {
      state.movieId = action.payload;
    },

    setSeats: (state, action: PayloadAction<Array<string>>) => {
      state.seats = action.payload;
    },
    setAmount: (state, action: PayloadAction<number>) => {
      state.amount = action.payload;
    },
    setShowtime: (state, action: PayloadAction<any>) => {
      state.showtime = action.payload;
    },
  },
});

export const { setTicketId, setMovieId, setSeats, setAmount, setShowtime } =
  ticketSlice.actions;

const ticketReducer = ticketSlice.reducer;

export default ticketReducer;
