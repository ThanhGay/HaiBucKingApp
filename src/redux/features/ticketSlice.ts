import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  apiActiveTransaction,
  apiCreateTransaction,
  apiGetListTicket,
  apiGetReservedSeat,
  apiSaveInvoice,
} from '@/api/ticket';

export interface TicketState {
  bookingTicket: TicketModel | any;
  listTicket: Array<any> | Array<null>;
  listReservedSeat: Array<any>;
  detailTransaction: any;
  statusTransaction: boolean;
  isLoading: boolean;
}

const initialState: TicketState = {
  bookingTicket: {},
  listTicket: [],
  listReservedSeat: [],
  detailTransaction: {},
  statusTransaction: false,
  isLoading: true,
};

export const getListTicket = createAsyncThunk(
  'ticker/getListTicket',
  async (args: { token: string }) => {
    const res = await apiGetListTicket(args);
    return res.data;
  },
);

export const saveInvoice = createAsyncThunk(
  'ticker/saveInvoice',
  async (args: {
    token: string;
    invoiceId: number;
    invoiceDate: string;
    movieName: string;
    duration: number;
    category: string;
    poster: string;
    startTime: string;
    roomId: string;
    seatId: string;
    price: number;
  }) => {
    const res = await apiSaveInvoice(args);
    return res.data;
  },
);

export const getReservedSeat = createAsyncThunk(
  'ticker/getReservedSeat',
  async (args: { startTime: string }) => {
    const res = await apiGetReservedSeat(args);
    return res.data;
  },
);

export const createTransaction = createAsyncThunk(
  'ticker/createTransaction',
  async (args: {
    token: string;
    startTime: string;
    seatId: Array<any>;
    roomId: string;
  }) => {
    const res = await apiCreateTransaction(args);
    return res.data;
  },
);

export const activeTransaction = createAsyncThunk(
  'ticker/activeTransaction',
  async (args: { decision: number }) => {
    const res = await apiActiveTransaction(args);
    return res.data;
  },
);

export const ticketSlice = createSlice({
  name: 'ticket',
  initialState,
  reducers: {
    addTicket: (state, action: PayloadAction<any>) => {
      state.listTicket = [action.payload, ...state.listTicket];
    },
    setInvoiceId: (state, action: PayloadAction<number>) => {
      state.bookingTicket.invoiceId = action.payload;
    },
    setInvoiceDate: (state, action: PayloadAction<string>) => {
      const _date = action.payload
        .replaceAll('-', '/')
        .replace('T', ' ')
        .replace('Z', '');
      state.bookingTicket.invoiceDate = _date;
    },
    setMovieId: (state, action: PayloadAction<string>) => {
      state.bookingTicket.movieId = action.payload;
    },
    setMovieName: (state, action: PayloadAction<string>) => {
      state.bookingTicket.movieName = action.payload;
    },
    setDuration: (state, action: PayloadAction<number>) => {
      state.bookingTicket.duration = action.payload;
    },
    setMovieCategories: (state, action: PayloadAction<string>) => {
      state.bookingTicket.categories = action.payload;
    },
    setMoviePoster: (state, action: PayloadAction<string>) => {
      state.bookingTicket.poster = action.payload;
    },
    setSeats: (state, action: PayloadAction<Array<string>>) => {
      state.bookingTicket.seats = action.payload;
    },
    setRoom: (state, action: PayloadAction<string>) => {
      state.bookingTicket.room = action.payload;
    },
    setAmount: (state, action: PayloadAction<number>) => {
      state.bookingTicket.amount = action.payload;
    },
    setShowtime: (state, action: PayloadAction<any>) => {
      state.bookingTicket.showtime = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getListTicket.pending, (state, action: PayloadAction<any>) => {
        state.isLoading = true;
      })
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
        state.isLoading = false;
      })
      .addCase(getListTicket.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
      })

      .addCase(saveInvoice.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(saveInvoice.fulfilled, (state) => {
        console.log('save to db');
        state.isLoading = false;
      })
      .addCase(saveInvoice.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(getReservedSeat.pending, (state, action: PayloadAction<any>) => {
        state.isLoading = true;
      })
      .addCase(
        getReservedSeat.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.listReservedSeat = action.payload[0].Reserved;
          state.bookingTicket.room = action.payload[1].Room_Id;
          state.isLoading = false;
        },
      )
      .addCase(
        getReservedSeat.rejected,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
        },
      )

      .addCase(
        createTransaction.pending,
        (state, action: PayloadAction<any>) => {
          state.isLoading = true;
        },
      )
      .addCase(
        createTransaction.fulfilled,
        (state, action: PayloadAction<any>) => {
          const _date = action.payload.InvoiceDate.replaceAll('-', '/')
            .replace('T', ' ')
            .replace('Z', '');
          state.bookingTicket.invoiceId = action.payload.Invoice_Id;
          state.bookingTicket.invoiceDate = _date;
          state.bookingTicket.amount = action.payload.TotalAmount;
          state.detailTransaction = action.payload;
          state.isLoading = false;
        },
      )
      .addCase(
        createTransaction.rejected,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
        },
      )

      .addCase(
        activeTransaction.pending,
        (state, action: PayloadAction<any>) => {
          state.isLoading = true;
        },
      )
      .addCase(
        activeTransaction.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.statusTransaction = action.payload;
          state.isLoading = false;
        },
      )
      .addCase(
        activeTransaction.rejected,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
        },
      );
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
  addTicket,
} = ticketSlice.actions;

const ticketReducer = ticketSlice.reducer;

export default ticketReducer;
