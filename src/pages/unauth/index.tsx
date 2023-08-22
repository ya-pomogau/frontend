import { useState, MouseEvent, useRef, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import { useAppSelector } from 'app/hooks';
import { SmartHeader } from 'shared/ui/smart-header';
import { Icon } from 'shared/ui/icons';
import { Filter } from 'features/filter/ui';
import { MapWithTasks } from 'widgets/map-with-tasks';

export function UnauthPage() {
  const [isFilterVisibel, setIsFilterVisibel] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ top: 0, right: 0 });
  const buttonFilterRef = useRef<Element>();

  const getButtonPosition = () => {
    const buttonRect = buttonFilterRef.current?.getBoundingClientRect();

    if (buttonRect) {
      setButtonPosition({
        top: buttonRect.bottom,
        right: buttonRect.right,
      });
    }
  };

  const openFilter = (e: MouseEvent) => {
    e.stopPropagation();

    if (isFilterVisibel === false) {
      buttonFilterRef.current = e.currentTarget;
      getButtonPosition();
    }

    setTimeout(() => setIsFilterVisibel(!isFilterVisibel));
  };

  useEffect(() => {
    window.addEventListener('resize', getButtonPosition);

    return () => {
      window.removeEventListener('resize', getButtonPosition);
    };
  }, []);

  const { role } = useAppSelector((state) => state.user);
  if (role) {
    return <Navigate to="/profile" replace />;
  }

  return (
    <>
      <SmartHeader
        filterIcon={<Icon color="blue" icon="FilterIcon" size="54" />}
        filterText="Фильтр"
        onClick={openFilter}
        settingIcon={<Icon color="blue" icon="MapApplicationIcon" size="54" />}
        settingText="Карта заявок"
      />

      {isFilterVisibel && (
        <Filter
          userRole="volunteer"
          changeVisible={() => setIsFilterVisibel(false)}
          position={buttonPosition}
        />
      )}
      <MapWithTasks />
    </>
  );
}
