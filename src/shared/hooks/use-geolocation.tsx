import { useState, useEffect } from 'react';

interface GeolocationPosition {
  coords: {
    latitude: number;
    longitude: number;
  };
}

const useGeolocation = (): GeolocationPosition => {
  const [geolocation, setGeolocation] = useState<GeolocationPosition>({
    coords: {
      latitude: 0,
      longitude: 0,
    },
  });

  useEffect(() => {
    let isMounted = true;

    if (navigator.geolocation) {
      const successHandler = (position: GeolocationPosition) => {
        if (isMounted) {
          setGeolocation({
            coords: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            },
          });
        }
      };

      const errorHandler = (error: GeolocationPositionError) => {
        console.error('Ошибка при получении геолокации:', error);
      };

      const options: PositionOptions = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      };

      const watchId = navigator.geolocation.watchPosition(
        successHandler,
        errorHandler,
        options
      );
      return () => {
        isMounted = false;
        navigator.geolocation.clearWatch(watchId);
      };
    } else {
      console.log('Геолокация не поддерживается');
    }
  }, []);

  return geolocation;
};

export default useGeolocation;
