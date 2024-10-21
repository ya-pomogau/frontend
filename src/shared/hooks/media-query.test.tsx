import { renderHook } from '@testing-library/react';
import { useMediaQuery } from './media-query';
import { Breakpoints } from 'shared/config';
import { describe, expect, it, vi } from 'vitest';

let windowSize: string = Breakpoints.L;

const match = (query: string) => {
  if (query === windowSize) {
    return true;
  }
  return false;
};

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  enumerable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: match(query),
    media: query,
  })),
});

describe('useMediaQuery check', () => {
  it('should return false when windowSize and query not matched', async () => {
    windowSize = Breakpoints.L;
    const { result } = renderHook(() => useMediaQuery(Breakpoints.XL));
    expect(result.current).toBe(false);
  });
  it('should return true when windowSize and query matched', async () => {
    windowSize = Breakpoints.XL;
    const { result } = renderHook(() => useMediaQuery(Breakpoints.XL));
    expect(result.current).toBe(true);
  });
});
