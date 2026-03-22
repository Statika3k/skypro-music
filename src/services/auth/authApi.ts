import axios from 'axios';
import { BASE_URL } from '../constants';

type authUserProps = {
  email: string;
  password: string;
};

type authUserReturn = {
  email: string;
  username: string;
  _id: number;
};

type registerUserProps = {
  username: string;
  email: string;
  password: string;
};

type registerUserReturn = {
  message: string;
  result: {
    username: string;
    email: string;
    _id: number;
  };
  success: boolean;
};

type tokenReturn = {
  access: string;
  refresh: string;
};

type refreshTokenProps = {
  refresh: string
}

export const authUser = (data: authUserProps): Promise<authUserReturn> => {
  return axios.post(BASE_URL + '/user/login/', data, {
    headers: {
      'content-type': 'application/json',
    },
  });
};

export const registerUser = (
  data: registerUserProps,
): Promise<registerUserReturn> => {
  return axios.post(BASE_URL + '/user/signup/', data, {
    headers: {
      'content-type': 'application/json',
    },
  });
};

export const getToken = (data: authUserProps): Promise<tokenReturn> => {
  return axios.post(BASE_URL + '/user/token/', data, {
    headers: {
      'content-type': 'application/json',
    },
  });
};

export const refreshToken = (data: refreshTokenProps) => {
  return axios.post(
    BASE_URL + '/user/token/',
    data,
    {
      headers: {
        'content-type': 'application/json',
      },
    },
  );
};
