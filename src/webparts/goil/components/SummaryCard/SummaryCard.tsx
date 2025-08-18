import * as React from "react";
import styles from "./SummaryCard.module.scss";
import type { ISummaryCardProps } from "./ISummaryCardProps";
import { Icon } from "@fluentui/react/lib/Icon";

const SummaryCard = (props: ISummaryCardProps) => {

  return (
    // <section className={styles.dashboard}>
    //   <div className={styles.header}>
    <div className={styles.summaryGrid}>
      <div className={styles.summaryCard}>
        <div>
          <div className={styles.cardContent}>
            <div>
              <p className={styles.label}>{props.label}</p>
              <p
                className={styles.value}
                style={{
                  color: props.bgColor,
                }}
              >
                {props.value}
              </p>
            </div>
            <div
              className={`${styles.iconWrapper} ${styles.icon}`}
              style={{
                backgroundColor: props.bgColor,
                color: "#ffffff",
              }}
            >
              <Icon iconName={props.icon} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
