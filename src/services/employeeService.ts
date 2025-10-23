import { employees as employeesData, createEmployee } from '@/core/utils/employeeDataBuilder';
import type { EmployeeInfo, Employee } from '@/types/employees';
import { useEmployeeValidation } from '@/core/composables/useEmployeeValidation'



 interface MockResponse {
  status: number;
  body: { data?: any, error?: string };
}

export class MockServer {

  private static employees: Employee[] = employeesData;

  public static async handleRequest(
    url: string,
    method: string,
    body?: any,
  ): Promise<MockResponse> {
    if (method === 'GET' && url === '/api/employees') {
      return {
        status: 200,
        body: {
          data: this.employees,
        },
      };
    }
    else if (method === 'POST' && url === '/api/employees' && body) { 
        const isDataValild = useEmployeeValidation().validateEmployee(body as EmployeeInfo);
        if (!isDataValild) 
          return  {
                    status: 404,
                    body: { error: 'Bad request' },
                  };
        const newEmployee = createEmployee(body);
        this.employees.push(newEmployee);
     }
    else if (method === 'DELETE' && url.startsWith('/api/employees/')) { 
      const id = url.split('/').pop();
      const employee = this.employees.findIndex(e => e.id === id);
        if (!employee) throw { status: 404, body: { success: false, error: 'Employee not found' } };
        this.employees.splice(employee)
     }
    return {
      status: 405,
      body: { error: 'Method Not Allowed' },
    };
  }
}