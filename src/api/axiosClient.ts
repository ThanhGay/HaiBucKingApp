import axios from 'axios';

const axiosClient = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.response.use(
  function (response: any) {
    response = {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
    };

    return response;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export default axiosClient;
