import * as React from "react";
import styles from "./ManagerDashboard.module.scss";
import Card from "../../../components/common/Card/Card";
import StatsCard from "../../../components/common/Card/StatsCard";
import { IStatsData } from "../../../../../shared/types/IStatsData";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  BarElement,
  Tooltip,
  Legend,
  PointElement,
  Filler,
} from "chart.js";
import { Line, Doughnut, Bar } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
import { Icon } from "@fluentui/react/lib/Icon";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  PointElement,
  Filler
);

const initialStats: IStatsData[] = [
  {
    label: "Pending Appraisals",
    icon: "Group",
    value: 5,
    iconColour: "orange",
    change: { description: "+2 from last week", type: "positive", icon: "" },
  },
  {
    label: "Team Average Score",
    icon: "BullseyeTarget",
    value: 4.2,
    iconColour: "success",
    change: {
      description: "-0.1 from last quarter",
      type: "negative",
      icon: "",
    },
  },
  {
    label: "Goals on Track",
    icon: "WorkItem",
    value: 85,
    iconColour: "warning",
    change: { description: "+5% from last month", type: "positive", icon: "" },
  },
  {
    label: "Overdue Tasks",
    icon: "EMI",
    value: 2,
    iconColour: "info",
    change: { description: "+1 from last week", type: "negative", icon: "" },
  },
];

const teamPerformanceData = [
  { name: "L. Smith", score: 4.5, color: "#3B82F6" },
  { name: "M. Lee", score: 4.2, color: "#3B82F6" },
  { name: "J. Doe", score: 3.8, color: "#3B82F6" },
  { name: "S. Ray", score: 3.1, color: "#F59E0B" },
  { name: "P. Kim", score: 2.5, color: "#EF4444" },
];

const quarterlyTrendData = {
  labels: ["Q1 2023", "Q2 2023", "Q3 2023", "Q4 2023"],
  datasets: [
    {
      label: "Performance Trend",
      data: [3.5, 4.0, 2.8, 4.2],
      borderColor: "#3B82F6",
      backgroundColor: "rgba(59,130,246,0.1)",
      fill: true,
      tension: 0.4,
    },
  ],
};

// const competencyDistributionData = {
//   labels: [
//     "Leadership",
//     "Comms",
//     "Teamwork",
//     "Problem-Solving",
//     "Innovation",
//     "Adaptability",
//   ],
//   datasets: [
//     {
//       label: "Competency",
//       data: [8, 10, 7, 9, 6, 8],
//       backgroundColor: "#3B82F6",
//     },
//   ],
// };
const competencyDistributionData = {
  labels: [
    "Leadership",
    "Comms",
    "Teamwork",
    "Problem-Solving",
    "Innovation",
    "Adaptability",
  ],
  datasets: [
    {
      data: [8, 10, 7, 9, 6, 8],
      backgroundColor: "#c7d7fe",
      borderRadius: 8,
      barThickness: 36,
    },
  ],
};


const appraisalStatusData = {
  labels: ["Completed", "In Progress", "Approval", "Not Started"],
  datasets: [
    {
      data: [18, 8, 3, 1],
      backgroundColor: ["#3B82F6", "#60A5FA", "#FBBF24", "#D1D5DB"],
      borderWidth: 0,
    },
  ],
};

const ManagerDashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section>
      <h1>Manager Dashboard</h1>
      <p className={`${styles.textMuted} mb3`}>
        Welcome back! Here's an overview of the system performance.
      </p>

      {/* 4 Stats Cards */}
      <div className={styles.statsGrid}>
        {initialStats.map((stat, idx) => (
          <StatsCard key={idx} {...stat} />
        ))}
      </div>

      {/* Top row: 2 charts */}
      <div className={styles.topGrid}>
        <Card title="Quarterly Performance Trend">
          <div className={styles.cardActions}>
            <button
              onClick={() => navigate("/all-kpis")}
              className={styles.viewAllBtn}
            >
              View All
            </button>
          </div>
          <div className={styles.chartContainer}>
            <Line
              data={quarterlyTrendData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: true } },
              }}
            />
          </div>
        </Card>

        <Card title="Team Performance Ratings">
          <div className={styles.listContainer}>
            {teamPerformanceData.map((t, i) => (
              <div key={i} className={styles.performanceItem}>
                <span>{t.name}</span>
                <div className={styles.performanceBarBg}>
                  <div
                    className={styles.performanceBarFg}
                    style={{
                      width: `${(t.score / 5) * 100}%`,
                      backgroundColor: t.color,
                    }}
                  />
                </div>
                <span>{t.score}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Bottom row: 3 cards */}
      <div className={styles.bottomGrid}>
      {/* <Card title="Team Summary">
  <div className={styles.summaryList}>
    <div className={styles.summaryItem}>
      <div className={`${styles.summaryIcon} ${styles.iconBlue}`}>
        <Icon iconName="People" />
      </div>
      <div>
        <div className={styles.summaryValue}>10</div>
        <div className={styles.summaryLabel}>Team Members</div>
      </div>
    </div>

    <div className={styles.summaryItem}>
      <div className={`${styles.summaryIcon} ${styles.iconGreen}`}>
        <Icon iconName="CompletedSolid" />
      </div>
      <div>
        <div className={styles.summaryValue}>7</div>
        <div className={styles.summaryLabel}>Completed Self-Reviews</div>
      </div>
    </div>

    <div className={styles.summaryItem}>
      <div className={`${styles.summaryIcon} ${styles.iconOrange}`}>
        <Icon iconName="BullseyeTarget" />
      </div>
      <div>
        <div className={styles.summaryValue}>24</div>
        <div className={styles.summaryLabel}>Goals In Progress</div>
      </div>
    </div>

    <div className={styles.summaryItem}>
      <div className={`${styles.summaryIcon} ${styles.iconRed}`}>
        <Icon iconName="WarningSolid" />
      </div>
      <div>
        <div className={styles.summaryValue}>3</div>
        <div className={styles.summaryLabel}>Overdue Feedback</div>
      </div>
    </div>
  </div>
      </Card> */}
      <Card title="Team Summary">
  <div className={styles.cardFill}>
    <div className={styles.summaryList}>
      <div className={styles.summaryItem}>
        <div className={`${styles.summaryIcon} ${styles.iconBlue}`}>
          <Icon iconName="People" />
        </div>
        <div>
          <div className={styles.summaryValue}>10</div>
          <div className={styles.summaryLabel}>Team Members</div>
        </div>
      </div>

      <div className={styles.summaryItem}>
        <div className={`${styles.summaryIcon} ${styles.iconGreen}`}>
          <Icon iconName="CompletedSolid" />
        </div>
        <div>
          <div className={styles.summaryValue}>7</div>
          <div className={styles.summaryLabel}>Completed Self-Reviews</div>
        </div>
      </div>

      <div className={styles.summaryItem}>
        <div className={`${styles.summaryIcon} ${styles.iconOrange}`}>
          <Icon iconName="BullseyeTarget" />
        </div>
        <div>
          <div className={styles.summaryValue}>24</div>
          <div className={styles.summaryLabel}>Goals In Progress</div>
        </div>
      </div>

      <div className={styles.summaryItem}>
        <div className={`${styles.summaryIcon} ${styles.iconRed}`}>
          <Icon iconName="WarningSolid" />
        </div>
        <div>
          <div className={styles.summaryValue}>3</div>
          <div className={styles.summaryLabel}>Overdue Feedback</div>
        </div>
      </div>
    </div>
  </div>
</Card>



  {/* <Card title="Competency Distribution">
    <div className={styles.chartContainer}>
    <Bar
        data={competencyDistributionData}
        options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
        },
          scales: {
            x: {
              grid: { display: false },
              ticks: {
                color: "#6b7280",
                font: { size: 11 },
              },
                 },
      y:{
        beginAtZero: true,
        grid: { display: false },
        ticks: { display: false },
      },
      },
      }}
    />
    </div>
  </Card> */}
  <Card title="Competency Distribution">
  <div className={styles.cardFill}>
    <div className={styles.competencyChart}>
      <Bar
        data={competencyDistributionData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: {
              grid: { display: false },
              ticks: { color: "#6b7280", font: { size: 11 } },
            },
            y: {
              beginAtZero: true,
              grid: { display: false },
              ticks: { display: false },
            },
          },
        }}
      />
    </div>
  </div>
</Card>

 {/* <Card title="Appraisal Status Distribution">
  <div className={styles.cardFill}>
    <div className={styles.donutChart}>
      <Doughnut
        data={appraisalStatusData}
        options={{
          maintainAspectRatio: false,
          cutout: "72%",
          plugins: {
            legend: {
              position: "bottom",
              labels: {
                usePointStyle: true,
                boxWidth: 8,
              },
            },
          },
        }}
      />

      <div className={styles.donutCenter}>
        <div className={styles.donutValue}>30</div>
        <div className={styles.donutLabel}>Total</div>
      </div>
    </div>
  </div>
</Card> */}
<Card title="Appraisal Status Distribution">
  <div className={styles.cardFill}>
    <div className={styles.donutChart}>
      <Doughnut
        data={appraisalStatusData}
        options={{
          maintainAspectRatio: false,
          cutout: "72%",
          plugins: {
            legend: {
              position: "bottom",
              labels: {
                usePointStyle: true,
                boxWidth: 8,
              },
            },
          },
        }}
      />
      {/* 👇 MUST be INSIDE donutChart */}
      <div className={styles.donutCenter}>
        <div className={styles.donutValue}>30</div>
        <div className={styles.donutLabel}>Total</div>
      </div>
    </div>
  </div>
</Card>



      </div>
    </section>
  );
};

export default ManagerDashboard;
