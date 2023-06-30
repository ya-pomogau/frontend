import { useState, FC, SyntheticEvent } from "react";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "app/hooks";
import { Logo } from "shared/ui/logo";
import { SideBar } from "widgets/header/navigation";
import Menu from "widgets/header/menu";
import { MenuIcon } from "shared/ui/icons/menu-icon";
import { Avatar } from "shared/ui/avatar";
import { useMediaQuery } from "shared/hooks/media-query";
import { positionConfigTop, linksTop } from "./utils";
import styles from "./styles.module.css";

const Header: FC = () => {
  const [menuActive, setMenuActive] = useState<boolean>(false);

  const isMobile = useMediaQuery("(max-width: 900px)");
  const user = useAppSelector((state) => state.user.data);

  const handleClick = (evt: SyntheticEvent) => {
    evt.stopPropagation();
    setMenuActive(!menuActive);
  }

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
        <NavLink to="/">
          <Logo />
        </NavLink>
        {!isMobile && <SideBar position={positionConfigTop} links={linksTop} />}

        <div className={styles.header__menu__container}>
          <button
            onClick={handleClick}
            className={styles.header__button}
            type="button"
          >
            <MenuIcon color="blue"/>
          </button>
          {menuActive && <Menu setMenuActive={setMenuActive} menuActive={menuActive} />}
        </div>
      </div>
    </header>
  );
};

export default Header;
