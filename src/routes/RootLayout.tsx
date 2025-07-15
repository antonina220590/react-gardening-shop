import { Outlet, Link } from 'react-router-dom';

function RootLayout() {
  return (
    <>
      <header style={{ padding: '20px', backgroundColor: '#f0f0f0' }}>
        <nav>
          <Link to="/" style={{ marginRight: '15px' }}>
            Main Page
          </Link>
          <Link to="/categories" style={{ marginRight: '15px' }}>
            Categories
          </Link>
        </nav>
      </header>

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
