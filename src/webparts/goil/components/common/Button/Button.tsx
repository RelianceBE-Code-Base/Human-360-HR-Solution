/**
 * Button component for rendering a styled HTML button.
 *
 * @param {React.ReactNode} children - Content displayed inside the button.
 * @param {"primary" | "secondary" | "danger" | "success"} [variant="primary"] - Visual style variant of the button.
 * @param {"sm"} [size] - Optional size of the button.
 * @param {string} [htmlId=""] - Optional HTML id attribute.
 * @param {React.CSSProperties} [style] - Optional inline styles.
 * @param {string} [className] - Additional CSS class names.
 * @param {boolean} [disabled=false] - Whether the button is disabled.
 * @param {React.MouseEventHandler<HTMLButtonElement>} [onClick] - Click event handler.
 *
 * @returns {TSX.Element} Rendered button element.
 */

import * as React from "react";
import styles from "./Button.module.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "danger" | "success";
  size?: "sm";
  htmlId?: string;
  style?: {};
  className?: string;
}

const variantMap = {
  primary: styles.btnPrimary,
  secondary: styles.btnSecondary,
  danger: styles.btnDanger,
  success: styles.btnSuccess,
};

const sizeMap = {
  sm: styles.btnSm,
};

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = "primary",
  size,
  disabled = false,
  style,
  htmlId = "",
  className,
}) => {
  const classNames = [
    styles.btn,
    variantMap[variant],
    size ? sizeMap[size] : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      id={htmlId}
      className={classNames}
      disabled={disabled}
      style={style}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
