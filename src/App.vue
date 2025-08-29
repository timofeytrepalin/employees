<script setup lang="ts">
import { getLocale } from './i18n';
import Dashboard from './views/Dashboard.vue'
import { useSettings } from '@/stores/settings';

const { setLanguage } = useSettings();



setLanguage(getLocale())
</script>

<template>
  <div class="app-container">
    <Dashboard/>
  </div>
</template>

<style scoped>

.app-container {
  height: 100%;
  max-width: 1440px;
  margin: auto;
}
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
