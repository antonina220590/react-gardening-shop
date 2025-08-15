import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo.png';
import icon from '../../assets/icon.svg';
import styles from './Header.module.css';
import { useEffect, useState } from 'react';
import MobileMenu from '../MobileMenu';

const navLinks = [
  { path: '/', title: 'Main Page', end: true },
  { path: '/categories', title: 'Categories' },
  { path: '/products', title: 'All products' },
  { path: '/sales', title: 'All sales' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const getLinkClass = ({ isActive }: { isActive: boolean }) => {
    return isActive
      ? `${styles.header_links} ${styles.active_link}`
      : styles.header_links;
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 850) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <header className={styles.header}>
        <div className={`container ${styles.header_container}`}>
          <Link to="/">
            <img
              className={styles.header_logo}
              src={logo}
              alt="Green Shop Logo"
            />
          </Link>
          <nav className={styles.navigation}>
            {navLinks.map((link) => (
              <NavLink key={link.path} to={link.path} className={getLinkClass}>
                {link.title}
              </NavLink>
            ))}
          </nav>
          <div className={styles.right_icons}>
            <Link to="/cart">
              <img className={styles.header_basket} src={icon} alt="basket" />
            </Link>

            <button
              className={`${styles.burger_btn} ${isMenuOpen ? styles.active : ''}`}
              onClick={toggleMenu}
            >
              <span className={styles.burger_line}></span>
            </button>
          </div>
        </div>
      </header>
      <MobileMenu isOpen={isMenuOpen} links={navLinks} closeMenu={toggleMenu} />
    </>
  );
}
