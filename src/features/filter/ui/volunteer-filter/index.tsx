import {useLocation} from "react-router-dom";
import { JSX } from "react";
import { TVolunteerFilter } from "../types";
import { MapMode } from "./mapMode";
import { CompletedMode } from "./completedMode";
import { ActiveMode } from "./activeMode";

interface Props {
  filter: TVolunteerFilter;
  onChange: (name: string, value: string[] | string) => void;
}

export const VolunteerFilter = ({ filter, onChange }: Props) => {

  // определяем текущий вариант профиля волонтёра по пути в URL
  const pathnameAsArray = useLocation().pathname.slice(1).split('/');
  const currentModeOfProfile = pathnameAsArray[pathnameAsArray.indexOf('volunteer') + 1];

  let currentModeOfFilter: JSX.Element;
  switch (currentModeOfProfile) {
    case 'map':
      currentModeOfFilter = <MapMode
        filter={filter}
        onChange={onChange}
        modeOfProfile={currentModeOfProfile}
      />;
      break;
    case 'completed':
      currentModeOfFilter = <CompletedMode filter={filter.sortBy} onChange={onChange}/>;
      break;
    case 'active':
      currentModeOfFilter = <ActiveMode 
        filter={filter} 
        onChange={onChange} 
        modeOfProfile={currentModeOfProfile}
      />;
      break;
    default:
      currentModeOfFilter = <span>Для такого вида профиля волонтёра нет подходящего фильтра</span>;
  }

  return currentModeOfFilter;
};
