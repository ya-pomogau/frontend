import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import YandexMap from 'widgets/map';
import { useAppSelector } from 'app/hooks';
import { useGetTaskQuery } from 'services/user-task-api';
import useGeolocation from 'shared/hooks/use-geolocation';
import { useMediaQuery } from 'shared/hooks';

export const MapWithTasks = () => {
  const { coords, apiError } = useGeolocation();
  const navigate = useNavigate();
  const mediaQuery = useMediaQuery('(max-width: 910px)');
  const user = useAppSelector((state) => state.user.data);

  const [longitude, latitude] = !apiError
    ? [coords.longitude, coords.latitude]
    : user && user.location
    ? [user.location[0], user.location[1]]
    : [37.621157, 55.890017];

  const { data, isLoading } = useGetTaskQuery({
    latitude,
    longitude,
  });

  const handleClick = useCallback(() => {
    navigate('/register');
  }, [navigate]);

  return !data || isLoading ? (
    // <Loader />
    // TODO: временная заглушка, чтобы не падала приложение, так как данные тасок еще не приходят с сервера
    <p>loading</p>
  ) : (
    data && (
      <YandexMap
        tasks={data}
        width="100%"
        height={mediaQuery ? '75vh' : '64vh'}
        onClick={handleClick}
        isAuthorised={user !== null}
        mapSettings={{
          latitude,
          longitude,
          zoom: 15,
        }}
      />
    )
  );
};
