import styles from './Modal.module.css';
import CloseIcon from '../icons/CloseIcon';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        {children}
        <button className={styles.close_btn} onClick={onClose}>
          <CloseIcon className={styles.close_icon} />
        </button>
      </div>
    </div>
  );
}
