import classnames from 'classnames';
import { NavLink } from 'react-router-dom';

import styles from './page-sub-menu-link.module.css';

interface PageSubMenuLinkProps {
  to: string;
  text: string;
  notifications?: number;
}

export const PageSubMenuLink = ({
  to,
  text,
  notifications = 0,
}: PageSubMenuLinkProps) => {
  const areNotificationsVisible = notifications > 0;

  return (
    <NavLink to={to} className="link">
      {({ isActive }) => (
        <div
          className={classnames(
            styles.tabContainer__item,
            isActive ? styles.tabContainer__itemActive : ''
          )}
        >
          <p
            className={classnames(
              'text',
              'p-0',
              'm-0',
              styles.tabContainer__text,
              isActive ? styles.tabContainer__textActive : ''
            )}
          >
            {text}
          </p>
          {areNotificationsVisible && (
            <span className={styles.tabContainer__number}>{notifications}</span>
          )}
        </div>
      )}
    </NavLink>
  );
};
