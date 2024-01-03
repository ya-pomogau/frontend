/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { SideBar } from 'widgets/header/navigation';

import { useMediaQuery } from 'shared/hooks';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { positionConfigMenu, linksMenuMobileUnauthorized } from '../utils';

import styles from './styles.module.css';
import { AdminButton } from 'shared/ui/admin-button';
import { LogoutButton } from './Logout/LogoutButton';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from 'entities/user/model';

const modalRoot = document.getElementById('modal') as HTMLElement;

const line = {
  background: '#E0E0E0',
  height: '1px',
  width: '100%',
};
interface MenuProps {
  setMenuActive: (arg: boolean) => void;
  menuActive: boolean;
}

export const Menu = ({ setMenuActive, menuActive }: MenuProps) => {
  const isMobile = useMediaQuery('(max-width: 900px)');
  const ref = useRef(null);

  const user = useAppSelector((state) => state.user.data);

  const closeByOverlay = (evt: MouseEvent) => {
    if (evt.target !== ref.current) {
      setMenuActive(false);
    }
  };

  const closeByEsc = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setMenuActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', closeByEsc);
    document.addEventListener('click', closeByOverlay);

    return () => {
      document.removeEventListener('keydown', closeByEsc);
      document.removeEventListener('click', closeByOverlay);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handlerOnClick = () => {
    console.log('exit');
    dispatch(logoutUser());
    return navigate('/');
  };

  return createPortal(
    <div
      className={
        isMobile
          ? styles.header__sidebar__container_mobile
          : styles.header__sidebar__container
      }
      ref={ref}
    >
      {user ? (
        <>
          <AdminButton
            isMobile={isMobile}
            extraClass={styles.header__sidebar__admin_button}
            onClick={() => console.log('Нажали кнопку')}
            buttonType="adminMessage"
          >
            Написать администратору
          </AdminButton>
          {isMobile ? (
            <SideBar
              position={positionConfigMenu}
              links={linksMenuMobileUnauthorized}
            />
          ) : (
            <div style={line}></div>
          )}
          <AdminButton
            isMobile={isMobile}
            extraClass={styles.button}
            onClick={handlerOnClick}
          >
            Выход
          </AdminButton>
        </>
      ) : null}
    </div>,
    modalRoot
  );
};
