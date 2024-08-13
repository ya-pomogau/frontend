import { PageSubMenuForAdmins } from 'widgets/page-sub-menu';
import classNames from 'classnames';
import { Icon } from 'shared/ui/icons';
import { SmartHeader } from 'shared/ui/smart-header';
import styles from './styles.module.css';
import { Input } from 'shared/ui/input';
import { NavLink } from 'react-router-dom';

import { useEffect, useState } from 'react';
import { Filter } from '../../features/filter';
import { RequestsTab } from '../requests-tab';
import { AdminPermission, Tabs } from '../../shared/types/common.types';
import {
  useGetUserByRolesQuery,
  useGetAllAdminsQuery,
  useGetUnconfirmedUsersQuery,
} from 'services/admin-api';
import { User } from 'entities/user/types';
import { GradientDivider } from 'shared/ui/gradient-divider';
import { useAppSelector } from 'app/hooks';

interface PageProps {
  incomeTab: string;
}

export function RequestsPage({ incomeTab }: PageProps) {
  const user = useAppSelector((store) => store.user.data);
  const isConfirmationPermissionGranted =
    user?.permissions?.some((item) => item === AdminPermission.CONFIRMATION) ??
    false;

  const { data: volunteers } = useGetUserByRolesQuery('volunteers', {
    skip: !isConfirmationPermissionGranted,
  });
  const { data: admins } = useGetAllAdminsQuery('', {
    skip: !isConfirmationPermissionGranted,
  });
  const { data: recipients } = useGetUserByRolesQuery('recipients', {
    skip: !isConfirmationPermissionGranted,
  });
  const { data: unconfirmed } = useGetUnconfirmedUsersQuery('unconfirmed', {
    skip: !isConfirmationPermissionGranted,
  });
  const [searchName, setSearchName] = useState('');
  const [filteredName, setFilteredName] = useState<User[]>([]);
  const [viewMode, setViewMode] = useState<'tiles' | 'list'>('tiles');

  useEffect(() => {
    const dataMap: Record<string, User[] | undefined> = {
      [Tabs.VOLUNTEERS]: volunteers,
      [Tabs.RECIPIENTS]: recipients,
      [Tabs.NOTPROCESSED]: unconfirmed,
      [Tabs.ADMINS]: admins,
    };

    const filteredData = dataMap[incomeTab as keyof typeof dataMap]?.filter(
      (card) => card.name.toLowerCase().includes(searchName.toLowerCase())
    );

    if (filteredData) {
      setFilteredName(filteredData);
    }
  }, [searchName, incomeTab, volunteers, recipients, unconfirmed, admins]);

  return (
    <>
      <SmartHeader
        icon={
          incomeTab === Tabs.ADMINS ? (
            <Icon
              color="blue"
              icon="CheckInBoxIcon"
              size="54"
              className={styles.iconCheckInBox}
            />
          ) : (
            <Icon color="blue" icon="BlockIcon" size="54" />
          )
        }
        text={
          incomeTab === Tabs.ADMINS
            ? 'Управление администраторами'
            : 'Подтверждение / Блокировка'
        }
        filter={
          incomeTab === Tabs.NOTPROCESSED ? (
            <Filter items={{ userCategories: true }} />
          ) : (
            <></>
          )
        }
      />
      <PageSubMenuForAdmins
        counters={{
          volunteers: volunteers ? volunteers?.length : 0,
          recipients: recipients ? recipients?.length : 0,
          notprocessed: unconfirmed ? unconfirmed?.length : 0,
          admins: admins ? admins?.length : 0,
        }}
        onViewChange={setViewMode}
      />
      {incomeTab === Tabs.ADMINS && (
        <NavLink to={'/profile/create-new-admin'} className={styles.navLink}>
          <GradientDivider />
          <div className={styles.addNewAdminSectionInner}>
            <Icon color="blue" icon="PlusFilledIcon" />
            <h2
              className={classNames(
                'text',
                'text_size_large',
                'text_type_regular',
                'm-0',
                styles.title
              )}
            >
              Создать администратора
            </h2>
          </div>
          <GradientDivider />
        </NavLink>
      )}
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
          height={incomeTab === Tabs.ADMINS ? '40vh' : '55vh'}
          data={filteredName}
          viewMode={viewMode}
        />
      )}
    </>
  );
}
