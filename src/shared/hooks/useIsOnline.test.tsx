import { renderHook } from '@testing-library/react';
import { describe, expect, vi, it } from 'vitest';
import { useIsOnline } from './useIsOnline';

describe('check useIsOnline hook', () => {
  it('should return true when status is online', () => {
    vi.spyOn(navigator, 'onLine', 'get').mockReturnValueOnce(true);
    const { result } = renderHook(() => useIsOnline());
    expect(result.current).toBe(true);
  });

  it('should return false when status is offLine', () => {
    vi.spyOn(navigator, 'onLine', 'get').mockReturnValueOnce(false);
    const { result } = renderHook(() => useIsOnline());
    expect(result.current).toBe(false);
  });
});
