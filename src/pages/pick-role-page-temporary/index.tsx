// !!!

// ЭТО ВРЕМЕННАЯ СТРАНИЦА ДЛЯ РУЧНОГО ВЫБОРА РОЛЕЙ. ДОСТУПНА ПО РОУТУ /pick
// СТРАНИЦУ НЕОБХОДИМО УДАЛИТЬ ПОСЛЕ РЕАЛИЗАЦИИ СИСТЕМЫ АУТИФИКАЦИИ

// !!!
import { skipToken } from '@reduxjs/toolkit/query/react';
import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { Link } from 'react-router-dom';
import {
  setUserRole,
  setUser,
  logoutUser,
  enableAnyError,
  enableBlokedError,
  enableConnectionError,
} from 'entities/user/model';
import { useGetUserByIdQuery } from 'services/user-api';
import { UserRole } from 'shared/types/common.types';
import { isRootSelector } from 'entities/user/model';

export function PickRolePage() {
  const dispatch = useAppDispatch();
  const { role } = useAppSelector((state) => state.user);
  const [userId, setUserId] = useState<string | null>(null);
  const isRoot = useAppSelector(isRootSelector);
  const { data, refetch, error } = useGetUserByIdQuery(userId ?? skipToken);

  const removeRole = () => {
    dispatch(setUserRole(null));
    setUserId(null);
    dispatch(dispatch(logoutUser()));
  };

  const getVolunteerRole = () => {
    dispatch(setUserRole(UserRole.VOLUNTEER));
    setUserId('7');
  };

  const getUnconfirmedVolunteerRole = () => {
    dispatch(setUserRole(UserRole.VOLUNTEER));
    setUserId('8');
  };

  const getRecipientRole = () => {
    setUserId('4');
    dispatch(setUserRole(UserRole.RECIPIENT));
  };

  const getUnconfirmedRecipient = () => {
    dispatch(setUserRole(UserRole.RECIPIENT));
    setUserId('9');
  };

  const getAdminRole = () => {
    dispatch(setUserRole(UserRole.ADMIN));
    setUserId('2');
  };

  const getMasterAdminRole = () => {
    dispatch(setUserRole(UserRole.ADMIN));
    setUserId('1');
  };

  const handleEnableConnectionError = () => {
    dispatch(enableConnectionError());
  };
  const handleEnableBlokedError = () => {
    dispatch(enableBlokedError());
  };
  const handleEnableAnyError = () => {
    dispatch(enableAnyError());
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
      case UserRole.ADMIN:
        return '/profile/requests';
      default:
        return '/';
    }
  };

  useEffect(() => {
    if (userId && data) {
      refetch().then(() => dispatch(setUser(data)));
    }
    if (error) {
      removeRole();
    }
  }, [data, userId, error]);

  return (
    <div>
      <h1>Временная страница выбора ролей</h1>

      {!role ? (
        <h2>Сейчас у вас нет роли</h2>
      ) : (
        <h2>Сейчас у вас роль: {role}</h2>
      )}

      <ul
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
        }}
      >
        <li>
          <button onClick={removeRole} style={{ marginRight: 10 }}>
            Убрать у себя роль
          </button>
        </li>

        <li>
          <button onClick={getVolunteerRole} style={{ marginRight: 10 }}>
            Получить роль волонтера.
          </button>
        </li>

        <li>
          <button
            onClick={getUnconfirmedVolunteerRole}
            style={{ marginRight: 10 }}
          >
            Получить роль волонтера, еще не одобренного админом.
          </button>
        </li>

        <li>
          <button onClick={getRecipientRole} style={{ marginRight: 10 }}>
            Получить роль рецепиента.
          </button>
        </li>

        <li>
          <button onClick={getUnconfirmedRecipient} style={{ marginRight: 10 }}>
            Получить роль неактивированного рецепиента.
          </button>
        </li>

        <li>
          <button onClick={getAdminRole} style={{ marginRight: 10 }}>
            Получить роль администратора.
          </button>
        </li>

        <li>
          <button onClick={getMasterAdminRole} style={{ marginRight: 10 }}>
            Получить роль главного администратора.
          </button>
        </li>
        <li>
          <button
            onClick={handleEnableConnectionError}
            style={{ marginRight: 10 }}
          >
            Добавить ошибку подключения.
          </button>
        </li>
        <li>
          <button onClick={handleEnableBlokedError} style={{ marginRight: 10 }}>
            Добавить ошибку пользователь заблокирован.
          </button>
        </li>
        <li>
          <button onClick={handleEnableAnyError} style={{ marginRight: 10 }}>
            Добавить любую ошибку.
          </button>
        </li>
      </ul>

      <h2>
        В соответствии с вашей ролью, если бы в приложении была настроена
        аутификация, вас бы перенаправило на страницу:{' '}
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
