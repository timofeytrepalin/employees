import { describe, it, expect, vi } from 'vitest';
import { mountWithI18n } from '../../../../shared/test-utils';
import CustomInput from '../../../../../src/core/components/ui/Input/CustomInput.vue';

describe('CustomInput Component', () => {
  it('renders input element', () => {
    const wrapper = mountWithI18n(CustomInput);
    expect(wrapper.find('input').exists()).toBe(true);
  });

  it('updates modelValue on input', async () => {
    const wrapper = mountWithI18n(CustomInput);
    const input = wrapper.find('input');
    await input.setValue('test value');
    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['test value']);
  });

  it('applies correct type attribute', () => {
    const wrapper = mountWithI18n(CustomInput, { props: { type: 'email' } });
    expect(wrapper.find('input').attributes('type')).toBe('email');
  });

  it('shows error message when validation fails', async () => {
    const wrapper = mountWithI18n(CustomInput, { props: { required: true } });
    const input = wrapper.find('input');
    await input.trigger('blur');
    const errorDiv = wrapper.find('.input-error');
    expect(errorDiv.exists()).toBe(true);
  });

  it('applies error class when error exists', async () => {
    const wrapper = mountWithI18n(CustomInput, { props: { required: true } });
    const input = wrapper.find('input');
    await input.setValue('');
    await input.trigger('blur');
    await wrapper.vm.$nextTick();
    expect(wrapper.find('input').classes()).toContain('custom-input_error');
  });

  it('disables input when disabled prop is true', () => {
    const wrapper = mountWithI18n(CustomInput, { props: { disabled: true } });
    expect(wrapper.find('input').attributes('disabled')).toBeDefined();
  });

  it('sets maxlength attribute', () => {
    const wrapper = mountWithI18n(CustomInput, { props: { maxlength: 50 } });
    expect(wrapper.find('input').attributes('maxlength')).toBe('50');
  });

  it('emits validation event on blur', async () => {
    const wrapper = mountWithI18n(CustomInput);
    await wrapper.find('input').trigger('blur');
    expect(wrapper.emitted('validation')).toBeTruthy();
  });

  it('validates using custom validation function', async () => {
    const validationFunction = vi.fn((value: string) => ({
      isValid: value.length > 3,
      error: value.length > 3 ? '' : 'Too short',
    }));

    const wrapper = mountWithI18n(CustomInput, {
      props: {
        validationFunction,
        validateOnBlur: true,
      },
    });

    await wrapper.find('input').setValue('ab');
    await wrapper.find('input').trigger('blur');
    expect(validationFunction).toHaveBeenCalled();
  });
});
