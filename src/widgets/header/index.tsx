import { SyntheticEvent, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import cn from 'classnames';

import { useControlModal, useMediaQuery, useUser } from 'shared/hooks';
import { Logo, Avatar, Button } from 'shared/ui';
import { Routes, Breakpoints } from 'shared/config';
import { handleRedirectVK } from 'shared/libs/utils';
import { PopupChat } from 'entities/chat/ui/chat';
import { infoAdmin } from 'entities/chat/ui/chat/libs/utils';
import { SideBar } from './navigation';
import { DropDownMenu } from './DropDownMenu';
import { linksTop, linksTopAuthAdmin, positionConfigTop } from './utils';
import { MenuButton } from './components';
import { UserRole } from '../../shared/types/common.types';

import defaultAvatar from 'shared/ui/info-container/img/placeholder.svg';
import styles from './styles.module.css';

const Header = () => {
  const [menuActive, setMenuActive] = useState<boolean>(false);
  const { isOpen, handleOpen, handleClose } = useControlModal();
  const location = useLocation();

  const isMobile = useMediaQuery(Breakpoints.L);
  const user = useUser();
  const isAdmin = user?.role === UserRole.ADMIN;

  const handleClick = (evt: SyntheticEvent) => {
    evt.stopPropagation();
    setMenuActive(!menuActive);
  };

  const isMenuHidden = !user && !isMobile;
  const headerStyles = cn(styles.header, { [styles.header_mobile]: isMobile });
  const headerLogoStyles = cn(styles.header__logo, {
    [styles.header__logo_mobile]: isMobile,
  });
  const headerMenuStyles = cn(styles.header__menu__container, {
    [styles.header__menu__container_hidden]: isMenuHidden,
  });

  return (
    <header className={headerStyles}>
      <div className={styles.header__container}>
        {isMobile && user && location.pathname !== Routes.PROFILE && (
          <Link to="/profile">
            <Avatar
              extClassName={styles.header__avatar}
              avatarName={user.name}
              avatarLink={user.avatar || defaultAvatar}
            />
          </Link>
        )}
        {isMobile && !user && (
          <Button
            buttonType="primary"
            actionType="submit"
            label="Войти"
            size="small"
            onClick={() => handleRedirectVK()}
          />
        )}

        <NavLink className={headerLogoStyles} to={Routes.ROOT}>
          <Logo />
        </NavLink>

        {isAdmin
          ? !isMobile && (
              <SideBar position={positionConfigTop} links={linksTopAuthAdmin} />
            )
          : !isMobile && (
              <SideBar position={positionConfigTop} links={linksTop} />
            )}

        <div className={headerMenuStyles}>
          {Boolean(user) && (
            <MenuButton onClick={handleClick} isMobile={isMobile} />
          )}

          {menuActive && (
            <DropDownMenu
              role={user?.role}
              setMenuActive={setMenuActive}
              menuActive={menuActive}
              setIsOpenChat={handleOpen}
            />
          )}
        </div>
      </div>

      {isOpen && (
        <PopupChat
          isOpen={isOpen}
          onClick={isOpen ? handleClose : handleOpen}
          messages={[]}
          chatmateInfo={infoAdmin}
          onAttachFileClick={() => {}}
        />
      )}

      {isMobile && <div className={styles['header__gradient-divider']}></div>}
    </header>
  );
};

export default Header;
