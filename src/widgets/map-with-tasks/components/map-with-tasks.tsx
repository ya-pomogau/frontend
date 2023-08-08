import { FC, useEffect } from 'react';

import { useAppSelector, useAppDispatch } from 'app/hooks';
import { fetchAvailableTasks } from 'entities/task/model';
import YandexMap from 'shared/ui/map';

export const MapWithTasks: FC = () => {
  const dispatch = useAppDispatch();
  const { tasks } = useAppSelector((store) => store.tasks);

  useEffect(() => {
    dispatch(fetchAvailableTasks());
  }, []);

  return <YandexMap tasks={tasks} width="100%" height="100%" />;
};
