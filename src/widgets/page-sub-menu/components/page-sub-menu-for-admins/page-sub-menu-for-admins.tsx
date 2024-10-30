import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { useAppSelector } from 'app/hooks';
import { isRootSelector } from 'entities/user/model';
import { PageSubMenu } from '../page-sub-menu/page-sub-menu';
import { PageSubMenuLink } from '../page-sub-menu-link/page-sub-menu-link';
import { userRole } from 'shared/types/common.types';
import styles from './styles.module.css';

import { ViewModeButton } from 'shared/ui/view-mode-button';

interface PageSubMenuForAdminsProps {
  counters: {
    [key in 'volunteers' | 'recipients' | 'notprocessed' | 'admins']: number;
  };
  onViewChange: (view: 'tiles' | 'list') => void;
}

export const PageSubMenuForAdmins = ({
  counters,
  onViewChange,
}: PageSubMenuForAdminsProps) => {
  const { role } = useAppSelector((state) => state.user);
  const isRoot = useAppSelector(isRootSelector);
  const location = useLocation();

  const [selectedView, setSelectedView] = useState<'tiles' | 'list'>('tiles');

  const handleViewChange = (view: 'tiles' | 'list') => {
    setSelectedView(view);
    onViewChange(view);
  };

  return (
    <div className={styles.adminMenuContainer}>
      <PageSubMenu
        links={
          <>
            <PageSubMenuLink
              to="/profile/requests/volunteers"
              text="Волонтеры"
              notifications={counters.volunteers}
            />
            <PageSubMenuLink
              to="/profile/requests/recipients"
              text="Реципиенты"
              notifications={counters.recipients}
            />
            <PageSubMenuLink
              to="/profile/requests/notprocessed"
              text="Не обработанные"
              notifications={counters.notprocessed}
            />
            {role === userRole.ADMIN && isRoot ? (
              <PageSubMenuLink
                to="/profile/requests/admins"
                text="Администраторы"
                notifications={counters.admins}
              />
            ) : (
              ''
            )}
          </>
        }
      />
      {location.pathname !== '/profile/requests/admins' ? (
        <div className={styles.viewModeButtons}>
          <ViewModeButton
            modeIcon="tiles"
            selected={selectedView === 'tiles'}
            onClick={() => handleViewChange('tiles')}
          />
          <ViewModeButton
            modeIcon="list"
            selected={selectedView === 'list'}
            onClick={() => handleViewChange('list')}
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
