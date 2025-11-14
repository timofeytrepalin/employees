import { mount, VueWrapper } from '@vue/test-utils';
import { createI18n } from 'vue-i18n';
import type { ComponentPublicInstance } from 'vue';

export const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      close: 'Close',
      validationMessages: {
        fieldRequired: 'This field is required',
      },
    },
  },
});

interface MountOptions {
  props?: Record<string, any>;
  slots?: Record<string, any>;
  global?: Record<string, any>;
}

export function mountWithI18n(component: any, options: MountOptions = {}): VueWrapper<ComponentPublicInstance> {
  return mount(component, {
    props: options.props,
    slots: options.slots,
    global: {
      plugins: [i18n],
      ...options.global,
    },
  });
}
