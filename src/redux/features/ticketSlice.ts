import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiActiveTransaction, apiBookTicket, apiCancelBooking, apiCancelInvoice, apiCreateInvoice, apiCreateTransaction, apiGetInvoiceMoney, apiGetListTicket, apiGetReservedSeat, apiSaveInvoice } from '@/api/ticket'

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
    isLoading: boolean;
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
    isLoading: true,
};

export const getListTicket = createAsyncThunk(
    'ticker/getListTicket',
    async (args: {
        token: string;
    }) => {
        const res = await apiGetListTicket(args);
        return res.data;
    },
);
export const createInvoice = createAsyncThunk(
    'ticker/createInvoice',
    async (args: {
        token: string;
    }) => {
        const res = await apiCreateInvoice(args);
        return res.data;
    },
);
export const bookTicket = createAsyncThunk(
    'ticker/bookTicket',
    async (args: {
        invoiceId: number;
        startTime: string;
        seats: Array<string>;
        roomId: string;
        token: string;
    }) => {
        const res = await apiBookTicket(args);
        return res.data;
    },
);
export const cancelBooking = createAsyncThunk(
    'ticker/cancelBooking',
    async (args: {
        token: string;
        invoiceId: number;
    }) => {
        const res = await apiCancelBooking(args);
        return res.data;
    },
);
export const cancelInvoice = createAsyncThunk(
    'ticker/cancelInvoice',
    async (args: {
        token: string;
        invoiceId: number;
    }) => {
        const res = await apiCancelInvoice(args);
        return res.data;
    },
);
export const getInvoiceMoney = createAsyncThunk(
    'ticker/getInvoiceMoney',
    async (args: {
        token: string;
        invoiceId: number;
    }) => {
        const res = await apiGetInvoiceMoney(args);
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
    async (args: {
        startTime: string;
    }) => {
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
    'ticker/acivetransaction',
    async (args: {
        decision: number;
    }) => {
        const res = await apiActiveTransaction(args);
        return res.data;
    },
);


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
    extraReducers: (builder) => {
        builder
            .addCase(getListTicket.pending, (state, action: PayloadAction<any>) => {
                state.isLoading = true
            })
            .addCase(getListTicket.fulfilled, (state, action: PayloadAction<any>) => {
                state.isLoading = false
            })
            .addCase(getListTicket.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false
            })

            .addCase(createInvoice.pending, (state, action: PayloadAction<any>) => {
                state.isLoading = true
            })
            .addCase(createInvoice.fulfilled, (state, action: PayloadAction<any>) => {
                state.isLoading = false
            })
            .addCase(createInvoice.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false
            })

            .addCase(bookTicket.pending, (state, action: PayloadAction<any>) => {
                state.isLoading = true
            })
            .addCase(bookTicket.fulfilled, (state, action: PayloadAction<any>) => {
                state.isLoading = false
            })
            .addCase(bookTicket.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false
            })

            .addCase(cancelBooking.pending, (state, action: PayloadAction<any>) => {
                state.isLoading = true
            })
            .addCase(cancelBooking.fulfilled, (state, action: PayloadAction<any>) => {
                state.isLoading = false
            })
            .addCase(cancelBooking.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false
            })

            .addCase(cancelInvoice.pending, (state, action: PayloadAction<any>) => {
                state.isLoading = true
            })
            .addCase(cancelInvoice.fulfilled, (state, action: PayloadAction<any>) => {
                state.isLoading = false
            })
            .addCase(cancelInvoice.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false
            })

            .addCase(getInvoiceMoney.pending, (state, action: PayloadAction<any>) => {
                state.isLoading = true
            })
            .addCase(getInvoiceMoney.fulfilled, (state, action: PayloadAction<any>) => {
                state.isLoading = false
            })
            .addCase(getInvoiceMoney.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false
            })

            .addCase(saveInvoice.pending, (state, action: PayloadAction<any>) => {
                state.isLoading = true
            })
            .addCase(saveInvoice.fulfilled, (state, action: PayloadAction<any>) => {
                state.isLoading = false
            })
            .addCase(saveInvoice.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false
            })

            .addCase(getReservedSeat.pending, (state, action: PayloadAction<any>) => {
                state.isLoading = true
            })
            .addCase(getReservedSeat.fulfilled, (state, action: PayloadAction<any>) => {
                state.isLoading = false
            })
            .addCase(getReservedSeat.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false
            })

            .addCase(createTransaction.pending, (state, action: PayloadAction<any>) => {
                state.isLoading = true
            })
            .addCase(createTransaction.fulfilled, (state, action: PayloadAction<any>) => {
                state.isLoading = false
            })
            .addCase(createTransaction.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false
            })

            .addCase(activeTransaction.pending, (state, action: PayloadAction<any>) => {
                state.isLoading = true
            })
            .addCase(activeTransaction.fulfilled, (state, action: PayloadAction<any>) => {
                state.isLoading = false
            })
            .addCase(activeTransaction.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false
            })
    }

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
