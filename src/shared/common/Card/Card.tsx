import * as React from "react";
// import { Icon } from '@fluentui/react/lib/Icon';
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
