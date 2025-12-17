import * as React from "react";
import styles from ".//complianceReports.module.scss";
import Card from "../../../../components/common/Card/Card";
import StatsCard from "../../../../components/common/Card/StatsCard";
import { IStatsData } from "../../../../../../shared/types/IStatsData";
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
import { Line, Doughnut } from "react-chartjs-2";

import KPIs from "../../../../../../shared/constant/kpis";
import { IKPI } from "../../../../../../shared/types/IKPI";
import { useNavigate } from "react-router-dom";

const viewAllRoutes: Record<string, string> = {
  "Department Overview": "/department-management",
  "Recent KPI Updates": "/all-kpis",
};

const mockUsers = [
  { id: 1, name: "Admin User", role: "Admin", status: "Active" },
  { id: 2, name: "John Doe", role: "Manager", status: "Active" },
  { id: 3, name: "Jane Smith", role: "Employee", status: "Active" },
  { id: 4, name: "Peter Jones", role: "Employee", status: "Inactive" },
];

const mockAppraisals = [
  { id: 101, employee: "Jane Smith", status: "Completed" },
  { id: 102, employee: "Peter Jones", status: "Pending" },
  { id: 103, employee: "John Doe", status: "Pending" },
];

const mockDepartments = [
  { name: "Finance", staff: 7, budget: 2500000, status: "Active" },
  { name: "Operations", staff: 20, budget: 8000000, status: "Active" },
  { name: "Marketing", staff: 10, budget: 4000000, status: "Active" },
  { name: "HR", staff: 6, budget: 2000000, status: "Active" },
  { name: "IT", staff: 8, budget: 3500000, status: "Active" },
  { name: "Sales", staff: 12, budget: 5000000, status: "Active" },
];

interface IDepartment {
  name: string;
  staff: number;
  budget: number;
  status: string;
}

// --- FIX 2: Define the props for the DepartmentOverview component ---
interface IDepartmentOverviewProps {
  departments: IDepartment[];
}

// --- FIX 3: Define the props for the RecentKpiUpdates component ---
interface IRecentKpiUpdatesProps {
  kpis: IKPI[];
}

interface ICardHeaderProps {
  title: React.ReactNode;
  showViewAll?: boolean;
}

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  PointElement,
  Filler // Register Filler
);

const initialStats: IStatsData[] = [
  {
    label: "Total Users",
    icon: "Group",
    value: 0,
    iconColour: "orange",
    change: { description: "Active & Inactive", type: "neutral", icon: "" },
  },
  {
    label: "Active KPIs",
    icon: "BullseyeTarget",
    value: 0,
    iconColour: "success",
    change: {
      description: "Across all departments",
      type: "neutral",
      icon: "",
    },
  },
  {
    label: "Audit Entries",
    icon: "Sync",
    value: 0,
    iconColour: "warning",
    change: {
      description: "Awaiting completion",
      type: "neutral",
      icon: "SkypeCircleClock",
    },
  },
  {
    label: "Departments",
    icon: "EMI",
    value: 0,
    iconColour: "info",
    change: { description: "With active KPIs", type: "neutral", icon: "" },
  },
];

const dStats: IStatsData[] = [
  {
    label: "Total Users",
    icon: "Group",
    value: 0,
    iconColour: "orange",
    change: { description: "Active & Inactive", type: "neutral", icon: "" },
  },
  {
    label: "Active KPIs",
    icon: "BullseyeTarget",
    value: 2,
    iconColour: "success",
    change: {
      description: "Across all departments",
      type: "neutral",
      icon: "",
    },
  },
  {
    label: "Audit Entries",
    icon: "Sync",
    value: 0,
    iconColour: "info",
    change: {
      description: "Awaiting completion",
      type: "neutral",
      icon: "SkypeCircleClock",
    },
  },
  {
    label: "Compliance",
    icon: "Shield",
    value: 0,
    iconColour: "warning",
    change: { description: "Overall", type: "neutral", icon: "SortUp" },
  },
];

const getProgressColor = (progress: number) => {
  if (progress < 50) return "#F97316"; // Orange
  if (progress < 90) return "#F59E0B"; // Amber
  return "#10B981"; // Green
};

localStorage.setItem("role", "admin");

const DepartmentOverview: React.FC<IDepartmentOverviewProps> = ({
  departments,
}) => (
  <div className={styles.listContainer}>
    {departments.map((dept) => (
      <div key={dept.name} className={styles.departmentItem}>
        <div className={styles.departmentInfo}>
          <div className={styles.departmentName}>{dept.name}</div>
          <div className={styles.departmentDetails}>
            {dept.staff} Staff • Budget:{" "}
            {dept.budget.toLocaleString("en-US", {
              style: "currency",
              currency: "GHS",
              minimumFractionDigits: 2,
            })}
          </div>
        </div>
        <span
          className={styles.statusTag}
          style={{ backgroundColor: "#10B981" }}
        >
          {dept.status}
        </span>
      </div>
    ))}
  </div>
);

const RecentKpiUpdates: React.FC<IRecentKpiUpdatesProps> = ({ kpis }) => (
  <div className={styles.listContainer}>
    {kpis.map((kpi) => (
      <div key={kpi.id} className={styles.kpiItem}>
        <div className={styles.kpiHeader}>
          <div className={styles.kpiTitle}>{kpi.objective}</div>
          <span
            className={styles.statusTag}
            style={{ backgroundColor: "#3B82F6" }}
          >
            ONGOING
          </span>
        </div>
        <div>
          <span className={styles.kpiDeptTag}>{kpi.department}</span>
        </div>
        <div className={styles.kpiProgress}>{kpi.progress}%</div>
        <div className={styles.progressBarBg}>
          <div
            className={styles.progressBarFg}
            style={{
              width: `${kpi.progress}%`,
              backgroundColor: getProgressColor(kpi.progress),
            }}
          />
        </div>
      </div>
    ))}
  </div>
);

const initialLineChartData = {
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  datasets: [
    {
      label: "KPIs Achieved",
      data: [],
      borderColor: "#ea5b0c",
      backgroundColor: "rgba(234, 91, 12, 0.1)",
      fill: true,
      tension: 0.4,
    },
  ],
};
const initialDoughnutChartData = {
  labels: ["Finance", "Operations", "Marketing", "HR", "IT", "Sales"],
  datasets: [
    {
      label: "Number of Staff",
      data: [15, 40, 20, 10, 18, 25],
      backgroundColor: [
        "#F97316", // Orange (Finance)
        "#10B981", // Green (Operations)
        "#3B82F6", // Blue (Marketing)
        "#F59E0B", // Amber (HR)
        "#EF4444", // Red (IT)
        "#6B7280", // Gray (Sales)
      ],
      borderColor: "#FFFFFF",
      borderWidth: 2,
    },
  ],
};

const ComplianceReports: React.FC = () => {
  // --- STATE MANAGEMENT ---
  const [statsData, setStatsData] = React.useState<IStatsData[]>(initialStats);
  const [lineChartData, setLineChartData] =
    React.useState(initialLineChartData);
  const [doughnutChartData, setDoughnutChartData] = React.useState(
    initialDoughnutChartData
  );
  const [allKpis, setAllKpis] = React.useState<IKPI[]>([]);
  const [allUsers, setAllUsers] = React.useState(mockUsers); // Assuming simple user type
  const [allAppraisals, setAllAppraisals] = React.useState(mockAppraisals);
  const [departments, setDepartments] = React.useState<IDepartment[]>([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    setAllKpis(KPIs);
    setAllUsers(mockUsers);
    setAllAppraisals(mockAppraisals);
    setDepartments(mockDepartments);
  }, []);

  React.useEffect(() => {
    const totalUsers = allUsers.length;
    const activeKpis = allKpis.filter(
      (kpi) => kpi.status === "On Track" || kpi.status === "At Risk"
    ).length;
    const pendingAppraisals = allAppraisals.filter(
      (app) => app.status === "Pending"
    ).length;
    const departments = new Set(allKpis.map((kpi) => kpi.department)).size;

    setStatsData([
      { ...initialStats[0], value: totalUsers },
      { ...initialStats[1], value: activeKpis },
      { ...initialStats[2], value: pendingAppraisals },
      { ...initialStats[3], value: departments },
    ]);
  }, [allKpis, allUsers, allAppraisals]);

  React.useEffect(() => {
    const achievedKpisByMonth = Array(12).fill(0);

    allKpis.forEach((kpi) => {
      if (kpi.status === "Achieved" && kpi.timelineEnd) {
        const month = new Date(kpi.timelineEnd).getMonth(); // 0 for Jan, 1 for Feb, etc.
        achievedKpisByMonth[month]++;
      }
    });

    const cumulativeData = achievedKpisByMonth.reduce((acc, count) => {
      const lastValue = acc.length > 0 ? acc[acc.length - 1] : 0;
      acc.push(lastValue + count);
      return acc;
    }, []);

    setLineChartData((prevData) => ({
      ...prevData,
      datasets: [{ ...prevData.datasets[0], data: cumulativeData }],
    }));

    setDoughnutChartData((prevData) => ({
      ...prevData,
      datasets: [{ ...prevData.datasets[0], data: cumulativeData }],
    }));
  }, [allKpis]);

  const CardHeader: React.FC<ICardHeaderProps> = ({
    title,
    showViewAll = false,
  }) => {
    const route = viewAllRoutes[String(title)];

    return (
      <div className={styles.cardHeader}>
        <span>{title}</span>

        {showViewAll && route && (
          <button onClick={() => navigate(route)}>View All</button>
        )}
      </div>
    );
  };

  return (
    <section>
      <h1>Compliance Reports</h1>
      <p className={`${styles.textMuted} mb3`}>
        Monitor performance management compliance and adherence.
      </p>

      <div className="stats-grid">
        {console.log("stats:", statsData)}
        {dStats.map((stat, index) => (
          <StatsCard
            key={index}
            icon={stat.icon}
            label={stat.label}
            value={stat.value}
            iconColour={stat.iconColour}
            change={stat.change}
          />
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
          gap: "1.5rem",
          marginBottom: "2rem",
        }}
      >
        <Card title="System Activity Overview">
          <div className={styles.chartContainer}>
            <Doughnut
              options={{
                responsive: true,
                maintainAspectRatio: false,
                cutout: "60%", // Controls the size of the center hole
                plugins: {
                  legend: {
                    position: "bottom" as const, // Legend at the bottom as in the image
                    labels: {
                      boxWidth: 15,
                      padding: 15,
                    },
                  },
                  title: {
                    display: false, // Title is handled by the Card component
                  },
                },
              }}
              data={doughnutChartData}
            />
          </div>
        </Card>

        <Card title="User Login Activity">
          <div className={styles.chartContainer}>
            <Line
              data={lineChartData} // Use dynamic data from state
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: true } },
              }}
            />
          </div>
        </Card>

        <Card title="Department Compliance">
          <div className={styles.chartContainer}>
            <Line
              data={lineChartData} // Use dynamic data from state
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: true } },
              }}
            />
          </div>
        </Card>

        <Card title="Performance Review Status">
          <div className={styles.chartContainer}>
            <Line
              data={lineChartData} // Use dynamic data from state
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: true } },
              }}
            />
          </div>
        </Card>

        <Card
          title={<CardHeader title="Recent System Activities" showViewAll />}
        >
          <DepartmentOverview departments={departments} />
        </Card>

        <Card title="Compliance Alerts">
          <RecentKpiUpdates kpis={allKpis.slice(0, 5)} />
        </Card>
      </div>
    </section>
  );
};

export default ComplianceReports;
