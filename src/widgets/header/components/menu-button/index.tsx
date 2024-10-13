import { SyntheticEvent } from 'react';
import { Icon } from 'shared/ui';

import styles from './styles.module.css';

interface IMenuButtonProps {
  onClick: (evt: SyntheticEvent) => void;
  isMobile: boolean;
}

const MenuButton = ({ onClick, isMobile }: IMenuButtonProps) => {
  return (
    <button onClick={onClick} className={styles.header__button}>
      {isMobile && <Icon icon="MenuIcon" color="blue" />}

      {!isMobile && (
        <div className={styles.header__button__container}>
          <span className={styles.header__button__text}>Меню</span>
          <Icon icon="UnionIcon" color="blue" />
        </div>
      )}
    </button>
  );
};

export default MenuButton;
