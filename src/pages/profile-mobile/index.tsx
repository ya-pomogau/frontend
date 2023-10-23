import styles from './styles.module.css';
import { UserInfo } from 'entities/user';
import { SideMenuForAuthorized } from 'widgets/side-menu';

export function ProfileMobile() {
  return (
    <div className={styles.main}>
      <div className={styles.user}>
        <UserInfo />
      </div>
      <SideMenuForAuthorized border="mobile" size="mob" sizeIcon="88" />
    </div>
  );
}
