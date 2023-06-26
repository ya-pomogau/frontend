import { useState, FC, SyntheticEvent } from "react";
import { NavLink } from "react-router-dom";
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
  const auth = true;

  const isMobile = useMediaQuery("(max-width: 900px)");

  const profile = {
    name: "gosha",
    avatarLink: "https://i.pravatar.cc/300",
  };

  const handleClick = (evt: SyntheticEvent) => {
    evt.stopPropagation();
    setMenuActive(!menuActive);
  }

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        {isMobile && (
          <div className={`${styles.header__avatar} `}>
            {auth && isMobile && (
              <Avatar
                extClassName={styles.header__avatar}
                avatarName={profile.name}
                avatarLink={profile.avatarLink}
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
