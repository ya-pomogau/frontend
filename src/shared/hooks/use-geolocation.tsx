import { useState, useEffect, useRef } from 'react';

interface GeolocationPosition {
  coords: {
    latitude: number;
    longitude: number;
  };
}

const geolocationOptions: PositionOptions = {
  enableHighAccuracy: true,
  timeout: 1000 * 60 * 1,
  maximumAge: 1000 * 3600 * 24,
};

const useGeolocation = (
  options = geolocationOptions
): GeolocationPosition & { apiError: string } => {
  const [apiError, setApiError] = useState('');
  const [geolocation, setGeolocation] = useState<GeolocationPosition>({
    coords: {
      latitude: 0,
      longitude: 0,
    },
  });

  const locationWatchId = useRef<unknown>(null);

  const successHandler = (position: GeolocationPosition) => {
    const { latitude, longitude } = position.coords;

    setGeolocation({
      coords: {
        latitude,
        longitude,
      },
    });
  };

  const errorHandler = (error: GeolocationPositionError) => {
    setApiError(`Ошибка при получении геолокации: ${error}`);
  };

  const cancelLocationWatch = () => {
    if (locationWatchId.current && navigator.geolocation) {
      if (typeof locationWatchId.current === 'number') {
        navigator.geolocation.clearWatch(locationWatchId.current);
      }
    }
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      setApiError('Геолокация не поддерживается');
    }

    locationWatchId.current = navigator.geolocation.watchPosition(
      successHandler,
      errorHandler,
      options
    );

    return cancelLocationWatch;
  }, [options]);

  return { coords: geolocation.coords, apiError };
};

export default useGeolocation;
