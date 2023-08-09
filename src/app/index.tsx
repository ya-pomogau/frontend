import { Provider } from 'react-redux';
import { YMaps } from '@pbe/react-yandex-maps';

import { AppRoutes } from 'app/routing';
import { YMAPS_API_KEY } from 'config/ymaps';
import { store } from './store';

import './assets/styles/index.css';

function App() {
  return (
    <>
      <Provider store={store}>
        <YMaps
          enterprise
          query={{
            load: 'Map,Placemark,map.addon.balloon,geoObject.addon.balloon',
            apikey: YMAPS_API_KEY,
          }}
        >
          <AppRoutes />
        </YMaps>
      </Provider>
    </>
  );
}

export default App;
