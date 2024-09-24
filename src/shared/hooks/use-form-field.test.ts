import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import useFormField from './use-form-field';
import { useForm } from 'react-hook-form';
import { IBlogForm } from 'shared/types/blog.types';
import { act } from 'react';

const TEXT_VALIDATION_RULES = {
  required: 'Обязательное поле',
  minLength: {
    value: 100,
    message: 'Имя должно быть больше 100 символов',
  },
};

describe('useFormField check', () => {
  it('should return an error and its type when it failed validation', async () => {
    const control = renderHook(() =>
      useForm<IBlogForm>({
        mode: 'onChange',
        defaultValues: {
          title: '',
          text: '',
        },
      })
    );
    const { result } = renderHook(() =>
      useFormField(
        'text',
        control.result.current.control,
        TEXT_VALIDATION_RULES
      )
    );
    const shortText = 'Привет';
    await act(() => result.current.onChange(shortText));
    expect(result.current.value).toBe(shortText);
    expect(result.current.error?.type).toBe('minLength');
    expect(result.current.error?.message).toBe(
      TEXT_VALIDATION_RULES.minLength.message
    );
  });
  it('should return undefiend in error and correct value when validation passed', async () => {
    const control = renderHook(() =>
      useForm<IBlogForm>({
        mode: 'onChange',
        defaultValues: {
          title: '',
          text: '',
        },
      })
    );
    const { result } = renderHook(() =>
      useFormField(
        'text',
        control.result.current.control,
        TEXT_VALIDATION_RULES
      )
    );
    const longText =
      'Кстати, многие известные личности, которые представляют собой яркий пример континентально-европейского типа политической культуры, будут описаны максимально подробно.';
    await act(() => result.current.onChange(longText));
    expect(result.current.value).toBe(longText);
    expect(result.current.error).toBe(undefined);
  });
});
