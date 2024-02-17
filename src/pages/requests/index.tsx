import { PageSubMenuForAdmins } from 'widgets/page-sub-menu';

import { Icon } from 'shared/ui/icons';
import { SmartHeader } from 'shared/ui/smart-header';
import { Loader } from 'shared/ui/loader';
import styles from './styles.module.css';
import { Input } from 'shared/ui/input';

import { testUsers } from 'pages/requests/test-users';
import { useMemo, useState } from 'react';
import { Filter } from '../../features/filter';
import { RequestsTab } from '../requests-tab';
import { useAppSelector } from '../../app/hooks';
import { userSelector } from '../../services/system-slice';
import { UserCardType } from '../../shared/types/user-cards.types';
import { Tabs, UserRole } from '../../shared/types/common.types';
import {
  useGetUserByRolesQuery,
  useGetAllAdminsQuery,
} from 'services/admin-api';

interface PageProps {
  incomeTab: string;
}

export function RequestsPage({ incomeTab }: PageProps) {
  //const { volunteerIsLoading, volunteerData = [] } = useGetUsersQuery('volunteer', {
  //  pollingInterval: 30000,
  //});
  //const { recipientsIsLoading, recipientsData = [] } = useGetUsersQuery('recipients', {
  //  pollingInterval: 30000,
  //});
  //хук сейчас не нуждается в аргументах, но если не указать аргумент перед
  //pollingInterval, то рефетча не будет
  // const { notprocessedIsLoading, notprocessedData } = useGetUncomfirmedQuery(role, {
  //   pollingInterval: 30000,
  // });
  //const { adminIsLoading, adminData = [] } = useGetUsersQuery('admin', {
  //  pollingInterval: 30000,
  //});

  const { data: data1 } = useGetUserByRolesQuery('volunteers');
  const { data: allAdmins } = useGetAllAdminsQuery('');
  const { data: data2 } = useGetUserByRolesQuery('recipients');
  const { data: data3 } = useGetUserByRolesQuery('unconfirmed');
  console.log('🚀  unconfirmed:', data3);
  console.log('🚀  recipients:', data2);
  console.log('🚀  allAdmins:', allAdmins);
  console.log('🚀  volunteers:', data1);
  const { role } = useAppSelector((state) => state.user);
  const isRoot = useAppSelector((state) => state.user.data?.isRoot);
  const usertest = useAppSelector(userSelector);
  const [activeTab, setActiveTab] = useState(incomeTab);
  const [searchName, setSearchName] = useState('');

  // заглушка на получение тестовых данных из файла и распределение по константам
  console.log(incomeTab);
  console.log(usertest);
  const recipientsData = testUsers.filter(
    (user: UserCardType) => user.role === UserRole.RECIPIENT
  );
  const volunteersData = testUsers.filter(
    (user: UserCardType) => user.role === UserRole.VOLUNTEER
  );
  const adminsData = testUsers.filter(
    (user: UserCardType) => user.role === UserRole.ADMIN
  );

  const tabRecipientsData = useMemo(() => {
    return recipientsData
      .sort((a: UserCardType, b: UserCardType) => {
        if (!a.volunteerInfo.approved) return -1;
        return 1;
      })
      .filter((user: UserCardType) =>
        user.userName.toLowerCase().includes(searchName.toLowerCase())
      );
  }, [recipientsData, searchName]);

  const countersOnTabsRecipients = useMemo(() => {
    return Object.keys(
      recipientsData.filter(
        (user: UserCardType) => !user.volunteerInfo.approved
      )
    ).length;
  }, [recipientsData]);

  const tabVolunteersData = useMemo(() => {
    return volunteersData
      .sort((a: UserCardType, b: UserCardType) => {
        if (a.volunteerInfo.checked && a.volunteerInfo.scores >= 60) return -1;
        else if (!a.volunteerInfo.checked && a.volunteerInfo.scores >= 30)
          return -1;
        else if (!a.volunteerInfo.approved) return -1;
        return 1;
      })
      .filter((user: UserCardType) =>
        user.userName.toLowerCase().includes(searchName.toLowerCase())
      );
  }, [volunteersData, searchName]);

  const countersOnTabsVolunteers = useMemo(() => {
    return Object.keys(
      volunteersData.filter(
        (user: UserCardType) =>
          (user.volunteerInfo.checked && user.volunteerInfo.scores >= 60) ||
          (!user.volunteerInfo.checked && user.volunteerInfo.scores >= 30) ||
          !user.volunteerInfo.approved
      )
    ).length;
  }, [volunteersData]);

  const tabAdminsData = useMemo(() => {
    if (!isRoot) return [];
    return adminsData
      .sort((a: UserCardType, b: UserCardType) => {
        if (!a.volunteerInfo.approved) return 1;
        return -1;
      })
      .filter((user: UserCardType) =>
        user.userName.toLowerCase().includes(searchName.toLowerCase())
      );
  }, [adminsData, searchName]);

  const tabNotProcessedData = useMemo(() => {
    return [
      ...tabVolunteersData.slice(0, countersOnTabsVolunteers),
      ...tabRecipientsData.slice(0, countersOnTabsRecipients),
    ];
  }, [countersOnTabsVolunteers, countersOnTabsRecipients]);

  return (
    <>
      {incomeTab === Tabs.NOTPROCESSED ? (
        <SmartHeader
          icon={<Icon color="blue" icon="BlockIcon" size="54" />}
          text="Подтверждение / Блокировка"
          filter={<Filter items={{ userCategories: true }} />}
        />
      ) : (
        <SmartHeader
          icon={<Icon color="blue" icon="BlockIcon" size="54" />}
          text="Подтверждение / Блокировка"
        />
      )}
      <PageSubMenuForAdmins
        counters={{
          volunteers: countersOnTabsVolunteers,
          recipients: countersOnTabsRecipients,
          notprocessed: countersOnTabsVolunteers + countersOnTabsRecipients,
          admins: 0,
        }}
      />
      <Input
        extClassName={styles.input}
        value={searchName}
        name="name"
        onChange={(e) => setSearchName(e.target.value)}
        placeholder={'Введите имя'}
        type="name"
        label="Введите имя "
      />
      {/* ToDo:Настроить лоадер в зависимости от получения данных : или получить все вкладки и показывать, или только открытую, остальные в фоне. */}
      {/*{isLoading ? <Loader /> : tabContent}*/}a
      {data1 && data2 && data3 && allAdmins && (
        <RequestsTab
          data={
            incomeTab === Tabs.VOLUNTEERS
              ? data1
              : incomeTab === Tabs.RECIPIENTS
              ? data2
              : incomeTab === Tabs.NOTPROCESSED
              ? data3
              : allAdmins
          }
        />
      )}
    </>
  );
}
