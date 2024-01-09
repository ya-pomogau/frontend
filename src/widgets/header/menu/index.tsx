/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { SideBar } from 'widgets/header/navigation';

import { useMediaQuery } from 'shared/hooks';
import { useAppSelector } from 'app/hooks';
import {
  positionConfigMenu,
  linksMenuMobile,
  linksMenu,
  linksMenuMobileUnauthorized,
  linksTopAuthAdmin,
} from '../utils';

import styles from './styles.module.css';
import { AdminButton } from 'shared/ui/admin-button';

const modalRoot = document.getElementById('modal') as HTMLElement;

interface MenuProps {
  setMenuActive: (arg: boolean) => void;
  menuActive: boolean;
  onClick: () => void;
}

export const Menu = ({ setMenuActive, menuActive, onClick }: MenuProps) => {
  const isMobile = useMediaQuery('(max-width: 900px)');
  const ref = useRef(null);

  const user = useAppSelector((state) => state.user.data);
  console.log(user?.role);

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

  return createPortal(
    <div
      className={
        isMobile
          ? styles.header__sidebar__container_mobile
          : styles.header__sidebar__container
      }
      ref={ref}
    >
      {user && (
        <AdminButton
          isMobile={isMobile}
          extraClass={styles.header__sidebar__admin_button}
          onClick={() => {
            onClick();
            console.log('Нажали кнопку');
          }}
        >
          Написать администратору
        </AdminButton>
      )}

      {user ? (
        user?.role === 'master' || user?.role === 'admin' ? (
          <SideBar
            position={positionConfigMenu}
            links={isMobile ? linksTopAuthAdmin : linksMenu}
          />
        ) : (
          <SideBar
            position={positionConfigMenu}
            links={isMobile ? linksMenuMobileUnauthorized : linksMenu}
          />
        )
      ) : (
        <SideBar
          position={positionConfigMenu}
          links={isMobile ? linksMenuMobile : linksMenu}
        />
      )}
    </div>,
    modalRoot
  );
};
