import * as React from "react";
import { Icon } from "@fluentui/react/lib/Icon";
import styles from "./StatsCard.module.scss";

interface IStatCardProps {
  icon: any;
  label: string;
  value: number;
  iconColour: "success" | "warning" | "info" | "orange" | "danger";
  change: {
    description: string;
    type: "positive" | "negative" | "neutral";
    icon:string
  };
}

const StatsCard: React.FC<IStatCardProps> = ({
  icon,
  label,
  value,
  iconColour,
  change,
}) => {
  let changeIcon;
  if (change.type === "positive") {
    changeIcon = "CaretSolidUp";
  } else if (change.type === "negative") {
    changeIcon = "CaretSolidDown";
  } else {
    changeIcon = change.icon
  }

  return (
    <div className={styles.statCard}>
      <div className={styles.statCardHeader}>
        <div>
          <div className={styles.statLabel}>{label}</div>
          <div className={styles.statValue} id="achievedKPIs">
            {value}
          </div>
        </div>
        <div className={`${styles.statIcon} ${styles[iconColour]}`}>
          <Icon iconName={icon}></Icon>
        </div>
      </div>
      <div className={`${styles.statChange} ${styles[change.type]}`}>
        <Icon iconName={changeIcon}></Icon>
        <span>{change.description}</span>
      </div>
    </div>
  );
};

export default StatsCard;
