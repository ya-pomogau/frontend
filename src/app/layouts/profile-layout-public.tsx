import { Navigate, Outlet } from 'react-router-dom';

import { OnlyUnAuth } from 'app/routing';
import { useAppSelector } from 'app/hooks';
import { UserInfo } from 'entities/user';
import { SideMenuForAuthorized } from 'widgets/side-menu';
import { Routes } from 'shared/config';

import styles from './profile-layout.module.css';

export const ProfileLayoutPublic = () => {
  const { role } = useAppSelector((state) => state.user);

  const navigateTo =
    `${Routes[`PROFILE_${role?.toUpperCase()}`]?.ROOT}` ?? Routes.ROOT;

  return role ? (
    <Navigate to={navigateTo} />
  ) : (
    <OnlyUnAuth>
      <div className={styles.profileLayout}>
        <div className={styles.sideMenu}>
          <UserInfo />
          <SideMenuForAuthorized />
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </OnlyUnAuth>
  );
};
