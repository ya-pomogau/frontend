import { Outlet } from 'react-router-dom';

import Header from 'widgets/header';
import Footer from 'widgets/footer';

import styles from './root-layout.module.css';

export const RootLayout = () => {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
