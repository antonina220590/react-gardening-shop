import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo.png';
import icon from '../../assets/icon.svg';
import styles from './Header.module.css';

export default function Header() {
  const getLinkClass = ({ isActive }: { isActive: boolean }) => {
    return isActive
      ? `${styles.header_links} ${styles.active_link}`
      : styles.header_links;
  };

  return (
    <header className={styles.header}>
      <div className={`container ${styles.header_container}`}>
        <Link to="/">
          <img src={logo} alt="Green Shop Logo" />
        </Link>
        <nav>
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
        <img src={icon} alt="busket" />
      </div>
    </header>
  );
}
