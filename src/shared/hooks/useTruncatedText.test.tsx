import { renderHook } from '@testing-library/react';
import { act } from 'react';
import { describe, expect, it } from 'vitest';
import { useTruncatedText } from './useTruncatedText';

const elem = document.createElement('p');
const ref = { current: elem };

describe('check useTruncatedText', () => {
  it('should return false when created', () => {
    const { result } = renderHook(() => useTruncatedText(ref));
    expect(result.current.isExpanded).toBe(false);
    expect(result.current.isTruncated).toBe(false);
  });

  it('isExpanded should return true when toggleIsShowingMore active', () => {
    const { result } = renderHook(() => useTruncatedText(ref));
    expect(result.current.isExpanded).toBe(false);
    act(() => result.current.toggleIsShowingMore());
    expect(result.current.isExpanded).toBe(true);
  });
});
