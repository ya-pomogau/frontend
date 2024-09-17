import { renderHook } from '@testing-library/react';
import { act } from 'react';
import { describe, expect, it } from 'vitest';
import { useTruncatedText } from './useTruncatedText';

describe('check useTruncatedText', () => {
  it('should return false when created', () => {
    const elem = document.createElement('p');
    const ref = { current: elem };
    const { result } = renderHook(() => useTruncatedText(ref));
    expect(result.current.isExpanded).toBe(false);
    expect(result.current.isTruncated).toBe(false);
  });

  it('isExpanded should return true when toggleIsShowingMore active', () => {
    const elem = document.createElement('p');
    const ref = { current: elem };
    const { result } = renderHook(() => useTruncatedText(ref));
    act(() => result.current.toggleIsShowingMore());
    expect(result.current.isExpanded).toBe(true);
  });
});
