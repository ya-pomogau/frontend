import { Outlet } from 'react-router-dom';

import Header from 'widgets/header';
import Footer from 'widgets/footer';
import MainWrapper from 'shared/ui/main-wrapper';
import { PageLayout } from 'shared/ui/page-layout';

import styles from './styles.module.css';

export function Layout() {
  return (
    <MainWrapper>
      <Header />
      <main className={styles.main}>
        <PageLayout content={<Outlet />} />
      </main>
      <div className={styles.overlay} />
      <Footer />
    </MainWrapper>
  );
}
