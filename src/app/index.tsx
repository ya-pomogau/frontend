import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { YMaps } from '@pbe/react-yandex-maps';

import { YMAPS_API_KEY } from 'config/ymaps';
import { store } from './store';
import { AppRoutes } from '../pages';

import './assets/styles/index.css';

function App() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}

export default App;
