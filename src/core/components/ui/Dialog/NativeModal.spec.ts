import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { createI18n } from 'vue-i18n';
import NativeModal from './NativeModal.vue';

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      close: 'Close',
    },
  },
});

describe('NativeModal Component', () => {
  const mountWithI18n = (
    props: Record<string, any> & { isOpen: boolean } = { isOpen: false },
    options: Record<string, any> = {}
  ) => {
    return mount(NativeModal, {
      props,
      global: {
        plugins: [i18n],
      },
      ...options,
    });
  };

  it('renders modal when isOpen is true', () => {
    const wrapper = mountWithI18n({ isOpen: true });
    expect(wrapper.find('.modal').exists()).toBe(true);
  });

  it('does not render modal when isOpen is false', () => {
    const wrapper = mountWithI18n({ isOpen: false });
    expect(wrapper.find('.modal').exists()).toBe(false);
  });

  it('displays title prop', () => {
    const wrapper = mountWithI18n({
      isOpen: true,
      title: 'Test Title',
    });
    expect(wrapper.find('.modal__title').text()).toBe('Test Title');
  });

  it('renders slot content', () => {
    const wrapper = mountWithI18n(
      { isOpen: true },
      {
        slots: {
          default: '<p>Slot content</p>',
        },
      }
    );
    expect(wrapper.find('.modal__body').html()).toContain('Slot content');
  });

  it('renders footer slot when provided', () => {
    const wrapper = mountWithI18n(
      { isOpen: true },
      {
        slots: {
          footer: '<button>Save</button>',
        },
      }
    );
    expect(wrapper.find('.modal__footer').exists()).toBe(true);
    expect(wrapper.find('.modal__footer').html()).toContain('Save');
  });

  it('emits close event when close button is clicked', async () => {
    const wrapper = mountWithI18n({ isOpen: true });
    await wrapper.find('.modal__close').trigger('click');
    expect(wrapper.emitted('close')).toHaveLength(1);
  });

  it('emits close event when overlay is clicked', async () => {
    const wrapper = mountWithI18n({ isOpen: true });
    await wrapper.find('.modal__overlay').trigger('click');
    expect(wrapper.emitted('close')).toHaveLength(1);
  });

  it('does not emit close when overlay is clicked and closeOnOverlayClick is false', async () => {
    const wrapper = mountWithI18n({
      isOpen: true,
      closeOnOverlayClick: false,
    });
    await wrapper.find('.modal__overlay').trigger('click');
    expect(wrapper.emitted('close')).toBeUndefined();
  });

  it('applies custom width style', () => {
    const wrapper = mountWithI18n({
      isOpen: true,
      width: '800px',
    });
    expect(wrapper.find('.modal__container').attributes('style')).toContain('800px');
  });
});
