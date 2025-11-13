import { createApp } from 'vue';
import '@/styles/normalize.css';
import '@/styles/app.scss';
import '@/styles/cosmo.scss';
import App from './App.vue';
import { createPinia } from 'pinia';
import installPlugins from '@/plugins';
import { setupI18n } from '@/i18n';
import { useSettings } from './stores/settings';
import loading from '@/core/directives/loading';
import { vPhoneMask } from '@desource/phone-mask-vue';
import '@desource/phone-mask-vue/assets/lib.css';

const i18n = setupI18n();
const app = createApp(App);

const pinia = createPinia();

app.use(i18n);
app.use(pinia);

app.directive('loading', loading);
app.directive('phone-mask', vPhoneMask);

installPlugins(app);

const settingsStore = useSettings();
document.documentElement.setAttribute('data-theme', settingsStore.appTheme);

app.mount('#app');
