import { SyntheticEvent, useState } from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';

import { useAppSelector } from 'app/hooks';
import { useMediaQuery } from 'shared/hooks/media-query';
import { Logo, Avatar, Button } from 'shared/ui';
import { handleRedirectVK } from 'shared/libs/utils';
import { PopupChat } from 'entities/chat/ui/chat';
import { infoAdmin } from 'entities/chat/ui/chat/libs/utils';
import { UserRole } from 'shared/types/common.types';
import { SideBar } from './navigation';
import { DropDownMenu } from './DropDownMenu';
import { linksTop, linksTopAuthAdmin, positionConfigTop } from './utils';
import { Routes } from 'shared/config';
import defaultAvatar from 'shared/ui/info-container/img/placeholder.svg';
import { MenuButton } from './components';
import { Breakpoints } from 'shared/config';

import styles from './styles.module.css';

const Header = () => {
  const [menuActive, setMenuActive] = useState<boolean>(false);
  const [isOpenChat, setIsOpenChat] = useState<boolean>(false);

  const isMobile = useMediaQuery(Breakpoints.IS_MOBILE_MENU);
  const user = useAppSelector((state) => state.user.data);
  const isAdmin = user && user.role === UserRole.ADMIN;

  const handleClick = (evt: SyntheticEvent) => {
    evt.stopPropagation();
    setMenuActive(!menuActive);
  };

  const hendleChat = () => {
    setIsOpenChat((state) => !state);
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
        {isMobile && user && (
          <Avatar
            extClassName={styles.header__avatar}
            avatarName={user.name}
            avatarLink={user.avatar || defaultAvatar}
          />
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
          <MenuButton onClick={handleClick} isMobile={isMobile} />

          {menuActive && (
            <DropDownMenu
              role={user?.role}
              setMenuActive={setMenuActive}
              menuActive={menuActive}
              setIsOpenChat={setIsOpenChat}
            />
          )}
        </div>
      </div>

      {isOpenChat && (
        <PopupChat
          isOpen={isOpenChat}
          onClick={hendleChat}
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
