import { useState, MouseEvent, useRef, useEffect } from 'react';
import {
  NavLink,
  Navigate,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import { useMediaQuery } from 'shared/hooks';

import { UserInfo } from 'entities/user';
import { setUserRole } from 'entities/user/model';
import {
  fetchAvailableTasks,
  fetchActiveTasks,
  fetchCompletedTasks,
} from 'entities/task/model';
import { TaskList } from 'entities/task/ui/task-list';
import { ContentLayout } from 'shared/ui/content-layout';
import { PageLayout } from 'shared/ui/page-layout';
import { SmartHeader } from 'shared/ui/smart-header';
import YandexMap from 'shared/ui/map';
import { Icon } from 'shared/ui/icons';
import { ButtonContainer } from 'shared/ui/button-container';
import { CardButton } from 'shared/ui/card-button';
import { Filter } from 'features/filter/ui';
import { NotFoundPage } from 'pages/not-found';

import styles from './styles.module.css';

export function VolunteerPage() {
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
  useEffect(() => {
    window.addEventListener('resize', getButtonPosition);
    return () => {
      window.removeEventListener('resize', getButtonPosition);
    };
  }, []);
  const isMobile = useMediaQuery('(max-width:1150px)');
  const dispatch = useAppDispatch();

  const { pathname } = useLocation();

  const user = useAppSelector((store) => store.user.data);
  const isAuth = !!useAppSelector((store) => store.user.role);
  const { tasks } = useAppSelector((store) => store.tasks);

  useEffect(() => {
    dispatch(setUserRole('volunteer'));
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      if (pathname.includes('/map')) {
        dispatch(fetchAvailableTasks());
      }
      if (pathname.includes('/active')) {
        dispatch(fetchActiveTasks());
      }
      if (pathname.includes('/completed')) {
        dispatch(fetchCompletedTasks());
      }
    }
  }, [dispatch, pathname, user]);

  return (
    <PageLayout
      side={
        <>
          <div className={styles.user}>
            <UserInfo />
          </div>
          <ButtonContainer auth={isAuth}>
            <NavLink to="map" className="link">
              {({ isActive }) => (
                <CardButton
                  customIcon={
                    <Icon color="white" icon="MapApplicationIcon" size="54" />
                  }
                  text="Карта заявок"
                  isActive={isActive}
                />
              )}
            </NavLink>
            <NavLink to="active" className="link">
              {({ isActive }) => (
                <CardButton
                  customIcon={
                    <Icon
                      color="white"
                      icon="ActiveApplicationIcon"
                      size="54"
                    />
                  }
                  text="Активные заяки"
                  isActive={isActive}
                />
              )}
            </NavLink>
            <NavLink to="completed" className="link">
              {({ isActive }) => (
                <CardButton
                  customIcon={
                    <Icon
                      color="white"
                      icon="CompletedApplicationIcon"
                      size="54"
                    />
                  }
                  text="Завершенные заявки"
                  isActive={isActive}
                />
              )}
            </NavLink>
          </ButtonContainer>
        </>
      }
      content={
        <Routes>
          <Route index element={<Navigate to="map" replace />} />
          <Route
            path="active"
            element={
              <ContentLayout
                heading={
                  <>
                    <SmartHeader
                      filterIcon={
                        <Icon color="blue" icon="FilterIcon" size="54" />
                      }
                      filterText="Фильтр"
                      onClick={openFilter}
                      settingIcon={
                        <Icon
                          color="blue"
                          icon="ActiveApplicationIcon"
                          size="54"
                        />
                      }
                      settingText="Активные заявки"
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
                <TaskList
                  userRole="volunteer"
                  isMobile={isMobile}
                  handleClickCloseButton={() => 2}
                  handleClickConfirmButton={() => 3}
                  handleClickMessageButton={() => 5}
                  handleClickPnoneButton={() => 6}
                  isStatusActive
                  tasks={tasks}
                />
              </ContentLayout>
            }
          />
          <Route
            path="completed"
            element={
              <ContentLayout
                heading={
                  <>
                    <SmartHeader
                      filterIcon={
                        <Icon color="blue" icon="FilterIcon" size="54" />
                      }
                      filterText="Фильтр"
                      onClick={openFilter}
                      settingIcon={
                        <Icon
                          color="blue"
                          icon="CompletedApplicationIcon"
                          size="54"
                        />
                      }
                      settingText="Завершенные заявки"
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
                <TaskList
                  userRole="volunteer"
                  isMobile={isMobile}
                  handleClickCloseButton={() => 2}
                  handleClickConfirmButton={() => 3}
                  handleClickMessageButton={() => 5}
                  handleClickPnoneButton={() => 6}
                  isStatusActive={false}
                  tasks={tasks}
                />
              </ContentLayout>
            }
          />
          <Route
            path="map"
            element={
              <ContentLayout
                heading={
                  <>
                    <SmartHeader
                      filterIcon={
                        <Icon color="blue" icon="FilterIcon" size="54" />
                      }
                      filterText="Фильтр"
                      onClick={openFilter}
                      settingIcon={
                        <Icon
                          color="blue"
                          icon="MapApplicationIcon"
                          size="54"
                        />
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
                />
              </ContentLayout>
            }
          />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      }
    />
  );
}
