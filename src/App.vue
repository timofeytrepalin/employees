<template>
  <Cosmo>
    <div class="app-container app-glass">
      <Dashboard />
    </div>
  </Cosmo>
</template>

<script setup lang="ts">
import Cosmo from './core/components/app/Cosmo.vue';
import { getLocale } from './i18n';
import Dashboard from './views/Dashboard.vue';
import { useSettings } from '@/stores/settings';

const { setLanguage } = useSettings();

setLanguage(getLocale());
</script>

<style scoped>
.app-container {
  height: 100%;
  max-width: 1440px;
  margin: auto;
}

.app-glass {
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
}
</style>
