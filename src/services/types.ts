export type mutationParams = {
  invalidateKeys?: string[];
  isPublic?: boolean;
};

export type listParams = {
  queryParams?: queryParams;
  skip?: boolean;
  isPublic?: boolean;
};

export type anyGetParams = {
  queryParams?: anyGetQueryParams;
  skip?: boolean;
  isPublic?: boolean;
};

export type filterQuery = {
  search?: string;
  search_keys?: string;
  [key: string]: any;
};

export type anyGetQueryParams = {
  // EDIT SESUAI DIBUTUHKAN
  [key: string]: any;
};

export type queryParams = {
  filter?: filterQuery;
  take?: number;
  page?: number;
  sort?: string;
  select?: string;
};

export type metaResponse = {
  count: number;
  take: number;
  page: number;
  pageCount: number;
};

export type listResult = {
  data: any[];
  meta: metaResponse;
};

export type error =
  | {
      response?: {
        data?: { message?: string; [key: string]: any };
        [key: string]: any;
      };
      [key: string]: any;
    }
  | any;
