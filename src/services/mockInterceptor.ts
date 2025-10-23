import { mockServer } from './mockServer';

// Проверяем, нужно ли использовать моки
const shouldUseMocks = import.meta.env.DEV; // Только в development

export const setupMockInterceptor = (axiosInstance: any) => {
  if (!shouldUseMocks) return; // На продакшене используем реальный сервер

  // Перехватываем запросы к API
  axiosInstance.interceptors.request.use((config: any) => {
    // Если это запрос к нашему API, перехватываем его
    if (config.url?.includes('/api/employees')) {
      config.adapter = async () => {
        try {
          let response;
          
          if (config.method === 'get' && config.url === '/api/employees') {
            response = await mockServer.getEmployees();
          } 
          else if (config.method === 'post' && config.url === '/api/employees') {
            response = await mockServer.addEmployee(config.data);
          }
          else if (config.method === 'delete' && config.url?.includes('/api/employees/')) {
            const id = config.url.split('/').pop();
            response = await mockServer.deleteEmployee(id);
          }
          else {
            // Для других маршрутов пропускаем запрос
            return config;
          }
          
          return {
            data: response.data,
            status: response.status,
            statusText: 'OK',
            headers: {},
            config
          };
        } catch (error) {
          return Promise.reject(error);
        }
      };
    }
    
    return config;
  });
};