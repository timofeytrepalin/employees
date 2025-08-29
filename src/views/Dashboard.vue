<script setup lang="ts">
import AddPersonDialog from '@/core/components/app/AddPersonDialog.vue';
import EmployeeTable from '@/core/components/app/EmployeeTable.vue';
import CustomButton from '@/core/components/ui/Button/CustomButton.vue';
import { ref, onMounted, shallowRef,  computed } from 'vue';
import { useEmployees } from '@/stores/employees';
import type { EmployeeInfo } from '@/types/employees';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n'
import LanguageSwitcher from '@/core/components/app/LanguageSwitcher.vue';
import ThemeSwitcher from '@/core/components/app/ThemeSwitcher.vue';

interface Tab {
  filterName: string,
  title: string
}

const { t } = useI18n();
const isAddPersonDialogOpen = ref(false);
const employeesStore = useEmployees();
const { designations } = storeToRefs(employeesStore);

onMounted(() => {
  employeesStore.loadEmployees();
});


const filteredEmployees = computed(() => {
  if (!selectedTab.value.filterName) return employeesStore.employees;
  return employeesStore.employees.filter(employee => employee.designation.toLowerCase() === selectedTab.value.filterName);
});

const setFilterType = (type: Tab) => {
  selectedTab.value = type;
};


const tabs = computed(() => ([
  { filterName: '', title: 'All Employees' },
  ...designations.value.map(item => ({
    filterName: item.toLowerCase(),
    title: item
  }))
]));

const selectedTab = shallowRef<Tab>(tabs.value[0])


const onAddEmployee = (employeeInfo: EmployeeInfo) => {
  employeesStore.addEmployee(employeeInfo);
};
</script>

<template>
  <div class="dashboard">
    <div class="dashboard__head">
      <h2 class="dashboard__title">{{ t('dashboard.title') }}</h2>
      <LanguageSwitcher />
      <ThemeSwitcher />
      <CustomButton class="dashboard__button" @click="isAddPersonDialogOpen = true">
        <span>{{ t('dashboard.addEmployee') }}</span>
      </CustomButton>
    </div>
    <div class="dashboard__tabs">
      <div
        v-for="(tab, idx) in tabs"
        :key="idx"
        @click="setFilterType(tab)"
        :class="['dashboard__tab', { 'dashboard__tab_active': selectedTab.filterName === tab.filterName }]"
      >
        {{ tab.title }}
      </div>
    </div>
    <div class="dashboard__divider"/>
    <div class="dashboard__table">
      <EmployeeTable :employees="filteredEmployees" />
    </div>
    <add-person-dialog
      :isOpen="isAddPersonDialogOpen"
      @close="isAddPersonDialogOpen = false"
      @submit="onAddEmployee"
    />
  </div>
</template>

<style lang="scss">

.dashboard {
  background: var(--color-base-background-primary);
  padding: var(--basic-spacing-medium);
  border-radius: var(--border-radius-medium);
  box-shadow: var(--shadow-dark);
  transition: all var(--transition-ease) 0.3s;

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
    margin: 0;
  }

  &__tabs {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: var(--basic-spacing-small);
    font-size: var(--font-size-small);
  }

  &__tab {
    padding: var(--basic-spacing-medium);
    color: var(--color-base-content-secondary);
    margin-right: var(--basic-spacing);
    cursor: pointer;
    transition: color var(--transition-ease) 0.2s;

    &_active {
      color: var(--color-base-content-primary);
      border-bottom: 4px solid var(--color-status-success);
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
    background: var(--color-base-background-secondary);
    border-radius: var(--border-radius-medium);
    padding: var(--basic-spacing);
    border: 1px solid var(--color-base-border-secondary);
  }
}
</style>