import styles from './ButtonNavigation.module.css';
interface ButtonNavigationProps {
  text: string;
  onClick?: () => void;
}
export default function ButtonNavigation({
  text,
  onClick,
}: ButtonNavigationProps) {
  return (
    <button className={styles.button_nav} type="button" onClick={onClick}>
      {text}
    </button>
  );
}
