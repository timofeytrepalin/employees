import { mockServer } from './mockServer';

// const useMocks = import.meta.env.DEV;

export const setupMockInterceptor = (axiosInstance: any) => {
  // if (!shouldUseMocks) return;

  axiosInstance.interceptors.request.use((config: any) => {
    if (config.url?.includes('/api/employees')) {
      config.adapter = async () => {
        try {
          let response;

          if (config.method === 'get' && config.url === '/api/employees') {
            response = await mockServer.getEmployees();
          } else if (config.method === 'post' && config.url === '/api/employees') {
            response = await mockServer.addEmployee(config.data);
          } else if (config.method === 'delete' && config.url?.includes('/api/employees/')) {
            const id = config.url.split('/').pop();
            response = await mockServer.deleteEmployee(id);
          } else {
            return config;
          }

          return {
            data: response.data,
            status: response.status,
            statusText: 'OK',
            headers: {},
            config,
          };
        } catch (error) {
          return Promise.reject(error);
        }
      };
    }

    return config;
  });
};
