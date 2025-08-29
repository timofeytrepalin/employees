import { defineStore } from 'pinia';
import { computed, inject, ref, shallowReactive } from 'vue';
import type { Employee, EmployeeInfo } from '@/types/employees';
import { httpService } from '@/services/http';


export const useEmployees = defineStore('employees', () => {
  const employees = shallowReactive<Array<Employee>>([]);
  const notify = inject<(options: unknown) => void>('notify');
  let isLoading = ref(false);

  const employeesNumber = computed(() => {
    return employees.length;
  });

  const designations = computed(() => {
    return Array.from(new Set(employees.map(employee => employee.designation)))
  })

  async function loadEmployees() {
    isLoading.value = true;
    httpService.get('/api/employees')
      .then((response) => {
        employees.splice(0, employees.length, ...response.data);
        if (notify)
          notify({
            title: 'URA',
            message: 'Operation successful!',
            type: 'success',
            duration: 3000,
          });
        isLoading.value = false;
      })
  }

  async function addEmployee(employeeInfo: EmployeeInfo) {
    httpService.post('/api/employees', employeeInfo)
      .then((response) => {
        employees.push(response.data);
      })
  }

  async function removeEmployee(id: string) {
    isLoading.value = true;
    httpService.delete(`/api/employees/${id}`)
      .then(() => {
        const idx = employees.findIndex((item) => item.id === id);
        employees.splice(idx, 1);
        isLoading.value = false;
        if (notify)
          notify({
            title: 'URA',
            message: 'Operation successful!',
            type: 'success',
            duration: 3000,
          });
      })
      .catch(() => {
        if (notify)
          notify({
            title: 'URA',
            message: 'Operation failed!',
            type: 'error',
            duration: 3000,
          });
      })
  }


  return {
    isLoading,
    employees,
    employeesNumber,
    designations,
    loadEmployees,    
    addEmployee,
    removeEmployee,
  };
});