/* eslint-disable import/no-named-as-default */
import { useGetTasksQuery } from 'services/tasks-api';
import YandexMap from 'widgets/map';
import { Loader } from 'shared/ui/loader';

export const MapWithTasks = () => {
  const { isLoading, data } = useGetTasksQuery('', { pollingInterval: 30000 });

  return isLoading ? (
    <Loader />
  ) : (
    data && <YandexMap tasks={data} width="100%" height="90%" />
  );
};
