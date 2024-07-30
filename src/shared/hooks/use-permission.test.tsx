import { describe, expect, it } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import { renderHook } from '@testing-library/react';
import { Provider } from 'react-redux';
import { UserState, userModel } from '../../entities/user/model';
import { User } from '../../entities/user/types';
import { AdminPermission, UserRole, UserStatus } from '../types/common.types';
import usePermission from './use-permission';

// Создаем тут пользователя, тип его обязательно UserState, иначе TS ругаться будет

const defaultVolunteer: UserState = {
  isFailed: false,
  isLoading: false,
  _id: 'volunteer',
  role: UserRole.VOLUNTEER,
  data: {
    _id: 'string',
    name: 'string',
    phone: 'string',
    avatar: 'string',
    address: 'string',
    vkId: 'string',
    role: UserRole.VOLUNTEER,
    permissions: [],
    password: 'string',
    isRoot: false,
    isActive: true,
  },
};

const defaultRecipient: UserState = {
  isFailed: false,
  isLoading: false,
  _id: 'recipient',
  role: UserRole.RECIPIENT,
  data: {
    _id: 'string',
    name: 'string',
    phone: 'string',
    avatar: 'string',
    address: 'string',
    vkId: 'string',
    role: UserRole.RECIPIENT,
    permissions: [],
    password: 'string',
    isRoot: false,
    isActive: true,
  },
};

const defaultAdmin: UserState = {
  isFailed: false,
  isLoading: false,
  _id: 'admin',
  role: UserRole.ADMIN,
  data: {
    _id: 'string',
    name: 'string',
    phone: 'string',
    avatar: 'string',
    address: 'string',
    vkId: 'string',
    role: UserRole.ADMIN,
    permissions: [AdminPermission.BLOG],
    password: 'string',
    isRoot: false,
    isActive: true,
  },
};

describe('check how usePermission works with rootUser', () => {
  it('for rootUser without admin permissions hook returns true', () => {
    const store = configureStore({
      reducer: { user: userModel.reducer },
      preloadedState: {
        user: {
          ...defaultAdmin,
          role: UserRole.ADMIN,
          data: {
            ...defaultAdmin.data,
            permissions: [],
            isRoot: true,
          } as User,
        },
      },
    });

    const { result } = renderHook(() => usePermission([], UserRole.ADMIN), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    expect(result.current).toBe(true);
  });

  it('for rootUser with admin permissions hook returns true', () => {
    const store = configureStore({
      reducer: { user: userModel.reducer },
      preloadedState: {
        user: {
          ...defaultAdmin,
          role: UserRole.ADMIN,
          data: {
            ...defaultAdmin.data,
            isRoot: true,
          } as User,
        },
      },
    });

    const { result } = renderHook(
      () => usePermission([AdminPermission.BLOG], UserRole.ADMIN),
      {
        wrapper: ({ children }) => (
          <Provider store={store}>{children}</Provider>
        ),
      }
    );

    expect(result.current).toBe(true);
  });
});

describe('check how usePermission works with admin', () => {
  it('for admin without permissions hook returns false', () => {
    const store = configureStore({
      reducer: { user: userModel.reducer },
      preloadedState: {
        user: {
          ...defaultAdmin,
          role: UserRole.ADMIN,
          data: {
            ...defaultAdmin.data,
            permissions: [],
          } as User,
        },
      },
    });

    const { result } = renderHook(() => usePermission([], UserRole.ADMIN), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    expect(result.current).toBe(false);
  });

  it('for admin with permissions hook returns true', () => {
    const store = configureStore({
      reducer: { user: userModel.reducer },
      preloadedState: {
        user: {
          ...defaultAdmin,
          role: UserRole.ADMIN,
        },
      },
    });

    const { result } = renderHook(
      () => usePermission([AdminPermission.BLOG], UserRole.ADMIN),
      {
        wrapper: ({ children }) => (
          <Provider store={store}>{children}</Provider>
        ),
      }
    );

    expect(result.current).toBe(true);
  });
});

describe('check how usePermission works with volunteer', () => {
  it('for volunteer hook returns false', () => {
    const store = configureStore({
      reducer: { user: userModel.reducer },
      preloadedState: {
        user: {
          ...defaultVolunteer,
          role: UserRole.VOLUNTEER,
        },
      },
    });

    const { result } = renderHook(
      () => usePermission([UserStatus.ACTIVATED], UserRole.VOLUNTEER),
      {
        wrapper: ({ children }) => (
          <Provider store={store}>{children}</Provider>
        ),
      }
    );

    expect(result.current).toBe(false);
  });
});

describe('check how usePermission works with recipient', () => {
  it('for recipient hook returns false', () => {
    const store = configureStore({
      reducer: { user: userModel.reducer },
      preloadedState: {
        user: {
          ...defaultRecipient,
          role: UserRole.RECIPIENT,
        },
      },
    });

    const { result } = renderHook(
      () => usePermission([UserStatus.ACTIVATED], UserRole.RECIPIENT),
      {
        wrapper: ({ children }) => (
          <Provider store={store}>{children}</Provider>
        ),
      }
    );

    expect(result.current).toBe(false);
  });
});
