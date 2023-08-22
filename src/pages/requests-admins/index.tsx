
import { useState, MouseEvent, useRef, useEffect } from 'react';

import { useGetUsersQuery } from 'services/user-api';
import { PageSubMenuForAdmins } from 'widgets/page-sub-menu';
import { SideMenuForAuthorized } from 'widgets/side-menu';

import { UserInfo } from 'entities/user';

import { PageLayout } from 'shared/ui/page-layout';
import { Icon } from 'shared/ui/icons';
import { ContentLayout } from 'shared/ui/content-layout';
import { SmartHeader } from 'shared/ui/smart-header';
import { Loader } from 'shared/ui/loader';
import { UserCard } from 'widgets/user-card';

import styles from './styles.module.css';

export function RequestsAdminsPage() {
  const { isLoading, data = [] } = useGetUsersQuery('admin', {
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
                  <li key={item.data.id}>
                    <UserCard
                      avatarLink={item.data.avatar}
                      avatarName={item.data.fullname}
                      userName={item.data.fullname}
                      userId={item.data.id}
                      userNumber={item.data.phone}
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
