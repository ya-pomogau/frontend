import classnames from 'classnames';
import { NavLink } from 'react-router-dom';

import { Typography } from 'shared/ui';

import styles from './page-sub-menu-link.module.css';

interface PageSubMenuLinkProps {
  to: string;
  text: string;
  notifications?: number;
  styleSpan?: string;
}

export const PageSubMenuLink = ({
  to,
  text,
  notifications = 0,
  styleSpan,
}: PageSubMenuLinkProps) => {
  const areNotificationsVisible = notifications > 0;

  return (
    <NavLink to={to} className="link">
      {({ isActive }) => (
        <div
          className={classnames(styles.tabContainer__item, {
            [styles.tabContainer__itemActive]: isActive,
          })}
        >
          <Typography
            color={isActive ? 'black' : 'interface-additional'}
            variant={'paragraphResize'}
            content={text}
            extraClass={styles.tabContainer__text}
          />
          {areNotificationsVisible && (
            <Typography
              tag={'span'}
              color={'white'}
              variant={'support'}
              content={notifications}
              extraClass={classnames(styles.tabContainer__number, styleSpan)}
            />
          )}
        </div>
      )}
    </NavLink>
  );
};
