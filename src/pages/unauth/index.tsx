import { Navigate } from 'react-router-dom';

import { useAppSelector } from 'app/hooks';
import { MapWithTasks } from 'widgets/map-with-tasks';
import { VolunteerSideMenu } from 'widgets/side-menu';

import { Filter } from 'features/filter';
import { UserInfo } from 'entities/user';

import { ContentLayout } from 'shared/ui/content-layout';
import { PageLayout } from 'shared/ui/page-layout';
import { SmartHeader } from 'shared/ui/smart-header';
import { Icon } from 'shared/ui/icons';

import styles from './styles.module.css';

export function UnauthPage() {
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
            <SmartHeader
              icon={<Icon color="blue" icon="MapApplicationIcon" size="54" />}
              text="Карта заявок"
            />
          }
        >
          <MapWithTasks />
        </ContentLayout>
      }
    />
  );
}
