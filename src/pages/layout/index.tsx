import { Outlet, useLocation } from 'react-router-dom';

import Header from 'widgets/header';
import { BottomBar } from 'shared/ui/bottom-bar';

import styles from './styles.module.css';
import { PageLayout } from 'shared/ui/page-layout';

export function Layout() {
  const location = useLocation();
  const isMaxWidthOverlay =
    location.pathname.includes('/policy') ||
    location.pathname.includes('/blog');
  return (
    <>
      <Header />
      <main className={styles.main}>
        <PageLayout content={<Outlet />} />
      </main>
      <div
        className={isMaxWidthOverlay ? styles.overlayMaxWidth : styles.overlay}
      />
      <footer className={styles.footer}>
        <BottomBar />
      </footer>
    </>
  );
}
