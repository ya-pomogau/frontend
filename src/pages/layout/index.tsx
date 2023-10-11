import { Outlet } from 'react-router-dom';

import Header from 'widgets/header';
import { BottomBar } from 'shared/ui/bottom-bar';

import styles from './styles.module.css';
import { PageLayout } from 'shared/ui/page-layout';

export function Layout() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <PageLayout content={<Outlet />} />
      </main>
      <div className={styles.overlay} />
      <footer className={styles.footer}>
        <BottomBar />
      </footer>
    </>
  );
}
