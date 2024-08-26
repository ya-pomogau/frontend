import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { PageSubMenuForAdmins } from 'widgets';
import { Icon, SmartHeader, Input, GradientDivider } from 'shared/ui';
import { usePermission } from 'shared/hooks';
import { Filter } from '../../features/filter';
import { RequestsTab } from '../requests-tab';
import {
  AdminPermission,
  Tabs,
  UserRole,
} from '../../shared/types/common.types';
import {
  useGetUserByRolesQuery,
  useGetAllAdminsQuery,
  useGetUnconfirmedUsersQuery,
} from 'services/admin-api';
import { User } from 'entities/user/types';
import { IFilterValues } from 'features/filter/types';
import { FilterItemsIds } from 'features/filter/consts';

import styles from './styles.module.css';

interface PageProps {
  incomeTab: string;
}

export function RequestsPage({ incomeTab }: PageProps) {
  const isConfirmationPermissionGranted = usePermission(
    [AdminPermission.CONFIRMATION],
    UserRole.ADMIN
  );

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
  const [filterData, setFilterData] = useState<Partial<IFilterValues>>({
    userCategories: [],
  });

  const getFilteredTabData = () => {
    const dataMap: Record<string, User[] | undefined> = {
      [Tabs.VOLUNTEERS]: volunteers,
      [Tabs.RECIPIENTS]: recipients,
      [Tabs.NOTPROCESSED]: unconfirmed,
      [Tabs.ADMINS]: admins,
    };

    return dataMap[incomeTab as keyof typeof dataMap]?.filter((card) =>
      card.name.toLowerCase().includes(searchName.toLowerCase())
    );
  };

  const handleApplyFilters = (filter: IFilterValues) => {
    if (incomeTab === Tabs.NOTPROCESSED) {
      const { userCategories } = filter;

      const filteredData = getFilteredTabData()?.filter(
        (card) =>
          userCategories.includes(FilterItemsIds.ALL) ||
          userCategories.includes(card.role)
      );

      if (filteredData) {
        setFilteredName(filteredData);
      }
    }
  };

  useEffect(() => {
    const filteredData = getFilteredTabData();

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
            getFilteredTabData()?.length ? (
              <Filter
                items={filterData}
                setFilterData={setFilterData}
                setFilteres={handleApplyFilters}
              />
            ) : (
              <Filter notFoundFilter={true} />
            )
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
