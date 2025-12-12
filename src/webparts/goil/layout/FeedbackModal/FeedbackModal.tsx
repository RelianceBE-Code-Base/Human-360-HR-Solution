import * as React from "react";
import Button from "../../components/common/Button/Button";
import styles from "./FeedbackModal.module.scss";

interface FeedbackModalProps {
  visible: boolean;
  onClose: () => void;
  type?: "success" | "error";
  title?: string; // modal title
  message?: string; // modal message
  buttonText?: string; // button label
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({
  visible,
  onClose,
  type = "success",
  title,
  message,
  buttonText,
}) => {
  if (!visible) return null;

  // Define dynamic colors and icons
  const config = {
    success: {
      color: "#ff6b35",
      icon: "CheckMark",
      defaultTitle: "Success",
      defaultMessage: "Operation completed successfully",
      defaultButton: "Close",
    },
    error: {
      color: "#ef4444",
      icon: "Cancel",
      defaultTitle: "Error",
      defaultMessage: "Something went wrong. Please try again.",
      defaultButton: "Close",
    },
  };

  const { color, icon, defaultTitle, defaultMessage, defaultButton } =
    config[type];

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <div className={styles.modalIcon}>
          <i
            className={`ms-Icon ms-Icon--${icon}`}
            style={{ fontSize: "3rem", color }}
          />
        </div>
        <h2 className={styles.modalTitle}>{title || defaultTitle}</h2>
        <p className={styles.modalMessage}>{message || defaultMessage}</p>
        <Button
          style={{ backgroundColor: color, borderColor: color }}
          onClick={onClose}
        >
          {buttonText || defaultButton}
        </Button>
      </div>
    </div>
  );
};

export default FeedbackModal;
