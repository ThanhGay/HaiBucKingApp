import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiCreateTransaction, apiGetListTicket, apiGetReservedSeat } from '@/api/ticket';

export interface TicketState {
    bookingTicket: TicketModel | any;
    listTicket: Array<any> | Array<null>;
    listReservedSeat: Array<any> | Array<null>;
    detailTransaction: any;
    isLoading: boolean;
}

const initialState: TicketState = {
    bookingTicket: {},
    listTicket: [],
    listReservedSeat: [],
    detailTransaction: {},
    isLoading: true,
};

export const getListTicket = createAsyncThunk('ticker/getListTicket', async (args: { token: string }) => {
    const res = await apiGetListTicket(args);
    return res.data;
});

export const getReservedSeat = createAsyncThunk('ticker/getReservedSeat', async (args: { startTime: string }) => {
    const res = await apiGetReservedSeat(args);
    return res.data;
});

export const createTransaction = createAsyncThunk('ticker/createTransaction', async (args: { token: string; startTime: string; seatId: Array<any>; roomId: string }) => {
    const res = await apiCreateTransaction(args);
    return res.data;
});

export const ticketSlice = createSlice({
    name: 'ticket',
    initialState,
    reducers: {
        setInvoiceId: (state, action: PayloadAction<number>) => {
            state.bookingTicket.invoiceId = action.payload;
        },
        setInvoiceDate: (state, action: PayloadAction<string>) => {
            state.bookingTicket.invoiceDate = action.payload;
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
                state.listTicket = action.payload;
                state.isLoading = false;
            })
            .addCase(getListTicket.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
            })

            .addCase(getReservedSeat.pending, (state, action: PayloadAction<any>) => {
                state.isLoading = true;
            })
            .addCase(getReservedSeat.fulfilled, (state, action: PayloadAction<any>) => {
                state.listReservedSeat = action.payload;
                state.isLoading = false;
            })
            .addCase(getReservedSeat.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
            })

            .addCase(createTransaction.pending, (state, action: PayloadAction<any>) => {
                state.isLoading = true;
            })
            .addCase(createTransaction.fulfilled, (state, action: PayloadAction<any>) => {
                state.detailTransaction = action.payload;
                state.isLoading = false;
            })
            .addCase(createTransaction.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
            });
    },
});

export const { setInvoiceId, setMovieId, setSeats, setRoom, setAmount, setShowtime, setDuration, setInvoiceDate, setMovieCategories, setMovieName, setMoviePoster } = ticketSlice.actions;

const ticketReducer = ticketSlice.reducer;

export default ticketReducer;
