import { SyntheticEvent } from 'react';

import { MenuIcon } from 'shared/ui/icons/menu-icon';
import { UnionIcon } from 'shared/ui/icons/union-icon';

import styles from './styles.module.css';

interface IMenuButtonProps {
  onClick: (evt: SyntheticEvent) => void;
  isMobile: boolean;
}

const MenuButton = ({ onClick, isMobile }: IMenuButtonProps) => {
  return (
    <button onClick={onClick} className={styles.header__button}>
      {isMobile && <MenuIcon color="blue" />}

      {!isMobile && (
        <div className={styles.header__button__container}>
          <span className={styles.header__button__text}>Меню</span>
          <UnionIcon color="blue" />
        </div>
      )}
    </button>
  );
};

export default MenuButton;
