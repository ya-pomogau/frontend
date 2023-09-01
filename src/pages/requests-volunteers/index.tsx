import { useGetUsersQuery } from 'services/user-api';

import { SideMenuForAuthorized } from 'widgets/side-menu';
import { PageSubMenuForAdmins } from 'widgets/page-sub-menu';
import { UserCard } from 'widgets/user-card';

import { UserInfo } from 'entities/user';

import { PageLayout } from 'shared/ui/page-layout';
import { Icon } from 'shared/ui/icons';
import { ContentLayout } from 'shared/ui/content-layout';
import { SmartHeader } from 'shared/ui/smart-header';
import { Loader } from 'shared/ui/loader';

import styles from './styles.module.css';

export function RequestsVolunteersPage() {
  const { isLoading, data = [] } = useGetUsersQuery('volunteer', {
    pollingInterval: 30000,
  });

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
              icon={<Icon color="blue" icon="BlockIcon" size="54" />}
              text="Подтверждение / Блокировка"
            />
          }
        >
          <PageSubMenuForAdmins />
          {isLoading ? (
            <Loader />
          ) : (
            <ul>
              {data.map((item: any) => {
                return (
                  <li key={item.id}>
                    <UserCard
                      avatarLink={item.avatar}
                      avatarName={item.fullname}
                      userName={item.fullname}
                      userId={item.id}
                      userNumber={item.phone}
                    />
                  </li>
                );
              })}
            </ul>
          )}
        </ContentLayout>
      }
    />
  );
}
