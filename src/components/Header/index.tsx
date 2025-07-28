import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo.png';
import icon from '../../assets/icon.svg';
import styles from './Header.module.css';
import { useState } from 'react';

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

  return (
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
          <NavLink to="/" className={getLinkClass}>
            Main Page
          </NavLink>
          <NavLink to="/categories" className={getLinkClass}>
            Categories
          </NavLink>
          <NavLink to="/products" className={getLinkClass}>
            All products
          </NavLink>
          <NavLink to="/sales" className={getLinkClass}>
            All sales
          </NavLink>
        </nav>
        <div className={styles.right_icons}>
          <img className={styles.header_basket} src={icon} alt="basket" />
          <button
            className={`${styles.burger_btn} ${isMenuOpen ? styles.active : ''}`}
            onClick={toggleMenu}
          >
            <span className={styles.burger_line}></span>
          </button>
        </div>
      </div>
    </header>
  );
}
