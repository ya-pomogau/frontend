import { Navigate } from 'react-router-dom';
import { useGetUsersQuery } from 'services/user-api';

import { PageSubMenuForAdmins } from 'widgets/page-sub-menu';
import { SideMenuForAuthorized } from 'widgets/side-menu';
import { UserCard } from 'widgets/user-card';

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

interface UserProps {
  role: 'volunteer' | 'recipient' | 'admin' | 'master';
  extClassName?: string;
  avatarLink: string;
  avatarName: string;
  userName: string;
  userId: number;
  userNumber: string;
  volunteerInfo?: any;
}

interface PageProps {
  incomeTab: 'volunteers' | 'recipients' | 'notprocessed' | 'admins';
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
  const { role } = useAppSelector((state) => state.user);
  const [activeTab, setActiveTab] = useState(incomeTab);
  const [searchName, setSearchName] = useState('');

  // заглушка на получение тестовых данных из файла и распределение по константам
  console.log(incomeTab);
  const recipientsData = testUsers.filter(
    (user: UserProps) => user.role == 'recipient'
  );
  const volunteersData = testUsers.filter(
    (user: UserProps) => user.role == 'volunteer'
  );
  const adminsData = testUsers.filter(
    (user: UserProps) => user.role == 'admin'
  );

  const tabRecipientsData = useMemo(() => {
    return recipientsData
      .sort((a: UserProps, b: UserProps) => {
        if (a.volunteerInfo.approved === false) {
          return -1;
        } else {
          return 1;
        }
      })
      .filter((user: UserProps) =>
        user.userName.toLowerCase().includes(searchName.toLowerCase())
      );
  }, [recipientsData, searchName]);
  const countersOnTabsRecipients = useMemo(() => {
    return Object.keys(
      recipientsData.filter(
        (user: UserProps) => user.volunteerInfo.approved === false
      )
    ).length;
  }, [recipientsData]);

  const tabVolunteersData = useMemo(() => {
    return volunteersData
      .sort((a: UserProps, b: UserProps) => {
        if (a.volunteerInfo.checked === true && a.volunteerInfo.scores >= 60) {
          return -1;
        } else {
          return 1;
        }
      })
      .sort((a: UserProps, b: UserProps) => {
        if (a.volunteerInfo.checked === false && a.volunteerInfo.scores >= 30) {
          return -1;
        } else {
          return 1;
        }
      })
      .sort((a: UserProps, b: UserProps) => {
        if (a.volunteerInfo.approved === false) {
          return -1;
        } else {
          return 1;
        }
      })
      .filter((user: UserProps) =>
        user.userName.toLowerCase().includes(searchName.toLowerCase())
      );
  }, [volunteersData, searchName]);
  const countersOnTabsVolunteers = useMemo(() => {
    return Object.keys(
      volunteersData.filter(
        (user: UserProps) =>
          (user.volunteerInfo.checked === true &&
            user.volunteerInfo.scores >= 60) ||
          (user.volunteerInfo.checked === false &&
            user.volunteerInfo.scores >= 30) ||
          user.volunteerInfo.approved === false
      )
    ).length;
  }, [volunteersData]);

  const tabAdminsData = useMemo(() => {
    if (role !== 'master') {
      return [];
    }
    return adminsData
      .sort((a: UserProps, b: UserProps) => {
        if (a.volunteerInfo.approved === false) {
          return 1;
        } else {
          return -1;
        }
      })
      .filter((user: UserProps) =>
        user.userName.toLowerCase().includes(searchName.toLowerCase())
      );
  }, [adminsData, searchName]);

  const tabNotProcessedData = useMemo(() => {
    return [
      ...tabVolunteersData.slice(0, countersOnTabsVolunteers),
      ...tabRecipientsData.slice(0, countersOnTabsRecipients),
    ];
  }, [
    tabVolunteersData,
    countersOnTabsVolunteers,
    tabRecipientsData,
    countersOnTabsRecipients,
  ]);

  const tabContent = useMemo(() => {
    switch (incomeTab) {
      case 'volunteers':
        return <RequestsTab data={tabVolunteersData} />;
      case 'recipients':
        return <RequestsTab data={tabRecipientsData} />;
      case 'notprocessed':
        return <RequestsTab data={tabNotProcessedData} />;
      case 'admins':
        return <RequestsTab data={tabAdminsData} />;
      default:
        return <Loader />;
    }
  }, [incomeTab, searchName]);

  return (
    <>
      {incomeTab === 'notprocessed' ? (
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
      {/*{isLoading ? <Loader /> : tabContent}*/}
      {tabContent}
    </>
  );
}
