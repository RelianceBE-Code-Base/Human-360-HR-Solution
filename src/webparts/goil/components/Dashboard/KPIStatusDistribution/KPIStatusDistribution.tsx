import * as React from "react";
import styles from "./KPIStatusDistribution.module.scss";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

// REMOVED: Unnecessary import of the entire IKPIStats interface.
// import { IKPIStats } from "../../IKPIStats";

ChartJS.register(ArcElement, Tooltip, Legend);

// CORRECTED: The props interface now clearly defines the exact data this component needs.
// This avoids the confusing nested structure.
export interface IKPIStatusDistributionProps {
  counts: {
    achievedCount: number;
    ongoingCount: number;
    missedCount: number;
  };
}

// CORRECTED: The prop name is changed to `counts` for clarity.
const KPIStatusDistribution: React.FC<IKPIStatusDistributionProps> = ({
  counts,
}) => {
  // IMPROVEMENT: Use the dynamic data from props to build the chart.
  const chartData = {
    labels: ["Achieved", "Ongoing", "Missed"],
    datasets: [
      {
        label: "KPI Status",
        // Use the actual counts from the props
        data: [counts.achievedCount, counts.ongoingCount, counts.missedCount],
        // IMPROVEMENT: Matched colors semantically to the labels
        backgroundColor: [
          "#10b981", // Green for Achieved
          "#F59B0E", // Orange for Ongoing
          "#EF4444", // Red for Missed
        ],
        borderColor: [
          // Add a border for better visual separation
          "#ffffff",
          "#ffffff",
          "#ffffff",
        ],
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "KPI Status Distribution",
      },
    },
  };

  return (
    <div className={styles.KPIStatusChartOuter}>
      <h3>{"KPI Status Distribution"}</h3>
      <div className={styles.chartContainer}>
        <Doughnut data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default KPIStatusDistribution;
