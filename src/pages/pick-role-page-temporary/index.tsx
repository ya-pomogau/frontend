// !!!

// ЭТО ВРЕМЕННАЯ СТРАНИЦА ДЛЯ РУЧНОГО ВЫБОРА РОЛЕЙ. ДОСТУПНА ПО РОУТУ /pick
// СТРАНИЦУ НЕОБХОДИМО УДАЛИТЬ ПОСЛЕ РЕАЛИЗАЦИИ СИСТЕМЫ АУТИФИКАЦИИ

// !!!
import { skipToken } from '@reduxjs/toolkit/query/react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from 'app/hooks';
import { setUserRole, setUser, isRootSelector } from 'entities/user/model';
import { useGetUserByIdQuery } from 'services/user-api';
import { UserRole } from 'shared/types/common.types';
import { actions, checkTokenThunk } from 'services/system-slice';
import { getTokenAccess } from 'shared/libs/utils';
import useAsyncAction from 'shared/hooks/useAsyncAction';

export function PickRolePage() {
  const dispatch = useAppDispatch();
  const role = useAppSelector((state) => state.user.role);
  const isRoot = useAppSelector(isRootSelector);

  const [userId, setUserId] = useState<string | null>(null);
  const [isFirstRender, setIsFirstRender] = useState(true);

  const { data, refetch, error } = useGetUserByIdQuery(userId ?? skipToken);

  const [mockLogin] = useAsyncAction(actions.mockUserLoginThunk);

  const getVolunteerRole = () => {
    dispatch(setUserRole(UserRole.VOLUNTEER));
    setUserId('1');
    setIsFirstRender(false);
  };

  const getRecipientRole = () => {
    dispatch(setUserRole(UserRole.RECIPIENT));
    setUserId('23118510435');
    setIsFirstRender(false);
  };

  const getPageYouWouldBeRedirected = () => {
    if (isRoot) {
      return '/profile/requests';
    }
    switch (role) {
      case UserRole.VOLUNTEER:
        return '/profile/map';
      case UserRole.RECIPIENT:
        return '/profile/active';
      default:
        return '/';
    }
  };

  useEffect(() => {
    if (!userId) return;

    mockLogin(userId).then(() => {
      const token = getTokenAccess();
      if (token) {
        dispatch(checkTokenThunk(token));
      }
    });
  }, [userId, mockLogin, dispatch]);

  useEffect(() => {
    if (!userId || !data) return;

    refetch().then(() => {
      dispatch(setUser(data));
    });

    if (error) {
      dispatch(setUserRole(null));
      setUserId(null);
    }
  }, [data, userId, error]);

  return (
    <div>
      <h1>Временная страница выбора ролей</h1>

      {isFirstRender && !role && <h2>Сейчас у вас нет роли</h2>}

      {role && <h2>Сейчас у вас роль: {role}</h2>}

      <ul style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <li>
          <button onClick={getVolunteerRole} style={{ marginRight: 10 }}>
            Волонтер
          </button>
        </li>
        <li>
          <button onClick={getRecipientRole} style={{ marginRight: 10 }}>
            Реципиент
          </button>
        </li>
      </ul>

      <h2>
        В соответствии с вашей ролью, если бы в приложении была настроена
        аутентификация, вас бы перенаправило на страницу:{' '}
        {getPageYouWouldBeRedirected()}
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <Link
          to={getPageYouWouldBeRedirected()}
          style={{
            fontSize: 25,
          }}
        >
          Перейти на страницу: {getPageYouWouldBeRedirected()}
        </Link>

        <Link
          to={'/'}
          style={{
            fontSize: 25,
          }}
        >
          Перейти на главную (посмотреть полный флоу редиректов):{' '}
        </Link>
      </div>
    </div>
  );
}
