import { useEffect, useState } from 'react';

const getOnlineStatus = () => {
  return typeof window !== undefined && typeof window.navigator !== undefined
    ? window.navigator.onLine
    : true;
};

export const useIsOnline = () => {
  const [isOnline, setOnline] = useState(getOnlineStatus());

  const toggleNetworkStatus = () => setOnline(getOnlineStatus());

  useEffect(() => {
    window.addEventListener('online', toggleNetworkStatus);
    window.addEventListener('offline', toggleNetworkStatus);

    return () => {
      window.removeEventListener('online', toggleNetworkStatus);
      window.removeEventListener('offline', toggleNetworkStatus);
    };
  }, []);

  return isOnline;
};
