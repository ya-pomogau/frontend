import YandexMap from 'widgets/map';
import { useAppSelector } from 'app/hooks';
import {
  useGetActiveTasksForUnauthQuery,
  useGetTaskQuery,
} from 'services/user-task-api';
import { useMediaQuery, useUser, useGeolocation } from 'shared/hooks';
import { isUnConfirmedSelector } from 'entities/user/model';
import { Breakpoints } from 'shared/config';
import { Loader } from '../../../shared/ui';

export const MapWithTasks = () => {
  const { coords, apiError } = useGeolocation();
  const mediaQuery = useMediaQuery(Breakpoints.L);
  const user = useUser();
  const isUnConfirmed = useAppSelector(isUnConfirmedSelector);

  const [longitude, latitude] = !apiError
    ? [coords.latitude, coords.longitude]
    : user && user.location
    ? user.location
    : [37.621157, 55.890017];

  const { data, isLoading } = useGetTaskQuery(
    {
      latitude,
      longitude,
    },
    {
      skip: isUnConfirmed || !user,
    }
  );

  const { data: tasksForUnauth, isLoading: isLoadingTasks } =
    useGetActiveTasksForUnauthQuery(
      {
        latitude,
        longitude,
      },
      {
        skip: Boolean(user) && !coords.latitude && !coords.longitude,
      }
    );

  const tasks = user ? data : tasksForUnauth;

  return isLoading || isLoadingTasks ? (
    <Loader />
  ) : (
    <YandexMap
      tasks={tasks}
      width="100%"
      height={mediaQuery ? '75vh' : '709px'}
      isAuthorised={user !== null}
      mapSettings={{
        latitude,
        longitude,
        zoom: 15,
      }}
    />
  );
};
