/* eslint-disable import/no-named-as-default */
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import YandexMap from 'widgets/map';
import { Loader } from 'shared/ui/loader';
import { useAppSelector } from 'app/hooks';
import { useGetTaskQuery } from 'services/user-task-api';
import useGeolocation from 'shared/hooks/use-geolocation';

export const MapWithTasks = () => {
  // const { isLoading, data } = useGetTasksQuery('', { pollingInterval: 30000 });
  // const { data, isLoading } = useGetTaskVirginQuery([
  //   'volunteer',
  //   37.621157,
  //   55.890017,
  // ]);

  const startGeo = useGeolocation();
  const [callApi, setCallApi] = useState(false);
  useEffect(() => {
    if (startGeo.coords?.latitude && startGeo.coords?.longitude) {
      setCallApi(true);
    }
  }, [startGeo.coords]);

  const { data, isLoading } = useGetTaskQuery({
    latitude: callApi ? startGeo.coords.longitude : 37.621157,
    longitude: callApi ? startGeo.coords.latitude : 55.890017,
  });
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user.data);
  const handleClick = useCallback(() => {
    navigate('/register');
  }, [navigate]);

  return !callApi || !data || isLoading ? (
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
        mapSettings={{
          latitude: startGeo.coords.latitude,
          longitude: startGeo.coords.longitude,
          zoom: 15,
        }}
      />
    )
  );
};
