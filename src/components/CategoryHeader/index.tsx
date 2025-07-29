import { Link } from 'react-router-dom';
import styles from './CategoryHeader.module.css';
import ButtonNav from '../ui/ButtonNavigation';
interface CategoryHeaderProps {
  title: string;
  pathTo: string;
  btnText: string;
}

export default function CategoryHeader({
  title,
  pathTo,
  btnText,
}: CategoryHeaderProps) {
  return (
    <div className={styles.category_title}>
      <h2 className={styles.category_name}>{title}</h2>
      <span className={styles.category_line}></span>
      <Link to={pathTo}>
        <ButtonNav text={btnText} />
      </Link>
    </div>
  );
}
