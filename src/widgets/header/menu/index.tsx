/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { NavLink } from 'react-router-dom';

import { SideBar } from 'widgets/header/navigation';
import { EmptyMessageIcon } from 'shared/ui/icons/empty-message-icon';

import { useMediaQuery } from 'shared/hooks';
import { useAppSelector } from 'app/hooks';
import {
  positionConfigMenu,
  linksMenuMobile,
  linksMenu,
  linksMenuMobileUnauthorized,
} from '../utils';

import styles from './styles.module.css';

const modalRoot = document.getElementById('modal') as HTMLElement;

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

  return createPortal(
    // <div className={styles.overlay} onClick={closeByOverlay}>
    <div
      className={
        isMobile
          ? styles.header__sidebar__container_mobile
          : styles.header__sidebar__container
      }
      ref={ref}
    >
      {user && (
        <NavLink to="/" className={`${styles.header__title__container} `}>
          <h2 className={styles.menu__title}>Написать администратору</h2>
          <div className={styles.menu__title__icon}>
            <EmptyMessageIcon size="32" color="white" />
          </div>
          {isMobile && (
            <svg
              className={`${styles.header__title__background}`}
              width="235"
              height="46"
              viewBox="0 0 235 46"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 17L235 0V46L0 39V17Z" fill="#9798C9" />
            </svg>
          )}
        </NavLink>
      )}

      {user ? (
        <SideBar
          position={positionConfigMenu}
          links={isMobile ? linksMenuMobile : linksMenu}
        />
      ) : (
        <SideBar
          position={positionConfigMenu}
          links={isMobile ? linksMenuMobileUnauthorized : linksMenu}
        />
      )}
    </div>,
    modalRoot
  );
};
