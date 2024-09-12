import { renderHook } from '@testing-library/react';
import { act } from 'react';
import { describe, expect, it } from 'vitest';
import { useControlModal } from './useControlModal';

describe('check useControlModal', () => {
  it('should return false when hook created', () => {
    const { result } = renderHook(() => useControlModal());
    expect(result.current.isOpen).toBe(false);
  });

  it('should return true when handleOpen called', () => {
    const { result } = renderHook(() => useControlModal());
    act(() => result.current.handleOpen());
    expect(result.current.isOpen).toBe(true);
  });

  it('should return true when handleClose called', () => {
    const { result } = renderHook(() => useControlModal());
    act(() => result.current.handleClose());
    expect(result.current.isOpen).toBe(false);
  });
});
