import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import CustomButton from '../../../../../src/core/components/ui/Button/CustomButton.vue';

describe('CustomButton Component', () => {
  it('renders slot content correctly', () => {
    const wrapper = mount(CustomButton, {
      slots: {
        default: 'Click me',
      },
    });
    expect(wrapper.text()).toBe('Click me');
  });

  it('emits click event when button is clicked', async () => {
    const wrapper = mount(CustomButton);
    await wrapper.find('button').trigger('click');
    expect(wrapper.emitted('click')).toHaveLength(1);
  });

  it('applies primary type by default', () => {
    const wrapper = mount(CustomButton);
    expect(wrapper.find('button').classes()).toContain('custom-button_primary');
  });

  it('applies secondary type when specified', () => {
    const wrapper = mount(CustomButton, {
      props: {
        type: 'secondary',
      },
    });
    expect(wrapper.find('button').classes()).toContain('custom-button_secondary');
  });

  it('disables button when disabled prop is true', () => {
    const wrapper = mount(CustomButton, {
      props: {
        disabled: true,
      },
    });
    expect(wrapper.find('button').attributes('disabled')).toBeDefined();
    expect(wrapper.find('button').classes()).toContain('custom-button_disabled');
  });

  it('does not emit click event when disabled', async () => {
    const wrapper = mount(CustomButton, {
      props: {
        disabled: true,
      },
    });
    await wrapper.find('button').trigger('click');
    expect(wrapper.emitted('click')).toBeUndefined();
  });
});
