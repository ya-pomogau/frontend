import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { YMaps } from "@pbe/react-yandex-maps";

import { store } from "./store";
import { AppRoutes } from "../pages";

import "./assets/styles/index.css";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <YMaps
          enterprise
          query={{
            load: "Map,Placemark,map.addon.balloon,geoObject.addon.balloon",
            apikey: "0cdc3c9a-36a5-482d-8090-9c74d8d5f92e",
          }}
        >
          <AppRoutes />
        </YMaps>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
