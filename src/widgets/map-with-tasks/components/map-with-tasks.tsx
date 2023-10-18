/* eslint-disable import/no-named-as-default */
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { useGetTasksQuery } from 'services/tasks-api';
import YandexMap from 'widgets/map';
import { Loader } from 'shared/ui/loader';

export const MapWithTasks = () => {
  const { isLoading, data } = useGetTasksQuery('', { pollingInterval: 30000 });
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate('/register');
  }, [navigate]);

  return isLoading || !data ? (
    <Loader />
  ) : (
    data && (
      <YandexMap tasks={data} width="100%" height="90%" onClick={handleClick} />
    )
  );
};
