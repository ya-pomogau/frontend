import { Map, YMaps } from "@pbe/react-yandex-maps";
import { Data } from "./types";
import { Mark } from "./Mark";

type Props = {
  width?: string | number;
  height?: string | number;
  mapSettings?: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
  tasks?: Data[];
  onClick?: () => void;
};

export const YandexMap = ({
  width = 500,
  height = 500,
  mapSettings = { latitude: 59.93, longitude: 30.31, zoom: 15 },
  onClick,
  tasks,
}: Props) => (
  <YMaps query={{ load: "Map,Placemark,map.addon.balloon,geoObject.addon.balloon" }}>
    <Map
      state={{
        center: [mapSettings.latitude, mapSettings.longitude],
        zoom: mapSettings.zoom,
      }}
      options={{
        suppressMapOpenBlock: true,
        yandexMapDisablePoiInteractivity: true,
      }}
      width={width}
      height={height}
    >
      {tasks?.map((task) => (
        <Mark {...task} onClick={onClick} key={task.id} />
      ))}
    </Map>
  </YMaps>
);
