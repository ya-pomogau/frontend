import { FC, ReactElement } from 'react';

import { useAppSelector } from 'app/hooks';
import {
  SideMenuContainer,
  SideMenuContainerProps,
} from 'entities/side-menu-container';

interface SideMenuProps extends SideMenuContainerProps {
  authRequired?: boolean;
  links: ReactElement;
}

export const SideMenu: FC<SideMenuProps> = ({
  authRequired = true,
  links,
  ...containerProps
}) => {
  const { role } = useAppSelector((state) => state.user);

  const isOverlayVisible = authRequired && !role;

  return (
    <SideMenuContainer overlayVisible={isOverlayVisible} {...containerProps}>
      {links}
    </SideMenuContainer>
  );
};
