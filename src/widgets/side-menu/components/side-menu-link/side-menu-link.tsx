import { FC, ReactElement } from 'react';
import { NavLink } from 'react-router-dom';

import { CardButton } from 'shared/ui/card-button';

interface SideMenuLinkProps {
  to: string;
  icon: ReactElement;
  text: string;
}

export const SideMenuLink: FC<SideMenuLinkProps> = ({ to, icon, text }) => {
  return (
    <NavLink to={to} className="link">
      {({ isActive }) => (
        <CardButton customIcon={icon} text={text} isActive={isActive} />
      )}
    </NavLink>
  );
};
