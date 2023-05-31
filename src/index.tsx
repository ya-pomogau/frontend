import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "app";
import { YMaps } from "@pbe/react-yandex-maps";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <StrictMode>
    <YMaps query={{ lang: 'en_RU', load: "Map,Placemark,map.addon.balloon,geoObject.addon.balloon" }}>
      <App />
    </YMaps>
  </StrictMode>
);
