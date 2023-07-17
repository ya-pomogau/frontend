import { Outlet } from 'react-router-dom';

import { BottomBar } from 'shared/ui/bottom-bar';
import Header from 'widgets/header';

import styles from './styles.module.css';

export function Layout() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <div className={styles.overlay} />
      <footer className={styles.footer}>
        <BottomBar />
      </footer>
    </>
  );
}
