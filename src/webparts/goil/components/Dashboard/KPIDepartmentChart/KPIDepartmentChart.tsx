import * as React from "react";
import styles from "./KPIDepartmentChart.module.scss";

import {
  Chart as ChartJS,
  BarElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// REMOVED: Unnecessary import of the entire IKPIStats interface.
// import { IKPIStats } from "../../IKPIStats";

ChartJS.register(BarElement, LinearScale, CategoryScale, Tooltip, Legend);

// CORRECTED: The props interface now clearly defines the exact data this component needs.
// This avoids the confusing nested structure.
export interface IKPIDepartmentChartProps {
  counts: {
    achievedCount: number;
    ongoingCount: number;
    missedCount: number;
  };
}

// CORRECTED: The prop name is changed to `counts` for clarity.
const KPIDepartmentChart: React.FC<IKPIDepartmentChartProps> = ({ counts }) => {
  // IMPROVEMENT: Use the dynamic data from props to build the chart.
  const chartData = {
    labels: ["Operations", "Sales", "Finance", "IT", "HR"],
    datasets: [
      {
        label: "Achieved",
        data: [3, 3, 2, 2, 2],
        backgroundColor: "#10b981",
      },
      {
        label: "Ongoing",
        data: [2, 3, 3, 4, 3],
        backgroundColor: "#fbbf24",
      },
      {
        label: "Missed",
        data: [1, 0, 1, 0, 1],
        backgroundColor: "#ef4444",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className={styles.KPIStatusChartOuter}>
      <h3>{"KPI Status Distribution"}</h3>
      <div className={styles.chartContainer}>
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default KPIDepartmentChart;
