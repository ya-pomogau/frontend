import { describe, expect, it, vi } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import { renderHook } from '@testing-library/react';
import { Provider } from 'react-redux';
import { UserState, userModel } from '../../entities/user/model';
import { User } from '../../entities/user/types';
import { AdminPermission, UserRole, UserStatus } from '../types/common.types';
import usePermission from './use-permission';
// import { describe } from 'node:test';

// Создаем тут пользователя, тип его обязательно UserState, иначе TS ругаться будет
const testUser: UserState = {
  isFailed: false,
  isLoading: false,
  _id: '123',
  role: UserRole.ADMIN,
  data: {
    _id: 'string',
    name: 'string',
    phone: 'string',
    avatar: 'string',
    address: 'string',
    vkId: 'string',
    role: UserRole.ADMIN,
    permissions: [AdminPermission.CONFIRMATION],
    password: 'string',
    isRoot: false,
    isActive: true,
  },
};

describe('check hook usePermission', () => {
  it('check volunteer', () => {
    const store = configureStore({
      reducer: { user: userModel.reducer },
      preloadedState: {
        user: {
          ...testUser,
          role: UserRole.VOLUNTEER,
          data: {
            ...testUser.data,
            role: UserRole.VOLUNTEER,
          } as User,
        },
      },
    });

    const useAppSelector = vi.fn();

    useAppSelector.mockReturnValue(testUser);

    const { result } = renderHook(
      () => usePermission([UserStatus.CONFIRMED], UserRole.VOLUNTEER),
      {
        wrapper: ({ children }) => (
          <Provider store={store}>{children}</Provider>
        ),
      }
    );

    expect(result).toBe(true);
  });
});

// пример ниже отрабатывает без ошибки

// function sum(a: number, b: number): number {
//   return a + b;
// }

// describe('1+2=3', () => {
//   it('adds 1 + 2 to equal 3', () => {
//     expect(sum(1, 2)).toBe(3);
//   });
// });
