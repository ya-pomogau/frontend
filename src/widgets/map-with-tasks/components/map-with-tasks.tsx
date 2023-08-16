import { FC, useEffect } from 'react';

import { useAppSelector, useAppDispatch } from 'app/hooks';
import { fetchAvailableTasks } from 'entities/task/model';
import YandexMap from 'widgets/map';
import { useGetTasksQuery } from 'services/tasks-api';
import { Loader } from 'shared/ui/loader';

export const MapWithTasks: FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading, data } = useGetTasksQuery('', { pollingInterval: 30000 });

  useEffect(() => {
    dispatch(fetchAvailableTasks());
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    data && <YandexMap tasks={data} width="100%" height="100%" />
  );
};
