import styles from './ButtonCard.module.css';
interface ButtonCardProps {
  text: string;
  onClick?: () => void;
}
export default function ButtonCard({ text, onClick }: ButtonCardProps) {
  return (
    <button className={styles.button_card} type="button" onClick={onClick}>
      {text}
    </button>
  );
}
