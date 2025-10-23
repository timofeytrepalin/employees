import axios from 'axios';
import { setupMockInterceptor } from './mockInterceptor';

export const httpService = axios.create({
  baseURL: import.meta.env.BASE_URL || '/',
  timeout: 30000,
  responseType: 'json',
});

setupMockInterceptor(httpService)

export default httpService;