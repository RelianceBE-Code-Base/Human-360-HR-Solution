import * as React from "react";
import styles from "./KPICard.module.scss";
import ProgressBar from "../ProgressBar/ProgressBar";
// import { initializeIcons } from '@fluentui/react/lib/Icons';
// import { Icon } from "@fluentui/react/lib/Icon";

interface IKPICardProps {
  department: string;
  target: string;
  timeline: string;
  budget: number;
  progress: number;
  status:string
}

const KPICard: React.FC<IKPICardProps> = ({
  department,
  target,
  timeline,
  budget,
  progress,
}) => {
  const getKPISatusColor = (value: number): string => {
    if (value < 60) return "#ef4444"; //red
    if (value < 100) return "#fbc02d"; // Yellow
    return "#10b981"; // Green
  };

  return (
    <div className={styles.KPIcard}>
      <div className={styles.cardHeader}>
        <h3 className={styles.title}>Equipment Uptime Percentage</h3>
        <span
          className={styles.statusBadge}
          style={{
            backgroundColor: getKPISatusColor(progress),
          }}
        >
          {progress == 100 ? "Archieved" : "outgoing"}
        </span>
      </div>

      <div className={styles.cardBody}>
        <p className={styles.paragraph}>
          <strong>Department:</strong> Operations
        </p>
        <p className={styles.paragraph}>
          <strong>Target:</strong> 95%
        </p>
        <p className={styles.paragraph}>
          <strong>Timeline:</strong> 01/01/2025 - 31/07/2025
        </p>
        <p className={styles.paragraph}>
          <strong>Budget:</strong> <span className={styles.currency}>GHS</span>{" "}
          150,000
        </p>

        <div className={styles.progressSection}>
          <ProgressBar progress={progress} />
        </div>
      </div>
    </div>
  );
};

export default KPICard;
