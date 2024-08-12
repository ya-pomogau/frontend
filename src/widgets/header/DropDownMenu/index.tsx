/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';

import { UserRole } from '../../../shared/types/common.types';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useMediaQuery } from '../../../shared/hooks';
import { handleRedirectVK } from '../../../shared/libs/utils';
import { logoutUser } from '../../../entities/user/model';
import { closeSocketConnection } from '../../../services/system-slice';

import { SideBar } from '../../../widgets/header/navigation';
import { DropDownMenuButton } from '../../../shared/ui/DropDownMenuButton';
import { VkIcon } from '../../../shared/ui/icons/vk-icon';
import { Button } from '../../../shared/ui/button';
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
  const isMobile = useMediaQuery(Breakpoints.IS_MOBILE_MENU);
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
    dispatch(logoutUser());
    dispatch(closeSocketConnection());
    return navigate('/');
  };

  const line = {
    background: '#E0E0E0',
    height: '1px',
    width: '90%',
    marginLeft: '20px',
    marginTop: role === 'Admin' ? '20px' : '0',
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
        <div className={styles.wrapper}>
          {/* eslint-disable-next-line eqeqeq */}
          {role != 'Admin' && (
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
              links={role === UserRole.ADMIN ? linksTopAuthAdmin : linksTop}
            />
          ) : (
            <div style={line}></div>
          )}
          <DropDownMenuButton isMobile={isMobile} onClick={handlerOnClick}>
            Выход
          </DropDownMenuButton>
        </div>
      ) : (
        // TODO: временная мера на время тестирования клиентом.
        <Button
          buttonType="primary"
          actionType="submit"
          customIcon={<VkIcon color="white" size="24" />}
          label="Войти через ВКонтакте"
          size="medium"
          onClick={() => handleRedirectVK()}
        />
      )}
    </div>,
    modalRoot
  );
};
