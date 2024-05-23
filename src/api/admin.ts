import axiosClient from '../utils/axiosClient';
import { LOCALHOST, PORT } from '../../port';
import { getWithToken, postWithToken, putWithToken } from '@/utils';

const MovieAdmin_URL = `http://${LOCALHOST}:${PORT}/movie`;
const ReportAdmin_URL = `http://${LOCALHOST}:${PORT}/report`;




// --------------------------------- REPORT ---------------------------------

// báo cáo theo khoảng thời gian
export const apiGetReportByRangeTime = async (args: {
  token: string;
  minDate: any;
  maxDate: any;
}) => {
  const token = args.token;
  const url = `${ReportAdmin_URL}/report-by-time`;
  const form = JSON.stringify({
    minDate: args.minDate,
    maxDate: args.maxDate,
  });
  return postWithToken({ url, data: form, token });
};

// báo cáo theo phim
export const apiGetReportByMovie = async (args: { token: string }) => {
  const token = args.token;
  const url = `${ReportAdmin_URL}/report-by-movie`;
  return getWithToken({ url, token });
};

// báo cáo theo quý (3 tháng)
export const apiGetReportByQuarter = async (args: {
  token: string;
  year: number;
}) => {
  const url = `${ReportAdmin_URL}/report-by-quarter`;
  const form = JSON.stringify({
    year: args.year,
  });
  const { token } = args;
  return postWithToken({ url, data: form, token });
};

// báo cáo theo khách hàng
export const apiGetReportByCustomer = async (args: {
  token: string;
  minDate: any;
  maxDate: any;
}) => {
  const url = `${ReportAdmin_URL}/report-by-customer`;
  const { token } = args;
  const form = JSON.stringify({
    minDate: args.minDate,
    maxDate: args.maxDate,
  });
  return postWithToken({ url, data: form, token });
};




// --------------------------------- CATEGORY ---------------------------------

// lấy tất cả thể loại phim
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

// tạo thể loại phim
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

// sửa thể loại phim
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

// xóa thể loại phim
export const apiDeleteCategory = async (args: {
  token: string;
  cateId: string;
}): Promise<{ status: boolean; data: Array<any>; msg: string }> => {
  const { token } = args;
  const url = `${MovieAdmin_URL}/delete-category`;
  const form = JSON.stringify({
    Category_Id: args.cateId,
  });

  return postWithToken({ url, data: form, token });
};




// --------------------------------- MOVIE ---------------------------------

// thêm phim
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

// sửa thông tin phim
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

// thêm lịch chiếu (suất chiếu)
export const apiAddMovieshow = (args: {
  token: string;
  data: Array<any>;
}): Promise<{ status: boolean; data: Array<any>; msg: string }> => {
  const { token, data } = args;
  const url = `${MovieAdmin_URL}/add-movieshow`;

  return postWithToken({ url, data, token });
};
