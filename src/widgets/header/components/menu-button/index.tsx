import { SyntheticEvent } from 'react';
import { Icon, Typography } from 'shared/ui';

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
          <Typography
            tag={'span'}
            color={'primary'}
            variant={'support'}
            content={'Меню'}
          />
          <Icon icon="UnionIcon" color="blue" />
        </div>
      )}
    </button>
  );
};

export default MenuButton;
