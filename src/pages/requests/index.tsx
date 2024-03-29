import { PageSubMenuForAdmins } from 'widgets/page-sub-menu';

import { Icon } from 'shared/ui/icons';
import { SmartHeader } from 'shared/ui/smart-header';
import { Loader } from 'shared/ui/loader';
import styles from './styles.module.css';
import { Input } from 'shared/ui/input';

import { useState } from 'react';
import { Filter } from '../../features/filter';
import { RequestsTab } from '../requests-tab';
import { Tabs } from '../../shared/types/common.types';
import {
  useGetUserByRolesQuery,
  useGetAllAdminsQuery,
  useGetUnconfirmedUsersQuery,
} from 'services/admin-api';

interface PageProps {
  incomeTab: string;
}

export function RequestsPage({ incomeTab }: PageProps) {
  const { data: volunteers } = useGetUserByRolesQuery('volunteers');
  const { data: admins } = useGetAllAdminsQuery('');
  const { data: recipients } = useGetUserByRolesQuery('recipients');
  const { data: unconfirmed } = useGetUnconfirmedUsersQuery('unconfirmed');
  const [searchName, setSearchName] = useState('');

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
          volunteers: volunteers ? volunteers?.length : 0,
          recipients: recipients ? recipients?.length : 0,
          notprocessed: unconfirmed ? unconfirmed?.length : 0,
          admins: admins ? admins?.length : 0,
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
      {/* TODO:Настроить лоадер в зависимости от получения данных : или получить все вкладки и показывать, или только открытую, остальные в фоне. */}
      {/*{isLoading ? <Loader /> : tabContent}*/}
      {volunteers && recipients && unconfirmed && admins && (
        <RequestsTab
          data={
            incomeTab === Tabs.VOLUNTEERS
              ? volunteers
              : incomeTab === Tabs.RECIPIENTS
              ? recipients
              : incomeTab === Tabs.NOTPROCESSED
              ? unconfirmed
              : admins
          }
        />
      )}
    </>
  );
}
