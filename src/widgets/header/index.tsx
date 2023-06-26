import { useState, FC } from "react";
import { NavLink } from "react-router-dom";

import { useAppSelector } from "app/hooks";
import { useMediaQuery } from "shared/hooks/media-query";

import { Logo } from "shared/ui/logo";
import { SideBar } from "widgets/header/navigation";
import { MenuIcon } from "shared/ui/icons/menu-icon";
import { EmptyMessageIcon } from "shared/ui/icons/empty-message-icon";
import { Avatar } from "shared/ui/avatar";
import {
  positionConfigTop,
  positionConfigMenu,
  linksTop,
  linksMenuMobile,
  linksMenu,
} from "./utils";
import styles from "./styles.module.css";

const Header: FC = () => {
  const [menuActive, setMenuActive] = useState<boolean>(false);

  const isMobile = useMediaQuery("(max-width: 900px)");
  const user = useAppSelector((state) => state.user.data);

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        {isMobile && (
          <div className={`${styles.header__avatar} `}>
            {user && isMobile && (
              <Avatar
                extClassName={styles.header__avatar}
                avatarName={user.fullname}
                avatarLink={user.avatar}
              />
            )}{" "}
          </div>
        )}
        <NavLink to="/" className={`${styles.header__logo_container} `}>
          <Logo />
        </NavLink>
        {!isMobile && <SideBar position={positionConfigTop} links={linksTop} />}

        <div className={styles.header__menu__container}>
          <button
            onClick={() => setMenuActive(!menuActive)}
            className={styles.header__button}
            type="button"
          >
            <MenuIcon color="blue" />
          </button>
          <div
            className={`${styles.header__menu} ${
              menuActive && styles.header__menu_active
            } `}
          >
            <div className={styles.header__sidebar__container}>
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
              <SideBar
                position={positionConfigMenu}
                links={isMobile ? linksMenuMobile : linksMenu}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
