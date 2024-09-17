import { renderHook } from '@testing-library/react';
import { useMediaQuery } from './media-query';
import { Breakpoints } from 'shared/config';
import { describe, expect, it, vi } from 'vitest';

describe('useMediaQuery check', () => {
  it('', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      enumerable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: true,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
    const { result } = renderHook(() => useMediaQuery(Breakpoints.L));
    console.log(result);
  });
});
