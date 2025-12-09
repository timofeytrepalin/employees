<script setup lang="ts">
import EmployeeTable from '@/core/components/app/EmployeeTable.vue';
import CustomButton from '@/core/components/ui/Button/CustomButton.vue';
import { ref, onMounted, shallowRef, computed, defineAsyncComponent } from 'vue';
import { useEmployees } from '@/stores/employees';
import type { EmployeeInfo } from '@/types/employees';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import { formatDate } from '@/i18n';
import LanguageSwitcher from '@/core/components/app/LanguageSwitcher.vue';
import ThemeSwitcher from '@/core/components/app/ThemeSwitcher.vue';
import OnlineUsers from '@/core/components/app/OnlineUsers.vue';
const AddPersonDialog = defineAsyncComponent(() => import('@/core/components/app/AddPersonDialog.vue'));

interface Tab {
  filterName: string;
  title: string;
}

const { t } = useI18n();
const isAddPersonDialogOpen = ref(false);
const employeesStore = useEmployees();
const { designations } = storeToRefs(employeesStore);

onMounted(() => {
  employeesStore.loadEmployees();
});

const toggleIsAddPersonDialogOpen = () => {
  isAddPersonDialogOpen.value = !isAddPersonDialogOpen.value;
};

const filteredEmployees = computed(() => {
  if (!selectedTab.value.filterName) return employeesStore.employees;
  return employeesStore.employees.filter(
    (employee) => employee.designation.toLowerCase() === selectedTab.value.filterName
  );
});

const setFilterType = (type: Tab) => {
  selectedTab.value = type;
};

const tabs = computed(() => [
  { filterName: '', title: t(`designations.all`) },
  ...designations.value.map((item) => ({
    filterName: item.toLowerCase(),
    title: t(`designations.${item}`),
  })),
]);

const selectedTab = shallowRef<Tab>(tabs.value[0]);

const onAddEmployee = (employeeInfo: EmployeeInfo) => {
  employeesStore.addEmployee(employeeInfo);
  toggleIsAddPersonDialogOpen();
};

function escapeCsvField(value: any) {
  if (value === null || value === undefined) return '';
  const str = String(value);
  if (/[",\n\r]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

function downloadCSVData() {
  const reportDate = new Date();
  const headers = [
    t('employeeTable.name'),
    t('employeeTable.email'),
    t('employeeTable.designation'),
    t('employeeTable.phone'),
    t('employeeTable.joiningDate'),
  ];
  const rows = employeesStore.employees.map((p) => [
    p.name,
    p.email,
    t(`designations.${p.designation}`),
    p.phone,
    formatDate(p.joiningDate),
  ]);

  const bom = '\uFEFF';
  const csvLines = [headers.map(escapeCsvField).join(','), ...rows.map((r) => r.map(escapeCsvField).join(','))];
  const blob = new Blob([bom + csvLines.join('\n')], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `employees_${reportDate.toISOString().slice(0, 19).replace(/[:T]/g, '-')}.csv`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
</script>

<template>
  <div class="dashboard">
    <div class="dashboard__settings">
      <ThemeSwitcher />
      <OnlineUsers />
      <LanguageSwitcher />
    </div>
    <h2 class="dashboard__title">{{ t('dashboard.title') }}</h2>
    <div class="dashboard__head">
      <CustomButton class="dashboard__button" @click="toggleIsAddPersonDialogOpen">
        <span>{{ t('dashboard.addEmployee') }}</span>
      </CustomButton>
      <CustomButton class="dashboard__button" @click="downloadCSVData">
        <span>{{ t('dashboard.downloadCSV') }}</span>
      </CustomButton>
    </div>
    <div class="dashboard__tabs">
      <div
        v-for="(tab, idx) in tabs"
        :key="idx"
        @click="setFilterType(tab)"
        :class="['dashboard__tab', { dashboard__tab_active: selectedTab.filterName === tab.filterName }]"
      >
        {{ tab.title }}
      </div>
    </div>
    <div class="dashboard__divider" />
    <div class="dashboard__table">
      <EmployeeTable :employees="filteredEmployees" />
    </div>
    <add-person-dialog :isOpen="isAddPersonDialogOpen" @close="toggleIsAddPersonDialogOpen" @submit="onAddEmployee" />
  </div>
</template>

<style lang="scss">
.dashboard {
  background: transparent;
  padding: var(--basic-spacing-medium);
  border-radius: var(--border-radius-medium);
  box-shadow: var(--shadow-dark);
  transition: all var(--transition-ease) 0.3s;
  border: 1px solid var(--color-base-border-secondary);

  &__settings {
    display: flex;
    justify-content: space-between;
  }

  &__head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--basic-spacing-big);
  }

  &__title {
    color: var(--color-base-content-primary);
    font-size: var(--font-size-large);
    font-weight: var(--font-weight-big);
    line-height: var(--line-height-big);
    margin-bottom: var(--basic-spacing-medium);
    text-align: center;
    text-transform: uppercase;
    letter-spacing: var(--letter-spacing-huge);
  }

  &__tabs {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: var(--basic-spacing-small);
    font-size: var(--font-size-small);
    overflow-x: scroll;
    width: 100%;
  }

  &__tab {
    padding: var(--basic-spacing-medium);
    color: var(--color-base-content-secondary);
    margin-right: var(--basic-spacing);
    cursor: pointer;
    transition: color var(--transition-ease) 0.2s;

    &_active {
      color: var(--color-base-content-primary);
      border-bottom: 4px solid var(--color-base-accent);
    }

    &:hover {
      color: var(--color-base-content-primary);
    }
  }

  &__divider {
    height: 2px;
    background: var(--color-base-border-accent);
    margin: 0 0 var(--basic-spacing-big) 0;
  }

  &__table {
    background: transparent;
    border-radius: var(--border-radius-medium);
    padding: var(--basic-spacing);
    border: 1px solid var(--color-base-border-secondary);
  }
}
</style>
