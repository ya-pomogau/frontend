import { useRouteMatch } from './useRouteMatch';
import { Routes } from '../config/router';
import { describe, expect, it } from 'vitest';
import { renderHook } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

describe('check useRouteMatch', () => {
  it('should return null if pathname and one or few patterns not matched', () => {
    const patterns = [Routes.BLOG, Routes.LOGIN, Routes.VK_AUTH];
    const { result } = renderHook(() => useRouteMatch(patterns), {
      wrapper: ({ children }) => (
        <MemoryRouter initialEntries={[Routes.REGISTER]}>
          {children}
        </MemoryRouter>
      ),
    });
    expect(result.current).toBeNull();
  });
  it('should return null if pathname and one or few patterns not matched', () => {
    const item = {
      params: {},
      pathname: '/blog',
      pathnameBase: '/blog',
      pattern: {
        caseSensitive: false,
        end: true,
        path: '/blog',
      },
    };
    const patterns = [Routes.BLOG, Routes.LOGIN, Routes.VK_AUTH];
    const { result } = renderHook(() => useRouteMatch(patterns), {
      wrapper: ({ children }) => (
        <MemoryRouter initialEntries={[Routes.BLOG]}>{children}</MemoryRouter>
      ),
    });
    expect(result.current).toStrictEqual(item);
  });
});
