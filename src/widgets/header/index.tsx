import { useState, SyntheticEvent } from 'react';
import { NavLink } from 'react-router-dom';

import { useAppSelector } from 'app/hooks';
import { useMediaQuery } from 'shared/hooks/media-query';
import { positionConfigTop, linksTop, linksTopAuthAdmin } from './utils';

import { Logo } from 'shared/ui/logo';
import { SideBar } from 'widgets/header/navigation';
import { Menu } from 'widgets/header/menu';
import { MenuIcon } from 'shared/ui/icons/menu-icon';
import { Avatar } from 'shared/ui/avatar';
import { UnionIcon } from 'shared/ui/icons/union-icon';

import styles from './styles.module.css';
import { PopupChat } from 'entities/chat/ui/chat';
import { infoAdmin } from 'entities/chat/ui/chat/libs/utils';

const Header = () => {
  const [menuActive, setMenuActive] = useState<boolean>(false);
  const [isOpenChat, setIsOpenChat] = useState<boolean>(false);

  const isMobile = useMediaQuery('(max-width: 900px)');
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
        {isMobile && (
          <div className={`${styles.header__avatar} `}>
            {user && isMobile && (
              <Avatar
                extClassName={styles.header__avatar}
                avatarName={user.fullname}
                avatarLink={user.avatar}
              />
            )}{' '}
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

        {user && (user.role === 'master' || user?.role === 'admin')
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
            <Menu
              setMenuActive={setMenuActive}
              menuActive={menuActive}
              onClick={hendleChat}
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
