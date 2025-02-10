import axios, { type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';
import { DEFAULT_REQUEST_TIMEOUT_IN_MS, getAuthTokenCookie } from '.';

const httpClient = axios.create({
  baseURL: '/api',
  timeout: DEFAULT_REQUEST_TIMEOUT_IN_MS,
  withCredentials: true,
  withXSRFToken: true,
  headers: {
    Accept: 'application/json'
  }
});

httpClient.interceptors.response.use(
  (value: AxiosResponse<any, any>) => {
    return value;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

httpClient.interceptors.request.use(
  (value: InternalAxiosRequestConfig<any>) => {
    value.headers.authorization = getAuthTokenCookie;
    return value;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

export default httpClient;
