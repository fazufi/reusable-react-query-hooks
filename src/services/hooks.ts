import axios from 'axios';
import { useSession } from 'next-auth/react';
import { baseURL } from './helpers';

export const useApi = () => {
  const session: any = useSession();
  const { status, data } = session || {};
  const { access_token, refresh_token } = data?.token || {};

  const config: any = {
    baseURL,
  };
  if (access_token) {
    config.headers['Authorization'] = `Bearer ${access_token}`;
  }

  const axiosInstance = axios.create(config);

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      return Promise.reject(error);
    }
  );

  return { api: axiosInstance, session };
};
