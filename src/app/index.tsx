import { Provider } from 'react-redux';
import { YMaps } from '@pbe/react-yandex-maps';

import { AppRoutes } from 'app/routing';
import { YMAPS_API_KEY } from 'config/ymaps';
import { store } from './store';

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
              apikey: YMAPS_API_KEY,
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
