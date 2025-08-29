import type { Employee } from '@/types/employees';
import { computed, type ComputedRef } from 'vue';

type ValidationResult = {
  isValid: boolean;
  error: string;
};

type EmployeeValidationResult = {
  isValid: boolean;
  errors: Partial<Record<keyof Employee, string>>;
};

type UseEmployeeValidationReturn = {
  validateEmail: (email: string) => ValidationResult;
  validatePhone: (phone: string) => ValidationResult;
  validateDate: (date: Date | string) => ValidationResult;
  validateEmployee: (employee: Partial<Employee>) => EmployeeValidationResult;
  getEmployeeValidation: (employee: Partial<Employee>) => ComputedRef<EmployeeValidationResult>;
};

export function useEmployeeValidation(): UseEmployeeValidationReturn {
  const validateEmail = (email: string): ValidationResult => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = re.test(email);
    return { 
      isValid, 
      error: isValid ? '' : 'Invalid email format' 
    };
  };

  const validateDate = (date: Date | string): ValidationResult => {
    const isValid = !isNaN(new Date(date).getTime());
    return { 
      isValid, 
      error: isValid ? '' : 'Invalid date' 
    };
  };

  const validatePhone = (phone: string): ValidationResult => {
    const isValid = /^[\d\s\-()+x]{5,20}$/.test(phone);
    return { 
      isValid, 
      error: isValid ? '' : 'Invalid phone format' 
    };
  };

  const validateEmployee = (employee: Partial<Employee>): EmployeeValidationResult => {
    const errors: Partial<Record<keyof Employee, string>> = {};

    if (!employee.name?.trim()) {
      errors.name = 'Name is required';
    }

    if (!employee.employeeCode?.trim()) {
      errors.employeeCode = 'Employee code is required';
    }

    if (!employee.designation?.trim()) {
      errors.designation = 'Designation is required';
    }

    const phoneValidation = validatePhone(employee.phone || '');
    if (!phoneValidation.isValid) {
      errors.phone = phoneValidation.error;
    }

    if (employee.email) {
      const emailValidation = validateEmail(employee.email);
      if (!emailValidation.isValid) {
        errors.email = emailValidation.error;
      }
    }

    const dateValidation = validateDate(employee.joiningDate || '');
    if (!employee.joiningDate || !dateValidation.isValid) {
      errors.joiningDate = dateValidation.error;
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  };

  const getEmployeeValidation = (employee: Partial<Employee>): ComputedRef<EmployeeValidationResult> => {
    return computed(() => validateEmployee(employee));
  };

  return {
    validateEmployee,
    getEmployeeValidation,
    validateEmail,
    validatePhone,
    validateDate,
  };
}