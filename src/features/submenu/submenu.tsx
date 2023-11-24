import {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
  ReactElement,
} from 'react';
import { SubmenuButton } from './components/submenu-button';
import { useMediaQuery } from 'shared/hooks';
import { SideMenuForAuthorized } from 'widgets/side-menu';

import styles from './submenu.module.css';
import { SubmenuMenu } from './components/submenu-menu';
import { useAppSelector } from 'app/hooks';

export interface ISubmenuProps {
  text: string;
  icon: ReactElement;
}

export const Submenu = ({ text, icon }: ISubmenuProps) => {
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const [isMenuVisible, setMenuVisible] = useState(false);
  const { role } = useAppSelector((state) => state.user);

  const mobile = useMediaQuery('(max-width: 920px)');
  const menuButtonRef = useRef<HTMLDivElement>(null);

  const calculateMenuPosition = useCallback(() => {
    const buttonRect = menuButtonRef.current?.getBoundingClientRect();
    if (buttonRect) {
      setMenuPosition({ top: buttonRect.bottom, left: buttonRect.left });
    }
  }, []);

  useEffect(() => {
    window.addEventListener('resize', calculateMenuPosition);
    return () => {
      window.removeEventListener('resize', calculateMenuPosition);
    };
  }, [calculateMenuPosition]);

  const toggleMenu = () => {
    if (!isMenuVisible) {
      calculateMenuPosition();
    }
    if (mobile) setMenuVisible((prev) => !prev);
  };

  const menuPositionStyles = useMemo(() => {
    return {
      top: `${menuPosition.top}px`,
      left: `${menuPosition.left - 20}px`,
    };
  }, [menuPosition.top, menuPosition.left]);

  return (
    <div className={styles.block}>
      <SubmenuButton
        text={text}
        icon={icon}
        onClick={toggleMenu}
        ref={menuButtonRef}
      />
      {role && isMenuVisible && mobile && (
        <SubmenuMenu
          toggleMenu={toggleMenu}
          menuPositionStyles={menuPositionStyles}
        >
          <SideMenuForAuthorized border="mobile" size="mob" />
        </SubmenuMenu>
      )}
    </div>
  );
};
