import type { ComponentType, FunctionComponent } from "react";
import { YMaps } from "@pbe/react-yandex-maps";

export function withYmaps(WrappedComponent: ComponentType): FunctionComponent {
  return function wrappedComponent() {
    return (
      <YMaps query={{ load: "Map,Placemark,map.addon.balloon,geoObject.addon.balloon" }} >
        <WrappedComponent />
      </YMaps>
    );
  };
}
