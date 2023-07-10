import { Map, YMaps } from "@pbe/react-yandex-maps";

import type { Task } from "entities/task/types";
import { isTaskUrgent } from "shared/libs/utils";
import { Mark } from "./Mark";

type YandexMapProps = {
  width?: string | number;
  height?: string | number;
  mapSettings?: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
  tasks?: Task[];
  onClick?: () => void;
};

export const YandexMap = ({
  width = 500,
  height = 500,
  mapSettings = { latitude: 59.93, longitude: 30.31, zoom: 15 },
  onClick,
  tasks,
}: YandexMapProps) => (
  <YMaps
    query={{ load: "Map,Placemark,map.addon.balloon,geoObject.addon.balloon" }}
  >
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
        <Mark 
          id={task.id}
          coordinates={task.coordinates}
          isUrgentTask={isTaskUrgent(task.date)}
          fullName={task.recipient.fullname}
          phone={task.recipient.phone}
          avatar={task.recipient.avatar}
          description={task.description}
          count={task.category.scope}
          onClick={onClick}
          key={task.id} 
        />
      ))}
    </Map>
  </YMaps>
);
