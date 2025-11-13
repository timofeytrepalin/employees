import { defineStore } from 'pinia';
import { computed, inject, ref, shallowReactive } from 'vue';
import type { Employee, EmployeeInfo } from '@/types/employees';
import type { NotificationOptions } from '@/plugins/notification';
import { httpService } from '@/services/http';
import { useI18n } from 'vue-i18n';

export const useEmployees = defineStore('employees', () => {
  const employees = shallowReactive<Array<Employee>>([]);
  const notify = inject<(options: NotificationOptions) => void>('notify');
  const isLoading = ref(false);
  const { t } = useI18n();

  const employeesNumber = computed(() => employees.length);

  const designations = computed(() => Array.from(new Set(employees.map((employee) => employee.designation))));

  const showNotification = (title: string, message: string, type: 'success' | 'error' = 'success') => {
    if (notify) {
      notify({
        title,
        message,
        type,
        duration: 3000,
      });
    }
  };

  async function loadEmployees(): Promise<void> {
    isLoading.value = true;
    try {
      const response = await httpService.get('/api/employees');
      employees.splice(0, employees.length, ...response.data);
      showNotification(t('notification.success'), t('notification.dataLoaded'));
    } finally {
      isLoading.value = false;
    }
  }

  async function addEmployee(employeeInfo: EmployeeInfo): Promise<void> {
    try {
      const response = await httpService.post('/api/employees', employeeInfo);
      employees.push(response.data);
      showNotification(t('notification.success'), t('notification.created'));
    } catch {
      showNotification(t('notification.error'), t('notification.operationFailed'), 'error');
    }
  }

  async function removeEmployee(id: string): Promise<void> {
    isLoading.value = true;
    try {
      await httpService.delete(`/api/employees/${id}`);
      const idx = employees.findIndex((item) => item.id === id);
      if (idx !== -1) {
        employees.splice(idx, 1);
      }
      showNotification(t('notification.success'), t('notification.deleted'));
    } catch {
      showNotification(t('notification.error'), t('notification.operationFailed'), 'error');
    } finally {
      isLoading.value = false;
    }
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
