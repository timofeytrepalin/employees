export interface Employee {
    phone: string;
    designation: string,
    employeeCode: string,
    avatar: string,
    name: string,
    joiningDate: Date | string,
    email?: string,
    id: string
}

export type EmployeeInfo = Omit<Employee, 'id'>;

export type FieldKeys<T> = keyof T;
export type EmployeeFields = FieldKeys<Employee>;