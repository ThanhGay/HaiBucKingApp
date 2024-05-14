import axiosClient from '../utils/axiosClient';
import { LOCALHOST, PORT } from '../../port';
import { getWithToken, postWithToken, putWithToken } from '@/utils';
const MovieAdmin_URL = `http://${LOCALHOST}:${PORT}/movie`;

// get all category
export const apiGetCategory = async () => {
  const url = `${MovieAdmin_URL}/category`;
  const data = axiosClient
    .get(url)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log('error in fetch api get category', error);
    });

  return data ?? {};
};

// create category
export const apiPostAddCategory = async (args: {
  token: string;
  categoryId: string;
  categoryName: string;
}): Promise<{ status: string; data: any; msg: string }> => {
  const token = args.token;
  const url = `${MovieAdmin_URL}/add-category`;
  const form = JSON.stringify({
    Category_Id: args.categoryId,
    Category_Name: args.categoryName,
  });
  return postWithToken({ url, data: form, token });
};

export const apiEditCategory = async (args: {
  token: string;
  cateId: string;
  cateName: string;
}): Promise<{ status: boolean; data: Array<any>; msg: string }> => {
  const token = args.token;
  const url = `${MovieAdmin_URL}/edit-category`;
  const form = JSON.stringify({
    Category_Id: args.cateId,
    Category_Name: args.cateName,
  });

  return putWithToken({ url, data: form, token });
};

// add Movie
export const apiPostMovie = async (args: {
  token: string;
  movieId: string;
  movieName: string;
  duration: number;
  censorship: number;
  language: string;
  release: string;
  expiration: string;
  poster: string;
  description: string;
  categoryId: Array<any>[];
}) => {
  const token = args.token;
  const url = `${MovieAdmin_URL}/add-movie`;
  const form = JSON.stringify({
    Movie_Id: args.movieId,
    Movie_Name: args.movieName,
    Duration: args.duration,
    Censorship: args.censorship,
    Language: args.language,
    Release: args.release,
    Expiration: args.expiration,
    Description: args.description,
    Poster: args.poster,

    Category_Id: args.categoryId,
  });
  return postWithToken({ url, data: form, token });
};

// edit Movie
export const apiPutEditMovie = async (args: {
  token: string;
  movieId: string;
  movieName: string;
  duration: number;
  censorship: number;
  language: string;
  release: string;
  expiration: string;
  poster: string;
  description: string;
  categoryId: Array<any>[];
}) => {
  const token = args.token;
  const url = `${MovieAdmin_URL}/put-movie`;
  const form = JSON.stringify({
    Movie_Id: args.movieId,
    Movie_Name: args.movieName,
    Duration: args.duration,
    Censorship: args.censorship,
    Language: args.language,
    Release: args.release,
    Expiration: args.expiration,
    Description: args.description,
    Poster: args.poster,
    Category_Id: args.categoryId,
  });
  return putWithToken({ url, data: form, token });
};


