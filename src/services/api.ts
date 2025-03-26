import axios, { AxiosResponse } from 'axios';
import { InternalServerError } from './apiInterageMedicamentos';
import refreshToken from './refreshToken';

// Define base URLs for different environments
const BASE_URLS = {
  production: 'https://servicesapp.pronutrir.com.br/apitasy/api/',
  test: 'https://servicesapp.pronutrir.com.br/apitasytest/api/',
  test_local: 'https://89f6-177-22-36-198.ngrok-free.app/api/'
};

// Create Axios instance with default configuration
const Api = axios.create({
  baseURL: BASE_URLS.test_local, // Default to test environment
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Response Interceptor
Api.interceptors.response.use(
  (response: AxiosResponse<unknown>) => response,
  ({ response }: { response: AxiosResponse<string> }) => {

    // Centralized error handling for specific status codes
    if ([401, 409, 500].includes(response.status)) {
      return Promise.reject(new InternalServerError(response.data));
    }

    // Generic error handling
    return Promise.reject(new InternalServerError('An unexpected error occurred.'));
  },
);

// Request Interceptor
Api.interceptors.request.use(async (req) => {
  try {
    // Check for common headers and refresh token if needed
    if (req.headers && 'common' in req.headers) {
      const tokenUpdated = await refreshToken(req.headers['common']);
      if (tokenUpdated) {
        req.headers.Authorization = `Bearer ${tokenUpdated}`;
      }
    }
  } catch (error) {
    console.error('Request Interceptor Error:', error);
    return Promise.reject(error);
  }
  return req;
});

export default Api;