import { useState, MouseEvent, useRef, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  SideMenu,
  SideMenuForAuthorized,
  VolunteerSideMenu,
  RecipientSideMenu,
  AdminSideMenu,
  MasterSideMenu,
} from 'widgets/side-menu';
import { SideMenuLink } from 'widgets/side-menu/components/side-menu-link';
import { Filter } from 'features/filter/ui';
import { UserInfo } from 'entities/user';
import { fetchAvailableTasks } from 'entities/task/model';
import { ContentLayout } from 'shared/ui/content-layout';
import { PageLayout } from 'shared/ui/page-layout';
import { SmartHeader } from 'shared/ui/smart-header';
import YandexMap from 'widgets/map';
import { Icon } from 'shared/ui/icons';

import styles from './styles.module.css';

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
  const { role } = useAppSelector((store) => store.user);
  const { tasks } = useAppSelector((store) => store.tasks);

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
    <PageLayout
      side={
        <>
          <div className={styles.user}>
            <UserInfo />
          </div>

          <SideMenuForAuthorized />
        </>
      }
      content={
        <ContentLayout
          heading={
            <>
              <SmartHeader
                filterIcon={<Icon color="blue" icon="FilterIcon" size="54" />}
                filterText="Фильтр"
                onClick={openFilter}
                settingIcon={
                  <Icon color="blue" icon="MapApplicationIcon" size="54" />
                }
                settingText="Карта заявок"
              />
              {isFilterVisibel && (
                <Filter
                  userRole="volunteer"
                  changeVisible={() => setIsFilterVisibel(false)}
                  position={buttonPosition}
                />
              )}
            </>
          }
        >
          <YandexMap
            tasks={tasks}
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
        </ContentLayout>
      }
    />
  );
}
