import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from 'app/hooks';
import { isRootSelector } from 'entities/user/model';
import { UserRole } from 'shared/types/common.types';
import { actions, checkTokenThunk } from 'services/system-slice';
import { getTokenAccess } from 'shared/libs/utils';
import useAsyncAction from 'shared/hooks/useAsyncAction';

const MOCK_USERS = {
  Volunteer: '222',
  Recipient: '333',
  UnconfirmedRecipient: '555',
  UnconfirmedVolunteer: '111',
  BlockedVolunteer: '888',
  BlockedRecipient: '777',
  VolunteerWith30tasks: '999',
  VolunteerWith60tasks: '1111',
  VolunteerWith60tasksAndKey: '2222',
};

export function PickRolePage() {
  const dispatch = useAppDispatch();
  const role = useAppSelector((state) => state.user.role);
  const isRoot = useAppSelector(isRootSelector);

  const [userId, setUserId] = useState<string | null>(null);
  const [value, setValue] = useState<string | null>(null);

  const [mockLogin] = useAsyncAction(actions.mockUserLoginThunk);

  const handleEditId = (id: string) => {
    setUserId(id);
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

  return (
    <div>
      <h1>Временная страница выбора ролей</h1>

      {role && <h2>Сейчас у вас роль: {role}</h2>}

      <ul style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <li>
          <button
            onClick={() => handleEditId(MOCK_USERS.Volunteer)}
            style={{ marginRight: 10 }}
          >
            Волонтер
          </button>
        </li>
        <li>
          <button
            onClick={() => handleEditId(MOCK_USERS.UnconfirmedVolunteer)}
            style={{ marginRight: 10 }}
          >
            Неподтвержденный Волонтер
          </button>
        </li>
        <li>
          <button
            onClick={() => handleEditId(MOCK_USERS.BlockedVolunteer)}
            style={{ marginRight: 10 }}
          >
            Заблокированный Волонтер
          </button>
        </li>
        <li>
          <button
            onClick={() => handleEditId(MOCK_USERS.VolunteerWith30tasks)}
            style={{ marginRight: 10 }}
          >
            Волонтер c 30-ю завершенными заявками
          </button>
        </li>
        <li>
          <button
            onClick={() => handleEditId(MOCK_USERS.VolunteerWith60tasks)}
            style={{ marginRight: 10 }}
          >
            Волонтер c 60-ю завершенными заявками
          </button>
        </li>
        <li>
          <button
            onClick={() => handleEditId(MOCK_USERS.VolunteerWith60tasksAndKey)}
            style={{ marginRight: 10 }}
          >
            Волонтер c 60-ю завершенными заявками и ключом
          </button>
        </li>
        <li>
          <button
            onClick={() => handleEditId(MOCK_USERS.Recipient)}
            style={{ marginRight: 10 }}
          >
            Реципиент
          </button>
        </li>
        <li>
          <button
            onClick={() => handleEditId(MOCK_USERS.UnconfirmedRecipient)}
            style={{ marginRight: 10 }}
          >
            Неподтвержденный Реципиент
          </button>
        </li>
        <li>
          <button
            onClick={() => handleEditId(MOCK_USERS.BlockedRecipient)}
            style={{ marginRight: 10 }}
          >
            Заблокированный Реципиент
          </button>
        </li>
        <li>
          <p>Extra user</p>
          <input onChange={({ target }) => setValue(target.value)} />
          <button onClick={() => setUserId(value)}>Check</button>
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
      </div>
    </div>
  );
}
