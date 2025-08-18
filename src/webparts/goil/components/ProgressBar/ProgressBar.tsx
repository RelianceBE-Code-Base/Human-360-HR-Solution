import * as React from "react";
import styles from "./Progress.module.scss";

interface IProgressBar {
  progress: number;
}

const ProgressBar: React.FC<IProgressBar> = ({ progress }) => {
  const getProgressColor = (value: number):string => {
    if (value < 60) return "#ef4444"; //red
    if (value < 100) return "#fbc02d"; // Yellow
    return "#10b981"; // Green
  };
  return (
    <div className={styles.progress_container}>
      <div className={styles.progress_label}>
        <span>Progress</span>
        <span>{progress}%</span>
      </div>
      <div className={styles.progress_bar}>
        <div
          className={styles.progress_fill}
          style={{
            width: `${progress}%`,
            backgroundColor: getProgressColor(progress),
          }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
