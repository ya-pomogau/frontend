/* eslint-disable import/no-named-as-default */
import { useEffect } from 'react';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetTasksQuery } from 'services/tasks-api';
import { useAppDispatch } from 'app/hooks';

import { fetchAvailableTasks } from 'entities/task/model';
import YandexMap from 'widgets/map';
import { Loader } from 'shared/ui/loader';

export const MapWithTasks = () => {
  const dispatch = useAppDispatch();
  const { isLoading, data } = useGetTasksQuery('', { pollingInterval: 30000 });
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate('/register');
  }, [navigate]);

  useEffect(() => {
    dispatch(fetchAvailableTasks());
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    data && (
      <YandexMap tasks={data} width="100%" height="90%" onClick={handleClick} />
    )
  );
};
