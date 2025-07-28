import { NavLink } from 'react-router-dom';
import styles from './MobileMenu.module.css';

type MobileMenuProps = {
  isOpen: boolean;
  links: { path: string; title: string }[];
  closeMenu: () => void;
};

export default function MobileMenu({
  isOpen,
  links,
  closeMenu,
}: MobileMenuProps) {
  const menuClasses = `${styles.mobile_menu} ${isOpen ? styles.active : ''}`;
  const getLinkClass = ({ isActive }: { isActive: boolean }) => {
    return isActive
      ? `${styles.nav_link} ${styles.active_link}`
      : styles.nav_link;
  };

  return (
    <div className={menuClasses}>
      <nav className={styles.nav}>
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            onClick={closeMenu}
            className={getLinkClass}
          >
            {link.title}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
