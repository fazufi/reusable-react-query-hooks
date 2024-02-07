import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { anyGetParams, listParams, listResult, mutationParams } from './types';
import { handleError, queryParamsToQs } from './helpers';
import { useApi } from './hooks';

export const useApiList = (
  table: string,
  { queryParams = {}, skip = false, isPublic = false }: listParams = {}
) => {
  const queryString = queryParamsToQs(queryParams);
  const { api, session } = useApi();
  const { status } = session;
  const enabled = isPublic ? !skip : status == 'authenticated' && !skip;
  return useQuery({
    queryKey: [table, queryString],
    queryFn: async (): Promise<listResult> => {
      const { data } = await api.get(`${table}${queryString}`);
      return data;
    },
    enabled,
    placeholderData: (previousData) => previousData,
    throwOnError: handleError,
    refetchOnWindowFocus: false,
  });
};

export const useApiRead = (
  table: string,
  id: string | number,
  { queryParams = {}, skip = false, isPublic = false }: listParams = {}
) => {
  const queryString = queryParamsToQs(queryParams);
  const { api, session } = useApi();
  const { status } = session;
  const enabled = isPublic ? !skip : status == 'authenticated' && !skip;
  return useQuery({
    queryKey: [`${table}-${id}`, queryString],
    queryFn: async (): Promise<listResult> => {
      const { data } = await api.get(`${table}${queryString}`);
      return data;
    },
    enabled,
    placeholderData: (previousData) => previousData,
    throwOnError: handleError,
    refetchOnWindowFocus: false,
  });
};

export const useApiPost = (
  table: string,
  { invalidateKeys = [] }: mutationParams
) => {
  const queryClient = useQueryClient();
  const { api, session } = useApi();
  const { status } = session;
  return useMutation({
    mutationFn: async (payload: any) => {
      return await api.post(`${table}`, payload);
    },
    onSuccess: (data, variables, context) => {
      const init_queryKey = [table];
      const queryKey = init_queryKey.concat(invalidateKeys);

      queryClient.invalidateQueries({ queryKey });
    },
    onError: handleError,
  });
};

export const useApiPatch = (
  table: string,
  { invalidateKeys = [] }: mutationParams
) => {
  const queryClient = useQueryClient();
  const { api, session } = useApi();
  const { status } = session;
  return useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: string | number;
      payload: any;
    }) => {
      return await api.patch(`${table}/${id}`, payload);
    },
    onSuccess: (data, variables, context) => {
      const init_queryKey = [`${table}-${variables.id}`];
      const queryKey = init_queryKey.concat(invalidateKeys);

      queryClient.invalidateQueries({ queryKey });
    },
    onError: handleError,
  });
};

export const useApiDelete = (
  table: string,
  { invalidateKeys = [] }: mutationParams
) => {
  const queryClient = useQueryClient();
  const { api, session } = useApi();
  const { status } = session;
  return useMutation({
    mutationFn: async (id: string | number) => {
      return await api.delete(`${table}/${id}`);
    },
    onSuccess: (data, id, context) => {
      const init_queryKey = [`${table}-${id}`];
      const queryKey = init_queryKey.concat(invalidateKeys);

      queryClient.invalidateQueries({ queryKey });
    },
    onError: handleError,
  });
};

// >> FOR DYNAMIC TYPES:
export const useApiAnyGet = (
  table: string,
  { queryParams = {}, skip = false, isPublic = false }: anyGetParams = {}
) => {
  const queryString = queryParamsToQs(queryParams);
  const { api, session } = useApi();
  const { status } = session;
  const enabled = isPublic ? !skip : status == 'authenticated' && !skip;
  return useQuery({
    queryKey: [table, queryString],
    queryFn: async () => {
      const { data } = await api.get(`${table}${queryString}`);
      return data;
    },
    enabled,
    placeholderData: (previousData) => previousData,
    throwOnError: handleError,
    refetchOnWindowFocus: false,
  });
};
