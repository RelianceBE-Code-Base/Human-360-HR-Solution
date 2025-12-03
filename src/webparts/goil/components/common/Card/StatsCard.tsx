/**
 * StatsCard component displays a single statistic with an icon, value, label, and change indicator.
 *
 * @param {any} icon - The icon to display representing the statistic.
 * @param {string} label - The label or name of the statistic.
 * @param {number} value - The numeric value of the statistic.
 * @param {"success" | "warning" | "info" | "orange" | "danger"} iconColour - Color variant for the icon.
 * @param {Object} change - Object representing the change in the statistic.
 * @param {string} change.description - Text describing the change (e.g., "+12% this month").
 * @param {"positive" | "negative" | "neutral"} change.type - Type of change for icon and styling.
 * @param {string} change.icon - Fallback icon to use if change.type is "neutral".
 *
 * @returns {TSX.Element} A styled card displaying the statistic and its change.
 */

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
    icon: string;
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
    changeIcon = change.icon;
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
