import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'app/hooks';

import YandexMap from 'widgets/map';
import { SideMenuForAuthorized } from 'widgets/side-menu';

import { MapTasksFilter } from 'features/filter';
import { UserInfo } from 'entities/user';

import { fetchAvailableTasks } from 'entities/task/model';
import { ContentLayout } from 'shared/ui/content-layout';
import { PageLayout } from 'shared/ui/page-layout';
import { SmartHeader } from 'shared/ui/smart-header';
import { Icon } from 'shared/ui/icons';

import styles from './styles.module.css';

export function ProfileMapPage() {
  const dispatch = useAppDispatch();

  const user = useAppSelector((store) => store.user.data);
  const { tasks } = useAppSelector((store) => store.tasks);

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
            <SmartHeader
              icon={<Icon color="blue" icon="MapApplicationIcon" size="54" />}
              text="Карта заявок"
              filter={<MapTasksFilter />}
            />
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
