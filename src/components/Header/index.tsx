import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo.png';
import icon from '../../assets/icon.svg';
import styles from './Header.module.css';
import { useEffect, useState } from 'react';
import MobileMenu from '../ui/MobileMenu';
import { useAppSelector } from '../../store/hooks';

const navLinks = [
  { path: '/', title: 'Main Page', end: true },
  { path: '/categories', title: 'Categories' },
  { path: '/products', title: 'All products' },
  { path: '/sales', title: 'All sales' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const totalCount = useAppSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const getLinkClass = ({ isActive }: { isActive: boolean }) => {
    return isActive ? `${styles.links} ${styles.activeLink}` : styles.links;
  };

  const mobileWidth = 850;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > mobileWidth) {
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
        <div className={`container ${styles.wrapper}`}>
          <Link to="/">
            <img className={styles.logo} src={logo} alt="Green Shop Logo" />
          </Link>
          <nav className={styles.navigation}>
            {navLinks.map((link) => (
              <NavLink key={link.path} to={link.path} className={getLinkClass}>
                {link.title}
              </NavLink>
            ))}
          </nav>
          <div className={styles.icons}>
            <Link to="/cart">
              <div className={styles.cartContainer}>
                <img className={styles.cart} src={icon} alt="basket" />
                {totalCount > 0 && (
                  <span className={styles.productCount}>{totalCount}</span>
                )}
              </div>
            </Link>

            <button
              className={`${styles.burger} ${isMenuOpen ? styles.active : ''}`}
              onClick={toggleMenu}
            >
              <span className={styles.line}></span>
            </button>
          </div>
        </div>
      </header>
      <MobileMenu isOpen={isMenuOpen} links={navLinks} closeMenu={toggleMenu} />
    </>
  );
}
