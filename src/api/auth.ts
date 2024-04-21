import axios from 'axios';
import { postWithToken, putWithToken } from '@/utils';
import { LOCALHOST, PORT } from '../../port';

const Account_URL = `http://${LOCALHOST}:${PORT}/Account`;

export const apiSignIn = async (args: {
  phoneNumber: string;
  password: string;
}): Promise<{
  status: boolean;
  data: Array<any>;
  msg: string;
}> => {
  // const form = new FormData();
  // form.append('email', args.email);
  // form.append('password', args.password);

  const form = JSON.stringify({
    PhoneNumber: args.phoneNumber,
    Password: args.password,
  });

  const url = `${Account_URL}/SignIn`;

  const data = await axios
    .post(url, form, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });

  return data ?? {};
};

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

  console.log(form);
  

  const url = `${Account_URL}/SignUp`;

  const data = await axios
    .post(url, form, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });

  return data ?? {};
};

export const apiSignOut = async (): Promise<{
  status: boolean;
  data: Array<any>;
  msg: string;
}> => {
  const url = `${Account_URL}/SignOut`;
  const data = axios
    .post(url)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
  return data ?? {};
};

export const apiForgotPassword = async (args: {
  phoneNumber: string;
  password: string;
  newPassword: string;
  token: string;
}): Promise<{ status: boolean; data: Array<any>; msg: string }> => {
  const url = `${Account_URL}/ChangePassword`;
  const form = JSON.stringify({
    PhoneNumber: args.phoneNumber,
    Password: args.password,
    NewPassword: args.newPassword,
  });
  const { token } = args;
  return putWithToken({ url, data: form, token });
};
