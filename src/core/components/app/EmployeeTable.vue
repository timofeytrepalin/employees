<template>
  <div class="employee-table-container">
    <table v-loading="isLoading" class="employee-table">
      <thead class="employee-table__header" @click="onHeaderClick">
        <tr>
          <th
            v-for="(header, idx) in headers"
            :key="idx"
            scope="col"
            :data-sort-name="header.name"
            :sort-dir="sortDirection"
            class="employee-table__header-cell"
            :class="[header.additionalCss, { pointer: header.sort }]"
          >
            {{ header.title }}
          </th>
        </tr>
      </thead>
      <tbody class="employee-table__body">
        <tr
          v-for="(person, index) in filteredData"
          :key="person.id"
          class="employee-table__row"
          :class="{
            'employee-table__row_hover': hoveredRow === index,
            'employee-table__row_even': index % 2 === 0,
          }"
          @mouseover="hoveredRow = index"
          @mouseleave="hoveredRow = null"
        >
          <td class="employee-table__cell employee-table__cell_index">{{ person.index + 1 }}</td>
          <td class="employee-table__cell employee-table__cell_basic-info">
            <div class="employee-table__person-info">
              <object :data="person.avatar" type="image/jpeg" class="employee-table__avatar" width="40" height="40">
                <div class="employee-table__fallback-avatar">
                  <div class="employee-table__fallback-shape"></div>
                </div>
              </object>
              <div class="employee-table__person-details">
                <span class="employee-table__person-name">{{ person.name }}</span>
                <span class="employee-table__person-email">{{ person.email || t('noEmail') }}</span>
              </div>
            </div>
          </td>
          <td class="employee-table__cell">{{ person.employeeCode }}</td>
          <td class="employee-table__cell">{{ t(`designations.${person.designation}`) }}</td>
          <td class="employee-table__cell">{{ person.phone }}</td>
          <td class="employee-table__cell">{{ formatDate(person.joiningDate) }}</td>
          <td class="employee-table__cell employee-table__cell--actions">
            <CustomButton
              @click="onDeleteEmployeeClick(person)"
              class="employee-table__action-button"
              :aria-label="t('deleteEmployee')"
            >
              {{ t('delete') }}
            </CustomButton>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination
      :current-page="currentPage"
      :total-items="employees.length"
      :itemsPerPage="itemsPerPage"
      @page-changed="handlePageChange"
    />
    <ConfirmDialog
      :is-open="showConfirmDeleteDialog"
      class="delete-employee-dialog"
      :title="t('deleteDialog.title')"
      :confirm-title="t('yes')"
      @confirm="deleteEmployee"
      @close="deleteEmployeeObject = null"
    >
      <div v-if="deleteEmployeeObject" class="employee-table__person-info delete-employee-dialog__content">
        <img
          :src="deleteEmployeeObject.avatar"
          :alt="`Avatar of ${deleteEmployeeObject.name}`"
          class="employee-table__avatar"
          loading="lazy"
          width="40"
          height="40"
        />
        <div class="employee-table__person-details">
          <span class="employee-table__person-name">{{ deleteEmployeeObject.name }}</span>
          <span class="employee-table__person-email">{{ deleteEmployeeObject.email || t('noEmail') }}</span>
        </div>
      </div>
    </ConfirmDialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useEmployees } from '@/stores/employees';
import Pagination from '../ui/Pagination/Pagination.vue';
import CustomButton from '@/core/components/ui/Button/CustomButton.vue';
import type { Employee, EmployeeFields } from '@/types/employees';
import ConfirmDialog from './ConfirmDialog.vue';
import { useI18n } from 'vue-i18n';
import { formatDate } from '@/i18n';

const { t } = useI18n();

interface TableEmployee extends Employee {
  index: number;
}

interface Header {
  title: string;
  name: string;
  additionalCss: string;
  sort?: (a: TableEmployee, b: TableEmployee) => number;
}

const props = defineProps({
  employees: {
    type: Array<Employee>,
    default: () => [],
  },
});

const headers = computed<Header[]>(() => [
  {
    title: '#',
    name: 'index',
    additionalCss: 'employee-table__header-cell_index',
    sort: (a: TableEmployee, b: TableEmployee) => (sortDirection.value ? a.index - b.index : b.index - a.index),
  },
  {
    title: t('employeeTable.basicInfo'),
    name: 'name' as EmployeeFields,
    additionalCss: 'employee-table__header-cell--info',
    sort: stringSort('name'),
  },
  {
    title: t('employeeTable.employeeCode'),
    name: 'employeeCode' as EmployeeFields,
    additionalCss: '',
    sort: stringSort('employeeCode'),
  },
  {
    title: t('employeeTable.designation'),
    name: 'designation' as EmployeeFields,
    additionalCss: '',
    sort: stringSort('designation'),
  },
  {
    title: t('employeeTable.phoneNumber'),
    name: 'phone' as EmployeeFields,
    additionalCss: '',
  },
  {
    title: t('employeeTable.joiningDate'),
    name: 'joiningDate' as EmployeeFields,
    additionalCss: '',
  },
  {
    title: t('employeeTable.action'),
    name: 'action',
    additionalCss: 'employee-table__header-cell--actions',
  },
]);

const stringSort = (property: EmployeeFields) => (a: TableEmployee, b: TableEmployee) => {
  if (typeof a[property] !== 'string' || typeof b[property] !== 'string') {
    return 0;
  }
  const desA = a[property].toLowerCase();
  const desB = b[property].toLowerCase();

  if (sortDirection.value) {
    return desA.localeCompare(desB);
  } else {
    return desB.localeCompare(desA);
  }
};

const employeesStore = useEmployees();

const isLoading = computed(() => employeesStore.isLoading);

const hoveredRow = ref<number | null>(null);

const filteredData = computed(() => {
  const paginatedStart = itemsPerPage * (currentPage.value - 1);
  return props.employees
    .map((person, index) => ({ index, ...person }))
    .sort(sortFunction.value)
    .slice(paginatedStart, paginatedStart + itemsPerPage);
});

const currentPage = ref(1);
const itemsPerPage = 10;
const sortDirection = ref(true);
const currentSort = ref(headers.value[0]);
const sortFunction = computed(() => currentSort.value.sort);

function onHeaderClick(event: Event) {
  const target = event.target as HTMLElement;
  const header = headers.value.find((header) => header.name === target.dataset.sortName);
  if (!header || !header.sort) return;
  if (currentSort.value.name === header.name) sortDirection.value = !sortDirection.value;
  currentSort.value = header;
}

const handlePageChange = (page: number) => {
  currentPage.value = page;
};

const deleteEmployeeId = computed(() => deleteEmployeeObject?.value?.id ?? '');

const showConfirmDeleteDialog = computed(() => !!deleteEmployeeId.value);

const deleteEmployeeObject = ref<Employee | null>(null);

const onDeleteEmployeeClick = (employee: Employee) => {
  deleteEmployeeObject.value = employee;
};

const deleteEmployee = () => {
  employeesStore.removeEmployee(deleteEmployeeId.value);
  deleteEmployeeObject.value = null;
};
</script>

<style lang="scss">
.employee-table-container {
  width: 100%;
  overflow-x: auto;
}

.employee-table {
  width: 100%;
  min-height: 400px;
  border-collapse: separate;
  border-spacing: 0 var(--basic-spacing-small);
  font-family: var(--font-family-default);
  font-size: var(--font-size-small);
  color: var(--color-base-content-primary);

  &__header {
    &-cell {
      padding: var(--basic-spacing) var(--basic-spacing-small);
      text-align: left;
      font-weight: var(--font-weight-big);
      color: var(--color-base-content-secondary);
      border-bottom: 1px solid var(--color-base-border-secondary);
      transition: background var(--transition-ease) 0.2s;

      &.pointer {
        cursor: pointer;
      }

      &_index {
        width: 5%;
        text-align: center;
      }

      &--info {
        width: 25%;
      }

      &--actions {
        width: 10%;
        text-align: center;
      }
    }
  }

  &__row {
    transition: all var(--transition-ease) 0.5s;

    &_hover {
      box-shadow: var(--shadow-dark);
      transform: translateY(-2px);
    }
  }

  &__cell {
    padding: var(--basic-spacing) var(--basic-spacing-small);
    vertical-align: middle;
    font-size: var(--font-size-base);
    line-height: var(--line-height-base);

    &:first-child {
      border-top-left-radius: var(--border-radius-small);
      border-bottom-left-radius: var(--border-radius-small);
    }

    &:last-child {
      border-top-right-radius: var(--border-radius-small);
      border-bottom-right-radius: var(--border-radius-small);
    }

    &_index {
      text-align: center;
      color: var(--color-base-content-tertiary);
    }

    &--actions {
      text-align: center;
    }
  }

  &__person-info {
    display: flex;
    align-items: center;
    gap: var(--basic-spacing);
  }

  &__avatar {
    border-radius: 50%;
    object-fit: cover;
    background: var(--color-base-background-placeholder);
    width: var(--size-medium);
    height: var(--size-medium);
  }

  &__fallback-avatar {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    &[data-theme='dark'] {
      background: linear-gradient(135deg, #4a5568 0%, #2d3748 100%);
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    &[data-theme='light'] {
      background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
      border: 1px solid rgba(0, 0, 0, 0.1);
    }
  }

  &__fallback-shape {
    width: 24px;
    height: 24px;
    border-radius: 50%;

    background: whitesmoke;
  }

  &__person-details {
    display: flex;
    flex-direction: column;
  }

  &__person-name {
    font-weight: var(--font-weight-medium);
    color: var(--color-base-content-primary);
  }

  &__person-email {
    font-size: var(--font-size-small);
    color: var(--color-base-content-tertiary);
  }
}

.delete-employee-dialog {
  &__content {
    justify-content: center;
  }
}
</style>
