import axiosClient from './axiosClient';
import { LOCALHOST, PORT } from '../../port';

const Movie_URL = `http://${LOCALHOST}:${PORT}/movie`;

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

export const apiGetShowTimesMovie = async (args: {
  movie_id: string;
}): Promise<{ status: boolean; data: Array<any>; msg: string }> => {
  const form = JSON.stringify({
    Movie_Id: args.movie_id,
  });
  const url = `${Movie_URL}/showtimes`;
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
