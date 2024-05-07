import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface TicketState {
  invoiceId: number;
  movieId: string;
  movieName: string;
  duration: number;
  categories: string;
  poster: string;
  invoiceDate: string;
  seats: Array<string>;
  room: string;
  amount: number;
  showtime: any;
}

const initialState: TicketState = {
  invoiceId: -1,
  movieId: '',
  movieName: '',
  duration: 0,
  categories: '',
  poster: '',
  invoiceDate: '',
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
    setInvoiceDate: (state, action: PayloadAction<string>) => {
      state.invoiceDate = action.payload;
    },
    setMovieId: (state, action: PayloadAction<string>) => {
      state.movieId = action.payload;
    },
    setMovieName: (state, action: PayloadAction<string>) => {
      state.movieName = action.payload;
    },
    setDuration: (state, action: PayloadAction<number>) => {
      state.duration = action.payload;
    },
    setMovieCategories: (state, action: PayloadAction<string>) => {
      state.categories = action.payload;
    },
    setMoviePoster: (state, action: PayloadAction<string>) => {
      state.poster = action.payload;
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
  setDuration,
  setInvoiceDate,
  setMovieCategories,
  setMovieName,
  setMoviePoster,
} = ticketSlice.actions;

const ticketReducer = ticketSlice.reducer;

export default ticketReducer;
