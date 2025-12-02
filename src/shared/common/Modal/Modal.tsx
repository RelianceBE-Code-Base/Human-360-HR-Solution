import * as React from "react";
import * as ReactDOM from "react-dom";
// 1. Import the styles as a module object
import styles from "./Modal.module.scss";

// Props remain the same
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
}) => {
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const modalContent = (
    // 2. Use the imported styles object to apply classes
    <div className={styles.modalOverlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <header className={styles.modalHeader}>
          <h2 id="modal-title" className={styles.modalTitle}>
            {title}
          </h2>
          <button
            className={styles.modalClose}
            onClick={onClose}
            aria-label="Close modal"
          >
            &times;
          </button>
        </header>

        <main className={styles.modalBody}>{children}</main>

        {footer && <footer className={styles.modalFooter}>{footer}</footer>}
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};
