import { Outlet } from 'react-router-dom';
import Header from '@/components/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RootLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <footer
        style={{
          padding: '20px',
          backgroundColor: '#f0f0f0',
          marginTop: '40px',
        }}
      >
        <p>Contact Info Here</p>
      </footer>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        theme="light"
      />
    </>
  );
}

export default RootLayout;
