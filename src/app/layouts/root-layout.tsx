import { Outlet } from 'react-router-dom';

import Header from 'widgets/header';
import { BottomBar } from 'shared/ui/bottom-bar';

import styles from './root-layout.module.css';

export const RootLayout = () => {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <footer className={styles.footer}>
        <BottomBar />
      </footer>
    </>
  );
};
