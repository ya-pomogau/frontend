import { ReactElement } from 'react';
import { Tooltip } from 'shared/ui/tooltip';
import styles from './submenu-menu.module.css';

interface ISubmenuMenuProps {
  toggleMenu: () => void;
  menuPositionStyles: { top: string; left: string };
  children: ReactElement;
}

export const SubmenuMenu = ({
  toggleMenu,
  menuPositionStyles,
  ...props
}: ISubmenuMenuProps) => {
  return (
    <Tooltip
      pointerPosition="none"
      changeVisible={toggleMenu}
      elementStyles={menuPositionStyles}
      extClassName={styles.tooltip}
      visible
    >
      {props.children}
    </Tooltip>
  );
};
