import Axios, { AxiosRequestConfig } from 'axios';
import { SagaIterator } from 'redux-saga';
import { call, cancelled } from 'redux-saga/effects';
import client from './axiosClient';

/* eslint-disable @typescript-eslint/no-explicit-any */
interface Get {
  <T = any | null, R = T>(
    url: string,
    urlParams?: any,
    config?: AxiosRequestConfig,
  ): SagaIterator<R>;
}
interface Post {
  <T = any | null, R = T>(url: string, data?: any, config?: AxiosRequestConfig): SagaIterator<R>;
}

interface Put {
  <T = any | null, R = T>(url: string, data?: any, config?: AxiosRequestConfig): SagaIterator<R>;
}

interface Patch {
  <T = any | null, R = T>(url: string, data?: any, config?: AxiosRequestConfig): SagaIterator<R>;
}
interface Delete {
  <T = any | null>(url: string, data: any, config?: AxiosRequestConfig): SagaIterator<T>;
}

export function* request(config: AxiosRequestConfig = {}): SagaIterator {
  const source = Axios.CancelToken.source();
  try {
    const result = yield call(client.request, {
      cancelToken: source.token,
      ...config,
    });
    return result.data;
  } finally {
    if (yield cancelled()) {
      source.cancel();
    }
  }
}

const get: () => Get =
() =>
  (url: string, urlParams: any = {}, config: AxiosRequestConfig = {}) =>
    request(
      {
        method: 'get',
        url,
        params: urlParams,
        ...config,
      },
    );

const post: () => Post =
  () =>
  (url, data, config = {}) =>
    request(
      {
        method: 'post',
        url,
        data,
        ...config,
      },
    );

const put: () => Put =
  () =>
  (url, data, config = {}) =>
    request(
      {
        method: 'put',
        url,
        data,
        ...config,
      },
    );

const patch: () => Patch =
  () =>
  (url, data, config = {}) =>
    request(
      {
        method: 'patch',
        url,
        data,
        ...config,
      },
    );

export const deleteRequest: () => Delete =
  () =>
  (url, data, config = {}) =>
    request(
      {
        method: 'delete',
        url,
        data,
        ...config,
      },
    );

export interface Client {
  get: Get;
  post: Post;
  patch: Patch;
  delete: Delete;
  put: Put;
}

export type TApiClient = Client;

const initClient = () => ({
  get: get(),
  post: post(),
  patch: patch(),
  put: put(),
  delete: deleteRequest(),
});

const apiClient: TApiClient = {
  ...initClient(),
};

export default apiClient;
