import { useState, MouseEvent, useRef, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import { useAppSelector } from 'app/hooks';

import { UserInfo } from 'entities/user';
import { ContentLayout } from 'shared/ui/content-layout';
import { PageLayout } from 'shared/ui/page-layout';
import { SmartHeader } from 'shared/ui/smart-header';
import { Icon } from 'shared/ui/icons';
import { Filter } from 'features/filter/ui';
import { MapWithTasks } from 'widgets/map-with-tasks';
import { VolunteerSideMenu } from 'widgets/side-menu';

import styles from './styles.module.css';

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
    <PageLayout
      side={
        <>
          <div className={styles.user}>
            <UserInfo />
          </div>

          <VolunteerSideMenu />
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
          <MapWithTasks />
        </ContentLayout>
      }
    />
  );
}
