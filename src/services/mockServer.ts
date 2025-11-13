import type { Employee, EmployeeInfo } from '@/types/employees';
import { employees as employeesData, createEmployee } from '@/core/utils/employeeDataBuilder';
import { useEmployeeValidation } from '@/core/composables/useEmployeeValidation';

let employees: Employee[] = employeesData;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockServer = {
  async getEmployees() {
    await delay(500);
    return {
      data: [...employees],
      status: 200,
    };
  },

  async addEmployee(data: string) {
    await delay(300);
    const employeeInfo = JSON.parse(data);
    const isDataValild = useEmployeeValidation().validateEmployee(employeeInfo);
    if (!isDataValild)
      return {
        status: 404,
        body: { error: 'Bad request' },
      };
    const newEmployee = createEmployee(employeeInfo);
    employees.push(newEmployee);

    return {
      data: newEmployee,
      status: 201,
    };
  },

  async deleteEmployee(id: string) {
    await delay(300);

    const index = employees.findIndex((emp) => emp.id === id);

    if (index === -1) {
      throw new Error('Employee not found');
    }

    employees.splice(index, 1);

    return {
      data: null,
      status: 200,
    };
  },
};
