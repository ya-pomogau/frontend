import { SyntheticEvent, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { useAppSelector } from 'app/hooks';
import { useMediaQuery } from 'shared/hooks/media-query';
import { linksTop, linksTopAuthAdmin, positionConfigTop } from './utils';

import { Logo } from 'shared/ui/logo';
import { SideBar } from 'widgets/header/navigation';
import { MenuIcon } from 'shared/ui/icons/menu-icon';
import { Avatar } from 'shared/ui/avatar';
import { UnionIcon } from 'shared/ui/icons/union-icon';

import { PopupChat } from 'entities/chat/ui/chat';
import { infoAdmin } from 'entities/chat/ui/chat/libs/utils';
import { UserRole } from 'shared/types/common.types';
import { DropDownMenu } from './DropDownMenu';

import defaultAvatar from 'shared/ui/info-container/img/placeholder.svg';
import styles from './styles.module.css';
import { Button } from 'shared/ui/button';
import { handleRedirectVK } from 'shared/libs/utils';

const Header = () => {
  const [menuActive, setMenuActive] = useState<boolean>(false);
  const [isOpenChat, setIsOpenChat] = useState<boolean>(false);

  const isMobile = useMediaQuery('(max-width: 920px)');
  const user = useAppSelector((state) => state.user.data);

  const handleClick = (evt: SyntheticEvent) => {
    evt.stopPropagation();
    setMenuActive(!menuActive);
  };

  const hendleChat = () => {
    setIsOpenChat((state) => !state);
  };

  const isMenuHidden = !user && !isMobile;

  return (
    <header className={`${styles.header} ${isMobile && styles.header_mobile}`}>
      <div className={styles.header__container}>
        {isMobile && user && (
          <div className={`${styles.header__avatar} `}>
            <Avatar
              extClassName={styles.header__avatar}
              avatarName={user.name}
              avatarLink={user.avatar || defaultAvatar}
            />
          </div>
        )}
        {isMobile && !user && (
          <div className={`${styles.header__button} `}>
            <Button
              buttonType="primary"
              actionType="submit"
              label="Войти"
              size="small"
              onClick={() => handleRedirectVK()}
            />
          </div>
        )}

        <NavLink
          className={`${styles.header__logo} ${
            isMobile && styles.header__logo_mobile
          }`}
          to="/"
        >
          <Logo />
        </NavLink>

        {user && user.role === UserRole.ADMIN
          ? !isMobile && (
              <SideBar position={positionConfigTop} links={linksTopAuthAdmin} />
            )
          : !isMobile && (
              <SideBar position={positionConfigTop} links={linksTop} />
            )}

        <div
          className={`${styles.header__menu__container} ${
            isMenuHidden && styles.header__menu__container_hidden
          }`}
        >
          <button
            onClick={handleClick}
            className={styles.header__button}
            type="button"
          >
            {isMobile ? (
              <MenuIcon color="blue" />
            ) : (
              <div className={styles.header__button__container}>
                <span className={styles.header__button__text}>Меню</span>
                <UnionIcon color="blue" />
              </div>
            )}
          </button>
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
