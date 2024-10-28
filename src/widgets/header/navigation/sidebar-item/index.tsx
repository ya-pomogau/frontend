import { NavLink, NavLinkRenderProps } from 'react-router-dom';

import type { ISideBarElementProps } from './../types';

import styles from './styles.module.css';
import { Typography } from 'shared/ui/typography';

export const SideBarItem = ({
  title,
  to,
  icon,
  position,
}: ISideBarElementProps) => {
  const navLinkStyles = ({ isActive }: NavLinkRenderProps) =>
    isActive ? `${styles.link} ${styles.link_active}` : `${styles.link}`;

  const navLinkConfig = {
    flexDirection: position?.flexDirection,
    justifyContent: position?.justifyContent,
    gap: position?.gap,
    textAlign: position?.textAlign,
  };

  return (
    <NavLink to={to} className={navLinkStyles} style={navLinkConfig}>
      <div className={styles.link__icon}>{icon}</div>
      <Typography
        tag={'p'}
        color={'black'}
        fontFamily={'primaryFont'}
        variant={'paragraph'}
        content={title}
        extraClass={styles.link__title}
      />
    </NavLink>
  );
};
