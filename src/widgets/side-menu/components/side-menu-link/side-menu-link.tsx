import { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';

import { CardButton } from 'shared/ui/card-button';

interface SideMenuLinkProps {
  to: string;
  icon: ReactElement;
  text: string;
}

export const SideMenuLink = ({ to, icon, text }: SideMenuLinkProps) => {
  return (
    <NavLink to={to} className="link">
      {({ isActive }) => (
        <CardButton customIcon={icon} text={text} isActive={isActive} />
      )}
    </NavLink>
  );
};
