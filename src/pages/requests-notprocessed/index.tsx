import { useState, MouseEvent, useRef, useEffect } from 'react';

import { useAppSelector } from 'app/hooks';
import { useGetUncomfirmedQuery } from 'services/user-api';
import { PageSubMenuForAdmins } from 'widgets/page-sub-menu';
import { Filter } from 'features/filter';
import { Icon } from 'shared/ui/icons';
import { SmartHeader } from 'shared/ui/smart-header';

import { Loader } from 'shared/ui/loader';
import { UserCard } from 'widgets/user-card';

export function RequestsNotprocessedPage() {
  const { role } = useAppSelector((store) => store.user);

  //хук сейчас не нуждается в аргументах, но если не указать аргумент перед
  //pollingInterval, то рефетча не будет
  const { isLoading, data } = useGetUncomfirmedQuery(role, {
    pollingInterval: 30000,
  });

  return (
    <>
      <SmartHeader
        icon={<Icon color="blue" icon="BlockIcon" size="54" />}
        text="Подтверждение / Блокировка"
        filter={<Filter items={{ userCategories: true }} />}
      />
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
    </>
  );
}
