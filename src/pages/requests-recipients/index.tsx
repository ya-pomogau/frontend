import { useState, MouseEvent, useRef, useEffect } from 'react';

import { useGetUsersQuery } from 'services/user-api';

import { PageSubMenuForAdmins } from 'widgets/page-sub-menu';
import { Filter } from 'features/filter/ui';
import { Icon } from 'shared/ui/icons';
import { SmartHeader } from 'shared/ui/smart-header';
import { Loader } from 'shared/ui/loader';
import { UserCard } from 'widgets/user-card';

export function RequestsRecipientsPage() {
  const [isFilterVisibel, setIsFilterVisibel] = useState(false);

  const buttonFilterRef = useRef<Element>();

  // данные о позиции кнопки вызова фильтра, на основе которых определяется позиция фильтра
  const [buttonPosition, setButtonPosition] = useState({ top: 0, right: 0 });

  // открытие фильтра и определение данных о позиции кнопки, вызвавшей фильтр
  const getButtonPosition = () => {
    const buttonRect = buttonFilterRef.current?.getBoundingClientRect();
    if (buttonRect) {
      setButtonPosition({ top: buttonRect.bottom, right: buttonRect.right });
    }
  };

  const openFilter = (e: MouseEvent) => {
    e.stopPropagation();
    buttonFilterRef.current = e.currentTarget;
    getButtonPosition();
    setIsFilterVisibel(!isFilterVisibel);
  };

  const { isLoading, data = [] } = useGetUsersQuery('recipient', {
    pollingInterval: 30000,
  });

  useEffect(() => {
    window.addEventListener('resize', getButtonPosition);
    return () => {
      window.removeEventListener('resize', getButtonPosition);
    };
  }, []);

  return (
    <>
      <SmartHeader
        filterIcon={<Icon color="blue" icon="FilterIcon" size="54" />}
        filterText="Фильтр"
        onClick={openFilter}
        settingIcon={<Icon color="blue" icon="BlockIcon" size="54" />}
        settingText="Подтверждение / Блокировка"
      />

      {isFilterVisibel && (
        <Filter
          userRole="admin"
          changeVisible={() => setIsFilterVisibel(false)}
          position={buttonPosition}
        />
      )}
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
