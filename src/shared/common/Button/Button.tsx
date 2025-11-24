import * as React from "react";
import styles from "./Button.module.scss";
// import { Icon } from "@fluentui/react/lib/Icon";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "danger" | "success";
  size?: "sm";
  htmlId?: string;
  style?: {};
  className?: string;
  // `disabled`, `onClick`, and `id` are already part of ButtonHTMLAttributes,
  // so we don't need to add them again here.
}

const variantMap = {
  primary: styles.btnPrimary,
  secondary: styles.btnSecondary,
  danger: styles.btnDanger,
  success: styles.btnSuccess,
};

const sizeMap = {
  sm: styles.btnSm,
  // Assuming you have these in your SCSS file:
  // md: styles.btnMd,
  // lg: styles.btnLg,
};

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = "primary", // primary, secondary, danger
  size, // small, medium, large
  disabled = false,
  style,
  htmlId = "",
  className,
}) => {
  const classNames = [
    styles.btn, // e.g., styles['btn']
    variantMap[variant], // Look up the correct class from the map
    size ? sizeMap[size] : "", // Only add a size class if the size prop is provided
    className,
  ]
    .filter(Boolean) // This clever trick removes any empty strings or undefined values
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
