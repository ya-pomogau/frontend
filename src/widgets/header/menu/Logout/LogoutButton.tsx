import React, { useEffect } from 'react';
import styles from './styles.module.css';
import { Icon } from 'shared/ui/icons';
import { logoutUser } from 'entities/user/model';
import { useAppDispatch } from 'app/hooks';

export const LogoutButton = () => {
  const dispatch = useAppDispatch();

  const handlerOnClick = () => {
    console.log('exit');
    dispatch(logoutUser());
  };

  return (
    <button className={styles.button} type="button" onClick={handlerOnClick}>
      <p className={styles.title}>Выход</p>
      <Icon color="blue" icon="ExitIcon" size="24" />
    </button>
  );
};
