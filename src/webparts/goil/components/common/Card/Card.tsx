/**
 * Card component for displaying content within a styled container.
 *
 * @param {React.ReactNode} children - The content to render inside the card body.
 * @param {any} title - Optional title displayed at the top of the card.
 *
 * @returns {TSX.Element} A styled card component.
 */

import * as React from "react";
import styles from "./Card.module.scss";

interface CardProps {
  children: React.ReactNode;
  title: any;
}

const Card: React.FC<CardProps> = ({ children, title }) => {
  return (
    <div className={styles.card}>
      {title && (
        <div className={styles.cardHeader}>
          <h3 className={styles.cardTitle}>{title}</h3>
          <div></div>
        </div>
      )}
      {<div className={styles.cardBody}>{children}</div>}
    </div>
  );
};

export default Card;
