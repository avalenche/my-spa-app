/* eslint-disable @typescript-eslint/no-var-requires */
import axios, { AxiosInstance } from 'axios';


export type TVersion = string;

const createInstance = () =>
  axios.create({
    baseURL: 'http://localhost:4000',
    headers: {
      Accept: '*/*',
    },
  });

const client: AxiosInstance = createInstance();


export default client;
