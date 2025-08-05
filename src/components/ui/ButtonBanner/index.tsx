import styles from './ButtonBanner.module.css';
interface ButtonBannerProps {
  text: string;
  onClick?: () => void;
  isLoading?: boolean;
  isSuccess?: boolean;
  successText?: string;
}
export default function ButtonBanner({
  text,
  isLoading,
  isSuccess,
  successText = 'Request Submitted',
}: ButtonBannerProps) {
  const buttonClasses = `${styles.button_banner} ${
    isSuccess ? styles['button_banner-succes'] : ''
  }`;
  return (
    <button
      className={buttonClasses}
      type="submit"
      disabled={isLoading || isSuccess}
    >
      {isLoading ? 'Sending...' : isSuccess ? successText : text}
    </button>
  );
}
