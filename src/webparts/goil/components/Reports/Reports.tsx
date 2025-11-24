import * as React from "react";
import styles from "./Reports.module.scss";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  BarElement,
  Tooltip,
  Legend,
  PointElement,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";

// import { Icon } from '@fluentui/react/lib/Icon';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  PointElement
);

const Reports = () => {
  return (
    <div>
      <div className={styles.chartOuter}>
        <h3>{"Monthly Progress"}</h3>
        <div className={styles.chartContainer}>
          <Line
            data={{
              labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
              datasets: [
                {
                  label: "KPIs Achieved",
                  data: [5, 8, 12, 15, 18, 20, 22],
                  borderColor: "#ea5b0c",
                  backgroundColor: "rgba(234, 91, 12, 0.1)",
                  tension: 0.4,
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
            }}
          />
        </div>
      </div>
      <div className={styles.chartOuter}>
        <h3>{"Budget Utilization"}</h3>
        <div className={styles.chartContainer}>
          <Bar
            data={{
              labels: ["Operations", "Sales", "Finance", "IT", "HR"],
              datasets: [
                {
                  label: "Allocated (GHS)",
                  data: [725000, 1180000, 340000, 1170000, 550000],
                  backgroundColor: "#ea5b0c",
                },
                {
                  label: "Utilized (GHS)",
                  data: [580000, 950000, 280000, 980000, 440000],
                  backgroundColor: "#212121",
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Reports;

// export {itemsCommandBar};
