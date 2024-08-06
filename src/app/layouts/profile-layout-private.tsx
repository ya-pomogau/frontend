import { Outlet } from 'react-router-dom';

import { OnlyAuth } from 'app/routing';
import { UserInfo } from 'entities/user';
import { SideMenuForAuthorized } from 'widgets/side-menu';

import styles from './profile-layout.module.css';

export const ProfileLayoutPrivate = () => {
  return (
    <OnlyAuth>
      <div className={styles.profileLayout}>
        <div className={styles.sideMenu}>
          <UserInfo />
          <SideMenuForAuthorized />
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </OnlyAuth>
  );
};
