import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface TIcketState {
  ticketId: string;
  movieId: string;
  seats: Array<string>;
  amount: number;
  showtime: any;
}

const initialState: TIcketState = {
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
      state.amount = action.payload.length * 50000;
    },
    setShowtime: (state, action: PayloadAction<any>) => {
      state.showtime = action.payload;
    },
  },
});

export const { setTicketId, setMovieId, setSeats, setShowtime } =
  ticketSlice.actions;

const ticketReducer = ticketSlice.reducer;

export default ticketReducer;
