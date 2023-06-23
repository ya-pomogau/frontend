/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import ReactDOM  from "react-dom";
import { SyntheticEvent, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { SideBar } from "widgets/header/navigation";
import { EmptyMessageIcon } from "shared/ui/icons/empty-message-icon";
import { useMediaQuery } from "shared/hooks";
import {
  positionConfigMenu,
  linksMenuMobile,
  linksMenu,
} from "../utils";
import styles from "./styles.module.css";

const modalRoot = document.getElementById("modal") as HTMLElement;

const Menu = ({ setMenuActive }: { setMenuActive: (arg: boolean) => void }) => {
  const isMobile = useMediaQuery("(max-width: 900px)");

  const closeByOverlay = (evt: SyntheticEvent) => {
    if(evt.target === evt.currentTarget) {
      setMenuActive(false)
    };
  };

  const closeByEsc = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setMenuActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", closeByEsc);
    return () => {
      document.removeEventListener("keydown", closeByEsc);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ReactDOM.createPortal (
    <div className={styles.overlay} onClick={closeByOverlay}>
      <div className={isMobile ? styles.header__sidebar__container_mobile : styles.header__sidebar__container}>
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
    </div>,
    modalRoot
  )};

export default Menu;
