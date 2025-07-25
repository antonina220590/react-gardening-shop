import { Outlet } from 'react-router-dom';
import Header from '@/components/Header';

function RootLayout() {
  return (
    <>
      <Header />
      <main style={{ padding: '20px' }}>
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
    </>
  );
}

export default RootLayout;
