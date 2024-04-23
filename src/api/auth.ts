import { postWithToken, putWithToken } from '@/utils';
import { LOCALHOST, PORT } from '../../port';
import axiosClient from './axiosClient';

const Account_URL = `http://${LOCALHOST}:${PORT}/account`;

// sign in
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

// đăng nhập
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
  phoneNumber: string;
  password: string;
  newPassword: string;
  token: string;
}): Promise<{ status: boolean; data: Array<any>; msg: string }> => {
  const url = `${Account_URL}/change-password`;
  const form = JSON.stringify({
    PhoneNumber: args.phoneNumber,
    Password: args.password,
    NewPassword: args.newPassword,
  });
  const { token } = args;
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

  const data = axiosClient.put(url, form);

  return data ?? {};
};
