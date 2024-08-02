import { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';

import { CardButton } from 'shared/ui/card-button';

import styles from './side-menu-link.module.css';

interface SideMenuLinkProps {
  to: string;
  icon: ReactElement;
  text: string;
}

export const SideMenuLink = ({ to, icon, text }: SideMenuLinkProps) => {
  return (
    <NavLink to={to} className={styles.link}>
      {({ isActive }) => (
        <CardButton customIcon={icon} text={text} isActive={isActive} />
      )}
    </NavLink>
  );
};
