import classnames from 'classnames';
import { NavLink } from 'react-router-dom';

import styles from './page-sub-menu-link.module.css';
import { Typography } from 'shared/ui/typography';

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
          className={classnames(
            styles.tabContainer__item,
            isActive ? styles.tabContainer__itemActive : ''
          )}
        >
          <Typography
            tag={'p'}
            color={'interface-additional'}
            fontFamily={'primaryFont'}
            variant={'paragraphResize'}
            content={text}
            extraClass={classnames(
              isActive ? styles.tabContainer__textActive : false,
              styles.tabContainer__text
            )}
          />
          {areNotificationsVisible && (
            <Typography
              tag={'span'}
              color={'white'}
              variant={'support'}
              fontFamily={'primaryFont'}
              content={notifications}
              extraClass={classnames(styles.tabContainer__number, styleSpan)}
            />
          )}
        </div>
      )}
    </NavLink>
  );
};
