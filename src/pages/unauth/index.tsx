import { useState, MouseEvent, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import { fetchAvailableTasks } from 'entities/task/model';
import { UserInfo } from 'entities/user';
import { ContentLayout } from 'shared/ui/content-layout';
import { PageLayout } from 'shared/ui/page-layout';
import { SmartHeader } from 'shared/ui/smart-header';
import YandexMap from 'shared/ui/map';
import { Icon } from 'shared/ui/icons';
import { ButtonContainer } from 'shared/ui/button-container';
import { CardButton } from 'shared/ui/card-button';
import { Filter } from 'features/filter/ui';

import styles from './styles.module.css';

export function UnauthPage() {
  const { tasks } = useAppSelector((store) => store.tasks);

  const dispatch = useAppDispatch();

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
          <ButtonContainer>
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
            width="100%"
            height="100%"
            onClick={() => 3}
          />
        </ContentLayout>
      }
    />
  );
}
