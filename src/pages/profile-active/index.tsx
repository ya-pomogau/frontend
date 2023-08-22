import { useState, MouseEvent, useRef, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import { Filter } from 'features/filter/ui';
import { fetchActiveTasks } from 'entities/task/model';
import { TaskList } from 'entities/task/ui/task-list';
import { useMediaQuery } from 'shared/hooks';
import { SmartHeader } from 'shared/ui/smart-header';
import { Icon } from 'shared/ui/icons';

export function ProfileActivePage() {
  const [isFilterVisibel, setIsFilterVisibel] = useState(false);
  const buttonFilterRef = useRef<Element>();
  const user = useAppSelector((state) => state.user.data);

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

  useEffect(() => {
    window.addEventListener('resize', getButtonPosition);
    return () => {
      window.removeEventListener('resize', getButtonPosition);
    };
  }, []);

  const isMobile = useMediaQuery('(max-width:1150px)');

  const dispatch = useAppDispatch();

  const { tasks } = useAppSelector((store) => store.tasks);

  useEffect(() => {
    dispatch(fetchActiveTasks());
  }, []);

  return (
    <>
      <SmartHeader
        filterIcon={<Icon color="blue" icon="FilterIcon" size="54" />}
        filterText="Фильтр"
        onClick={openFilter}
        settingIcon={
          <Icon color="blue" icon="ActiveApplicationIcon" size="54" />
        }
        settingText="Активные заявки"
      />
      {isFilterVisibel && (
        <Filter
          userRole={user?.role}
          changeVisible={() => setIsFilterVisibel(false)}
          position={buttonPosition}
        />
      )}
      <TaskList
        userRole={user?.role}
        isMobile={isMobile}
        handleClickCloseButton={() => 2}
        handleClickConfirmButton={() => 3}
        handleClickMessageButton={() => 5}
        handleClickPnoneButton={() => 6}
        isStatusActive
        tasks={tasks}
      />
    </>
  );
}
