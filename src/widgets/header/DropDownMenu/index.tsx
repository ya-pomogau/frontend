/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { ReactComponentElement, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { SideBar } from 'widgets/header/navigation';

import { useMediaQuery } from 'shared/hooks';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { positionConfigMenu, linksMenuMobileUnauthorized } from '../utils';

import styles from './styles.module.css';
import { DropDownMenuButton } from 'shared/ui/DropDownMenuButton';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from 'entities/user/model';

export const modalRoot = document.getElementById('modal') as HTMLElement;

const line = {
  background: '#E0E0E0',
  height: '1px',
  width: '100%',
};
interface MenuProps {
  setMenuActive: (arg: boolean) => void;
  menuActive: boolean;
}

export const DropDownMenu = ({ setMenuActive, menuActive }: MenuProps) => {
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
        <div className={styles.wrapper}>
          <DropDownMenuButton
            isMobile={isMobile}
            onClick={() => console.log('Нажали кнопку')}
            buttonType="adminMessage"
          >
            Написать администратору
          </DropDownMenuButton>
          {isMobile ? (
            <SideBar
              position={positionConfigMenu}
              links={linksMenuMobileUnauthorized}
            />
          ) : (
            <div style={line}></div>
          )}
          <DropDownMenuButton isMobile={isMobile} onClick={handlerOnClick}>
            Выход
          </DropDownMenuButton>
        </div>
      ) : null}
    </div>,
    modalRoot
  );
};
