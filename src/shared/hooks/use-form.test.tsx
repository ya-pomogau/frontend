import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import useForm from './use-form';
import { FilterItemsIds } from 'features/filter/consts';
import { IFilterValues } from 'features/filter/types';
import { act, ChangeEvent } from 'react';

const defaultValues: IFilterValues = {
  categories: [],
  searchRadius: '',
  sortBy: '',
  date: '',
  time: [],
  userCategories: [FilterItemsIds.ALL],
};

const newValue = {
  categories: ['Волонтёр', 'Админ'],
  searchRadius: '10 км',
  sortBy: 'Специальность',
  date: '09.10.24',
  time: [],
  userCategories: [FilterItemsIds.ALL],
};

describe('check useForm', () => {
  it('should return correct value after setValues call', () => {
    const { result } = renderHook(() => useForm(defaultValues));
    act(() => result.current.setValues(newValue));
    expect(result.current.values).toBe(newValue);
  });
  it('should return defaultValue after resetForm call', () => {
    const { result } = renderHook(() => useForm(defaultValues));
    act(() => result.current.setValues(newValue));
    act(() => result.current.resetForm());
    expect(result.current.values).toBe(defaultValues);
  });
  it('should return new value with error', () => {
    const { result } = renderHook(() => useForm(defaultValues));
    const closest = vi.fn().mockImplementation(() => {
      return {
        checkValidity: () => {
          return false;
        },
      } as HTMLFormElement;
    });
    const value: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> = {
      target: {
        validationMessage: 'OK',
        name: 'Имя',
        value: 'Саня',
        closest: closest,
      },
    };
    act(() => result.current.handleChange(value));
    expect(result.current.values).toEqual(
      expect.objectContaining({ Имя: 'Саня' })
    );
    expect(result.current.errors).toEqual(
      expect.objectContaining({ Имя: 'OK' })
    );
    expect(result.current.isValid).toBe(false);
  });
});
