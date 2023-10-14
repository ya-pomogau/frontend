import { Provider } from 'react-redux';
import { YMaps } from '@pbe/react-yandex-maps';

import { AppRoutes } from 'app/routing';
import { YMAPS_API_KEY, YMAPS_SUGGEST_API_KEY } from 'config/ymaps/api-keys';
import { YMAPS_SUGGEST_SWITCHER } from 'config/ymaps/switches-api';
import { store } from './store';
import { getFullQueriesForYApi } from 'shared/libs/utils';
import './assets/styles/index.css';
import ErrorBoundary from 'features/error-boundary';

function App() {
  return (
    <>
      <Provider store={store}>
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
      </Provider>
    </>
  );
}

export default App;
