import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import useUser from './use-user';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { UserRole } from 'shared/types/common.types';
import { userModel, UserState } from 'entities/user/model';

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

const store = configureStore({
  reducer: { user: userModel.reducer },
  preloadedState: {
    user: {
      ...defaultRecipient,
      role: UserRole.RECIPIENT,
    },
  },
});

describe('check useUser', () => {
  it('', () => {
    const { result } = renderHook(() => useUser(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });
    expect(result.current).toBe(defaultRecipient.data);
  });
});
