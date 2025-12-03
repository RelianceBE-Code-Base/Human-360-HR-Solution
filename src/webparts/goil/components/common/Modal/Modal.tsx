/**
 * Modal component for displaying content in a dialog overlay.
 *
 * @param {boolean} isOpen - Whether the modal is currently open.
 * @param {() => void} onClose - Callback function to close the modal.
 * @param {string} title - Title displayed at the top of the modal.
 * @param {React.ReactNode} children - Content to render inside the modal body.
 * @param {React.ReactNode} [footer] - Optional footer content, such as action buttons.
 *
 * Features:
 * - Closes when clicking the overlay or pressing the Escape key.
 * - Uses a React portal to render the modal at the document body level.
 * - Accessible with `role="dialog"`, `aria-modal="true"`, and labeled by title.
 *
 * @returns {TSX.Element | null} The modal element rendered via portal, or null if closed.
 */

import * as React from "react";
import * as ReactDOM from "react-dom";
import styles from "./Modal.module.scss";

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
