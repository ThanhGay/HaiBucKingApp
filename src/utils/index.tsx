import axios from "axios";

export const sendPostWithToken = async (args: {
  url: string;
  data?: { [key: string]: string | Blob };
  token: string;
}) => {
  const { url, data, token } = args;
  try {
    // Thực hiện gọi API
    const response = await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Xử lý kết quả trả về
    return response.data;
  } catch (error) {
    // Xử lý lỗi nếu có
    console.error('Error during API call:', error);
    throw error;
  }
};

export const getWithToken = async ({
  url,
  token,
}: {
  url: string;
  token?: string;
}) => {
  try {
    // Thực hiện gọi API
    const response = await axios.get(url, {
      headers: {
        // Thêm Authorization header với token
        Authorization: `Bearer ${token}`,
      },
    });

    // Xử lý kết quả trả về
    return response.data;
  } catch (error) {
    // Xử lý lỗi nếu có
    console.error('Error during API call:', error);
    throw error;
  }
};
