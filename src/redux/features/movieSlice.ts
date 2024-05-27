import {
  apiDetailMovie,
  apiGetComingSoon,
  apiGetNowPlaying,
  apiGetShowTimesMovie,
} from '@/api/movie';
import { formatDate, transformDataMovie } from '@/utils/hooks';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface MovieState {
  detailMovie: MovieModel | any;
  listComingSoon: Array<any> | Array<null>;
  listNowPlaying: Array<any> | Array<null>;
  listShowTimesMovie: Array<any> | Array<null>;
  isLoading: boolean;
}

const initialState: MovieState = {
  detailMovie: {},
  listComingSoon: [],
  listNowPlaying: [],
  listShowTimesMovie: [],
  isLoading: true,
};

export const getDetailMovie = createAsyncThunk(
  'movie/getDetail',
  async (args: { movieId: string }) => {
    const res = await apiDetailMovie(args);
    return res.data;
  },
);
export const getComingSoon = createAsyncThunk(
  'movie/getComingSoon',
  async () => {
    const res = await apiGetComingSoon();
    return res.data;
  },
);
export const getNowPlaying = createAsyncThunk(
  'movie/getListTicket',
  async () => {
    const res = await apiGetNowPlaying();
    return res.data;
  },
);
export const getShowTimesMovie = createAsyncThunk(
  'movie/getShowTimesMovie',
  async (args: { movieId: string }) => {
    const res = await apiGetShowTimesMovie(args);
    return res.data;
  },
);

export const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    setInvoiceId: (state, action: PayloadAction<number>) => {
      state.detailMovie.id = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDetailMovie.pending, (state, action: PayloadAction<any>) => {
        state.isLoading = true;
      })
      .addCase(
        getDetailMovie.fulfilled,
        (state, action: PayloadAction<any>) => {
          const formatMovie = transformDataMovie(action.payload);
          const _movie = {
            ...formatMovie,
            Release: formatDate(formatMovie.Release),
          };
          state.detailMovie = _movie;
          state.detailMovie.actors = JSON.parse(_movie.Actor);
          state.detailMovie.directors = JSON.parse(_movie.Director);
          state.isLoading = false;
        },
      )
      .addCase(getDetailMovie.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
      })

      .addCase(getComingSoon.pending, (state, action: PayloadAction<any>) => {
        state.isLoading = true;
      })
      .addCase(getComingSoon.fulfilled, (state, action: PayloadAction<any>) => {
        state.listComingSoon = action.payload;
        state.isLoading = false;
      })
      .addCase(getComingSoon.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
      })

      .addCase(getNowPlaying.pending, (state, action: PayloadAction<any>) => {
        state.isLoading = true;
      })
      .addCase(getNowPlaying.fulfilled, (state, action: PayloadAction<any>) => {
        console.log(action.payload);
        
        state.listNowPlaying = action.payload;
        state.isLoading = false;
      })
      .addCase(getNowPlaying.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
      })

      .addCase(
        getShowTimesMovie.pending,
        (state, action: PayloadAction<any>) => {
          state.isLoading = true;
        },
      )
      .addCase(
        getShowTimesMovie.fulfilled,
        (state, action: PayloadAction<any>) => {
            const cleanData = action.payload.map((item: any) => {
                const startTime = new Date(item.StartTime);
                const date = startTime.toISOString().split('T')[0];
                const time = startTime.toISOString().split('T')[1].substring(0, 5);
                return { date, time };
            });            
            state.listShowTimesMovie = cleanData;
            state.isLoading = false;
        },
      )
      .addCase(
        getShowTimesMovie.rejected,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
        },
      );
  },
});

export const {} = movieSlice.actions;

const movieReducer = movieSlice.reducer;

export default movieReducer;
