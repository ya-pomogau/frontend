import { useGetUsersQuery } from 'services/user-api';

import { PageSubMenuForAdmins } from 'widgets/page-sub-menu';
import { UserCard } from 'widgets/user-card';

import { Icon } from 'shared/ui/icons';
import { SmartHeader } from 'shared/ui/smart-header';
import { Loader } from 'shared/ui/loader';

export function RequestsVolunteersPage() {
  const { isLoading, data = [] } = useGetUsersQuery('volunteer', {
    pollingInterval: 30000,
  });

  return (
    <>
      <SmartHeader
        icon={<Icon color="blue" icon="BlockIcon" size="54" />}
        text="Подтверждение / Блокировка"
      />

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
    </>
  );
}
