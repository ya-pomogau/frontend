/* eslint-disable import/no-named-as-default */
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { useGetTasksQuery } from 'services/tasks-api';
import YandexMap from 'widgets/map';
import { Loader } from 'shared/ui/loader';
import { useAppSelector } from 'app/hooks';
// type MapWithTasksType = {
//   userLocation: Array<number>,
// }
export const MapWithTasks = () => {
  const { isLoading, data } = useGetTasksQuery('', { pollingInterval: 30000 });
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user.data);
  const handleClick = useCallback(() => {
    navigate('/register');
  }, [navigate]);

  return isLoading || !data ? (
    // <Loader />
    // TODO: временная заглушка, чтобы не падала приложение, так как данные тасок еще не приходят с сервера
    <p>loading</p>
  ) : (
    data && (
      <YandexMap
        tasks={data}
        width="100%"
        height="90%"
        onClick={handleClick}
        isAuthorised={user !== null ? true : false}
      />
    )
  );
};
