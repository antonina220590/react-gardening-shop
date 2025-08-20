import styles from './Button.module.css';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'success';
};

export default function Button({
  children,
  onClick,
  disabled,
  type = 'button',
  variant = 'primary',
}: ButtonProps) {
  const buttonClasses = `${styles.button} ${styles[variant]}`;

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
