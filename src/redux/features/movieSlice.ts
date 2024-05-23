import { apiDetailMovie } from '@/api/movie';
import { formatDate, transformDataMovie } from '@/utils/hooks';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface MovieState {
  id: string;
  name: string;
  duration: number;
  censorship: number;
  language: string;
  release: string;
  expiration: string;
  description: string;
  poster: string;
  categories: string;
  directors: Array<string> | null;
  imageDirectors: Array<string> | Array<null>;
  actors: Array<string> | null;
  imageActors: Array<string> | Array<null>;
  movie: any;
}

export const getDetailMovie = createAsyncThunk(
  'movie/getDetail',
  async (args: { movieId: string }) => {
    const res = await apiDetailMovie(args);
    console.log(args,'dataRes1:',res);
    if (res.status) {
      const formatMovie = transformDataMovie(res.data);
      const _movie = {
        ...formatMovie,
        Release: formatDate(formatMovie.Release),
      };
      return _movie;
    }
  },
);

const initialState: MovieModel = {
  id: '',
  name: '',
  duration: 0,
  censorship: 0,
  language: '',
  release: '',
  expiration: '',
  description: '',
  poster: '',
  categories: '',
  directors: [],
  imageDirectors: [],
  actors: [],
  imageActors: [],
  // movie: null
};

export const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDetailMovie.pending, () => {
        console.log('pending');
      })
      .addCase(
        getDetailMovie.fulfilled,
        (state, action: PayloadAction<any>) => {
          console.log('success', action.payload);

          state.id = action.payload.Movie_Id;
          state.name = action.payload.Movie_Name;
          state.duration = action.payload.Duration;
          state.censorship = action.payload.Censorship;
          state.language = action.payload.Language;
          state.release = action.payload.Release;
          state.description = action.payload.Description;
          state.poster = action.payload.Poster;
          state.categories = action.payload.Categories;
          state.directors = action.payload.Director;
          state.imageDirectors = action.payload.imageDirector;
          state.actors = action.payload.Actor;
          state.imageActors = action.payload.imageActor;
        },
      )
      .addCase(getDetailMovie.rejected, () => {
        console.log('rejected');
      });
  },
});

export const {} = movieSlice.actions;

const movieReducer = movieSlice.reducer;

export default movieReducer;
