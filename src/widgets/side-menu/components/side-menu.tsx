import { ReactElement } from 'react';

import { useAppSelector } from 'app/hooks';
import {
  SideMenuContainer,
  SideMenuContainerProps,
} from 'entities/side-menu-container';

interface SideMenuProps
  extends Omit<SideMenuContainerProps, 'overlayVisible' | 'children'> {
  authRequired?: boolean;
  links: ReactElement;
}

export const SideMenu = ({
  authRequired = true,
  links,
  ...containerProps
}: SideMenuProps) => {
  const { role } = useAppSelector((state) => state.user);

  const isOverlayVisible = authRequired && !role;

  return (
    <SideMenuContainer overlayVisible={isOverlayVisible} {...containerProps}>
      {links}
    </SideMenuContainer>
  );
};
