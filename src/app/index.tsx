import { YMaps } from '@pbe/react-yandex-maps';

import { AppRoutes } from 'app/routing';
import { YMAPS_API_KEY, YMAPS_SUGGEST_API_KEY } from 'config/ymaps/api-keys';
import { YMAPS_SUGGEST_SWITCHER } from 'config/ymaps/switches-api';

import { getFullQueriesForYApi, getTokenAccess } from 'shared/libs/utils';
import './assets/styles/index.css';
import ErrorBoundary from 'features/error-boundary';
import { useEffect } from 'react';
import { useAppDispatch } from './hooks';
import { checkTokenThunk } from 'services/system-slice';

function App() {
  const dispatch = useAppDispatch();
  const location = window.location;
  window.localStorage.setItem('currentPathName', location.pathname);

  useEffect(() => {
    const token = getTokenAccess();
    if (token) {
      dispatch(checkTokenThunk(token));
    }
  }, []);

  return (
    <ErrorBoundary>
      <YMaps
        enterprise
        query={{
          load: 'Map,Placemark,map.addon.balloon,geoObject.addon.balloon',
          apikey: getFullQueriesForYApi(YMAPS_API_KEY, {
            suggest_apikey: {
              enable: YMAPS_SUGGEST_SWITCHER,
              apiKey: YMAPS_SUGGEST_API_KEY,
            },
          }),
        }}
      >
        <AppRoutes />
      </YMaps>
    </ErrorBoundary>
  );
}

export default App;
