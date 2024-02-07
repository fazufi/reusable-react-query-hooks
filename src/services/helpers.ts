import * as qs from 'qs';
import { error, queryParams } from './types';
import { toast } from 'react-toastify';
import { signOut } from 'next-auth/react';

export const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const queryParamsToQs = (queryParams: queryParams = {}): string => {
  const withParams = Object.keys(queryParams)?.length;
  const queryString = withParams
    ? '?' +
      qs.stringify(queryParams, {
        arrayFormat: 'indices',
        encode: false,
        format: 'RFC3986',
      })
    : '';
  return queryString;
};

export const qsToQueryParams = (queryString: string): queryParams => {
  const parsedParams = qs.parse(queryString, {
    ignoreQueryPrefix: true,
  }) as queryParams;

  return parsedParams;
};

export const handleError = (error: error) => {
  const { response } = error;

  if (response && response.status === 401) {
    signOut({ redirect: false });
  }

  const { message } = error?.response?.data || {};
  toast.error(message);
  return true;
};
