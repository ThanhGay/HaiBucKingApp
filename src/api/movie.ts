import axios from 'axios';
import { postWithToken, putWithToken } from '@/utils';
import { LOCALHOST, PORT } from '../../port';

const Movie_URL = `http://${LOCALHOST}:${PORT}/movie`;

export const apiGetComingSoon = async (): Promise<{
  status: boolean;
  data: Array<any>;
  msg: string;
}> => {
  const url = `${Movie_URL}/coming-soon`;

  const data = axios
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

  const data = axios
    .get(url)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log('error in fetch data now playing: :', error);
    });

  return data ?? {};
};
