import axios from 'axios';

export const httpService = axios.create({
  baseURL: import.meta.env.BASE_URL || '/',
  timeout: 30000,
  responseType: 'json',
});