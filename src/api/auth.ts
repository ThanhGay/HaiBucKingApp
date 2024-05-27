import axiosClient from '../utils/axiosClient';
import { getWithToken, postWithToken, putWithToken } from '@/utils';
import { LOCALHOST, PORT } from '../../port';

const Account_URL = `http://${LOCALHOST}:${PORT}/account`;

// đăng nhập
export const apiSignIn = async (args: {
  phoneNumber: string;
  password: string;
}): Promise<{
  status: boolean;
  data: Array<any>;
  msg: string;
}> => {
  const form = JSON.stringify({
    PhoneNumber: args.phoneNumber,
    Password: args.password,
  });

  const url = `${Account_URL}/sign-in`;

  const data = await axiosClient
    .post(url, form)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });

  return data ?? {};
};

// đăng ký
export const apiSignUp = async (args: {
  phoneNumber: string;
  password: string;
  fullname: string;
  email: string;
  dob: Date;
}): Promise<{ status: boolean; data: Array<any>; msg: string }> => {
  const form = JSON.stringify({
    PhoneNumber: args.phoneNumber,
    Password: args.password,
    FullName: args.fullname,
    Email: args.email,
    DateOfBirth: args.dob,
  });

  const url = `${Account_URL}/sign-up`;

  const data = await axiosClient
    .post(url, form)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });

  return data ?? {};
};

// đăng xuất
export const apiSignOut = async (): Promise<{
  status: boolean;
  data: Array<any>;
  msg: string;
}> => {
  const url = `${Account_URL}/sign-out`;
  const data = axiosClient
    .post(url)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
  return data ?? {};
};

// đổi mật khẩu
export const apiChangePassword = async (args: {
  password: string;
  newPassword: string;
  token: string;
}): Promise<{ status: boolean; data: Array<any>; msg: string }> => {
  const { token } = args;
  const url = `${Account_URL}/change-password`;
  const form = JSON.stringify({
    Password: args.password,
    NewPassword: args.newPassword,
  });
  return putWithToken({ url, data: form, token });
};

// đặt lại mật khẩu
export const apiResetPassword = async (args: {
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}) => {
  const url = `${Account_URL}/forgot-password`;
  const form = JSON.stringify({
    PhoneNumber: args.phoneNumber,
    Password: args.password,
    ConfirmPassword: args.confirmPassword,
  });

  const data = axiosClient
    .put(url, form)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });

  return data ?? {};
};

// xóa tài khoản

// Chỉnh sửa thông tin tài khoản
export const apiEditProfile = (args: {
  token: string;
  data: any;
}): Promise<{ status: boolean; data: Array<any>; msg: string }> => {
  const { token, data } = args;
  const url = `${Account_URL}/edit-profile`;

  return putWithToken({ url, data, token });
};

// Danh sách thông báo
// export const apiGetListNotification = (args: {
//   token: string;
// }): Promise<{ status: boolean; data: Array<any>; msg: string }> => {
//   const { token } = args;
//   const url = `${Account_URL}/notification`;
//   return getWithToken({ url, token });
// };
