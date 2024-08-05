import { useEffect, useState } from 'react';

export const useIsOnline = () => {
  const [isOnline, setOnline] = useState(navigator.onLine ?? true);

  const handleOnline = () => setOnline(true);
  const handleOffline = () => setOnline(false);

  useEffect(() => {
    addEventListener('online', handleOnline);
    addEventListener('offline', handleOffline);

    return () => {
      removeEventListener('online', handleOnline);
      removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
};
