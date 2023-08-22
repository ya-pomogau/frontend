import { useState, MouseEvent, useRef, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import { Filter } from 'features/filter/ui';
import { fetchAvailableTasks } from 'entities/task/model';
import { SmartHeader } from 'shared/ui/smart-header';
import YandexMap from 'widgets/map';
import { Icon } from 'shared/ui/icons';
import { useGetTasksQuery } from 'services/tasks-api';
import { Loader } from 'shared/ui/loader';

export function ProfileMapPage() {
  const [isFilterVisibel, setIsFilterVisibel] = useState(false);
  const buttonFilterRef = useRef<Element>();

  // данные о позиции кнопки вызова фильтра, на основе которых определяется позиция фильтра
  const [buttonPosition, setButtonPosition] = useState({ top: 0, right: 0 });

  // открытие фильтра и определение данных о позиции кнопки, вызвавшей фильтр
  const getButtonPosition = () => {
    const buttonRect = buttonFilterRef.current?.getBoundingClientRect();
    if (buttonRect) {
      setButtonPosition({ top: buttonRect.bottom, right: buttonRect.right });
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

  const dispatch = useAppDispatch();

  const user = useAppSelector((store) => store.user.data);
  // const { role } = useAppSelector((store) => store.user);
  // const { tasks } = useAppSelector((store) => store.tasks);

  const { isLoading, data } = useGetTasksQuery('', {
    pollingInterval: 30000,
  });

  useEffect(() => {
    window.addEventListener('resize', getButtonPosition);
    return () => {
      window.removeEventListener('resize', getButtonPosition);
    };
  }, []);

  useEffect(() => {
    dispatch(fetchAvailableTasks());
  }, []);

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
      {isLoading ? (
        <Loader />
      ) : (
        data && (
          // при рефетче к таскам карта сбрасывается обратно на координаты пользователя
          <YandexMap
            tasks={data}
            mapSettings={{
              latitude: user ? user.coordinates[0] : 59.938955,
              longitude: user ? user.coordinates[1] : 30.315644,
              zoom: 15,
            }}
            width="100%"
            height="100%"
            onClick={() => 3}
            isAuthorised={true}
          />
        )
      )}
    </>
  );
}
