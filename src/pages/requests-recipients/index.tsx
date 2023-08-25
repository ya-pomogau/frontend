import { useGetUsersQuery } from 'services/user-api';
import { PageSubMenuForAdmins } from 'widgets/page-sub-menu';
import { Icon } from 'shared/ui/icons';
import { SmartHeader } from 'shared/ui/smart-header';
import { Loader } from 'shared/ui/loader';
import { UserCard } from 'widgets/user-card';

export function RequestsRecipientsPage() {
  const { isLoading, data = [] } = useGetUsersQuery('recipient', {
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
