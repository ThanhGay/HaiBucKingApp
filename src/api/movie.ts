import axiosClient from '../utils/axiosClient';
import { LOCALHOST, PORT } from '../../port';

const Movie_URL = `http://${LOCALHOST}:${PORT}/movie`;

// lấy danh sách ComingSoon
export const apiGetComingSoon = async (): Promise<{
  status: boolean;
  data: Array<any>;
  msg: string;
}> => {
  const url = `${Movie_URL}/coming-soon`;
  const data = axiosClient
    .get(url)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log('error in fetch data coming soon: ', error);
    });

  return data ?? {};
};

// lấy danh sách NowPlaying
export const apiGetNowPlaying = async (): Promise<{
  status: boolean;
  data: Array<any>;
  msg: string;
}> => {
  const url = `${Movie_URL}/now-playing`;
  const data = axiosClient
    .get(url)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log('error in fetch data now playing: :', error);
    });

  return data ?? {};
};

// lấy thông tin chi tiết phim
export const apiDetailMovie = (args: {
  movieId: string;
}): Promise<{
  status: boolean;
  data: Array<any>;
  msg: string;
}> => {
  const url = `${Movie_URL}/detail-movie/${args.movieId}`;
  const data = axiosClient
    .get(url)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log('error in fetch data detail movie: :', error);
    });

  return data ?? {};
};

// lấy danh sách lịch chiếu theo phim
export const apiGetShowTimesMovie = async (args: {
  movieId: string;
}): Promise<{ status: boolean; data: Array<any>; msg: string }> => {
  const url = `${Movie_URL}/showtimes`;
  const form = JSON.stringify({
    Movie_Id: args.movieId,
  });
  const data = axiosClient
    .post(url, form)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log('error in fetch api showtimes', error);
    });

  return data ?? {};
};

// tìm kiếm phim theo tên
export const searchByMovieName = async (args: { name: string }) => {
  const { name } = args;
  const url = `${Movie_URL}/search-movie/${name}`;
  const data = axiosClient
    .get(url)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log('error in fetch data in search by movie name:', error);
    });

  return data ?? {};
};
