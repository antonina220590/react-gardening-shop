import styles from './ButtonNavigation.module.css';
interface ButtonNavProps {
  text: string;
  onClick?: () => void;
}
export default function ButtonNav({ text, onClick }: ButtonNavProps) {
  return (
    <button className={styles.button_nav} type="button" onClick={onClick}>
      {text}
    </button>
  );
}
