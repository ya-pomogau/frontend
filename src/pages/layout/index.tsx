import { Outlet, useLocation } from 'react-router-dom';

import Header from 'widgets/header';

import MainWrapper from 'shared/ui/main-wrapper';
import { PageLayout } from 'shared/ui/page-layout';

import styles from './styles.module.css';
import Footer from 'widgets/footer';

export function Layout() {
  const location = useLocation();
  const isMaxWidthOverlay =
    location.pathname.includes('/policy') ||
    location.pathname.includes('/blog');
  return (
    <>
      <MainWrapper>
        <Header />
        <main className={styles.main}>
          <PageLayout content={<Outlet />} />
        </main>
        <div
          className={
            isMaxWidthOverlay ? styles.overlayMaxWidth : styles.overlay
          }
        />
        <Footer />
      </MainWrapper>
    </>
  );
}
