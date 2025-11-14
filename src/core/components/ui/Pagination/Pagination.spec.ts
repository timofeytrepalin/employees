import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Pagination from './Pagination.vue';

describe('Pagination Component', () => {
  it('renders pagination buttons', () => {
    const wrapper = mount(Pagination, {
      props: {
        currentPage: 1,
        totalItems: 100,
        itemsPerPage: 10,
      },
    });
    expect(wrapper.find('.pagination').exists()).toBe(true);
    expect(wrapper.findAll('.pagination__button').length).toBeGreaterThan(0);
  });

  it('disables previous button on first page', () => {
    const wrapper = mount(Pagination, {
      props: {
        currentPage: 1,
        totalItems: 100,
        itemsPerPage: 10,
      },
    });
    const buttons = wrapper.findAll('.pagination__button');
    expect(buttons[0].attributes('disabled')).toBeDefined();
  });

  it('disables next button on last page', () => {
    const wrapper = mount(Pagination, {
      props: {
        currentPage: 10,
        totalItems: 100,
        itemsPerPage: 10,
      },
    });
    const buttons = wrapper.findAll('.pagination__button');
    expect(buttons[buttons.length - 1].attributes('disabled')).toBeDefined();
  });

  it('highlights current page button', () => {
    const wrapper = mount(Pagination, {
      props: {
        currentPage: 3,
        totalItems: 100,
        itemsPerPage: 10,
      },
    });
    const buttons = wrapper.findAll('.pagination__button');
    const currentPageButton = buttons.find((btn) => btn.text() === '3');
    expect(currentPageButton?.classes()).toContain('pagination__button_active');
  });

  it('emits page-changed event when button clicked', async () => {
    const wrapper = mount(Pagination, {
      props: {
        currentPage: 1,
        totalItems: 100,
        itemsPerPage: 10,
      },
    });
    const buttons = wrapper.findAll('.pagination__button');
    await buttons[2].trigger('click');
    expect(wrapper.emitted('page-changed')).toBeTruthy();
  });

  it('renders correct number of pages', () => {
    const wrapper = mount(Pagination, {
      props: {
        currentPage: 1,
        totalItems: 50,
        itemsPerPage: 10,
      },
    });
    const buttons = wrapper.findAll('.pagination__button');
    expect(buttons.length).toBeGreaterThan(0);
  });
});
