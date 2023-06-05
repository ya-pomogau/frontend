import { Outlet } from "react-router-dom";
import { BottomBar } from "shared/ui/bottom-bar";
import Header from "widgets/header";
import styles from "./styles.module.css";

export function Layout() {
  return (
    <>
      <header><Header/></header>
      <main className={styles.main}>
        <Outlet />
        <div className={styles.overlay} />
      </main>
      <footer className={styles.footer}><BottomBar /></footer>
    </>
  );
}
