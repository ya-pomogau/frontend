import { YMaps } from '@pbe/react-yandex-maps';

import { AppRoutes } from 'app/routing';
import { YMAPS_API_KEY, YMAPS_SUGGEST_API_KEY } from 'config/ymaps/api-keys';
import { YMAPS_SUGGEST_SWITCHER } from 'config/ymaps/switches-api';

import { getFullQueriesForYApi } from 'shared/libs/utils';
import './assets/styles/index.css';
import ErrorBoundary from 'features/error-boundary';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './hooks';
import { checkTokenThunk } from 'services/system-slice';
import { useNavigate } from 'react-router-dom';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      console.log(`token: '${token}'`);
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
