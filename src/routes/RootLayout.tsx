import { Outlet } from 'react-router-dom';
import Header from '@/components/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './RootLayout.module.css';
import Footer from '@/components/Footer';
import ErrorBoundary from '@/components/ErrorBoundary';

function RootLayout() {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </main>
      <Footer />

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        theme="light"
      />
    </div>
  );
}

export default RootLayout;
