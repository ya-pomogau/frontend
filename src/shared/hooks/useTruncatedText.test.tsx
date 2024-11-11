import { renderHook } from '@testing-library/react';
import { act } from 'react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { useTruncatedText } from './useTruncatedText';

const elem = document.createElement('p');
const ref = { current: elem };

describe('check useTruncatedText', () => {
  beforeEach(() => {
    global.ResizeObserver = vi.fn().mockImplementation((callback) => {
      callback([{ contentRect: { width: 100, height: 100 } }]);
      return { observe: vi.fn(), disconnect: vi.fn() };
    });
  });

  it('should return false when created', () => {
    document.body.appendChild(elem);
    const { result } = renderHook(() => useTruncatedText(ref));
    expect(result.current.isExpanded).toBe(false);
    expect(result.current.isTruncated).toBe(false);
  });

  it('isExpanded should return true when toggleIsShowingMore active', () => {
    document.body.appendChild(elem);
    const { result } = renderHook(() => useTruncatedText(ref));
    expect(result.current.isExpanded).toBe(false);
    act(() => result.current.toggleIsShowingMore());
    expect(result.current.isExpanded).toBe(true);
  });
});
