import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';

import { UserRole } from '../../../shared/types/common.types';
import { useAppDispatch } from '../../../app/hooks';
import { useMediaQuery, useUser } from '../../../shared/hooks';
import { Routes } from '../../../shared/config';
import { logoutUser } from '../../../entities';
import { closeSocketConnection } from '../../../services/system-slice';

import { SideBar } from '../navigation';
import { DropDownMenuButton } from '../../../shared/ui';
import { positionConfigMenu, linksTopAuthAdmin, linksTop } from '../utils';
import { Breakpoints } from 'shared/config';

import styles from './styles.module.css';

export const modalRoot = document.getElementById('modal') as HTMLElement;

interface MenuProps {
  setMenuActive: (arg: boolean) => void;
  menuActive: boolean;
  role?: UserRole;
  setIsOpenChat: (arg: boolean) => void;
}

export const DropDownMenu = ({
  setMenuActive,
  role,
  setIsOpenChat,
}: MenuProps) => {
  const isMobile = useMediaQuery(Breakpoints.L);
  const ref = useRef(null);

  const isAuth = useUser();
  const isAdmin = role === UserRole.ADMIN;

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
    dispatch(logoutUser());
    dispatch(closeSocketConnection());
    return navigate(Routes.ROOT);
  };

  const lineStyles = cn(styles.line, { [styles.line_admin]: isAdmin });
  const sidebarContainerStyles = cn(styles.header__sidebar__container, {
    [styles.header__sidebar__container_mobile]: isMobile,
  });

  return createPortal(
    <div className={sidebarContainerStyles} ref={ref}>
      {isAuth && (
        <div className={styles.wrapper}>
          {!isAdmin && (
            <DropDownMenuButton
              isMobile={isMobile}
              onClick={() => setIsOpenChat(true)}
              buttonType="adminMessage"
            >
              Написать администратору
            </DropDownMenuButton>
          )}
          {isMobile ? (
            <SideBar
              position={positionConfigMenu}
              links={isAdmin ? linksTopAuthAdmin : linksTop}
            />
          ) : (
            <div className={lineStyles}></div>
          )}
          <DropDownMenuButton isMobile={isMobile} onClick={handlerOnClick}>
            Выход
          </DropDownMenuButton>
        </div>
      )}
    </div>,
    modalRoot
  );
};
