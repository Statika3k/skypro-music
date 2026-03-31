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

type accessTokenProps = {
  access: string;
};

type refreshTokenProps = {
  refresh: string;
};

type tokensType = accessTokenProps & refreshTokenProps;

export const authUser = (data: authUserProps): Promise<authUserReturn> => {
  return axios
    .post(BASE_URL + '/user/login/', data, {
      headers: {
        'content-type': 'application/json',
      },
    })
    .then((res) => res.data);
};

export const registerUser = (
  data: registerUserProps,
): Promise<registerUserReturn> => {
  return axios
    .post(BASE_URL + '/user/signup/', data, {
      headers: {
        'content-type': 'application/json',
      },
    })
    .then((res) => res.data);
};

export const getToken = (data: authUserProps): Promise<tokensType> => {
  return axios
    .post(BASE_URL + '/user/token/', data, {
      headers: {
        'content-type': 'application/json',
      },
    })
    .then((res) => res.data);
};

export const refreshToken = (refresh: string) => {
  return axios
    .post(
      BASE_URL + '/user/token/refresh',
      { refresh },
      {
        headers: {
          'content-type': 'application/json',
        },
      },
    )
    .then((res) => res.data);
};
