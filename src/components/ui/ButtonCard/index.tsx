import styles from './ButtonCard.module.css';
interface ButtonCardProps {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
}
export default function ButtonCard({
  text,
  onClick,
  disabled,
}: ButtonCardProps) {
  return (
    <button
      className={styles.button_card}
      type="submit"
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
