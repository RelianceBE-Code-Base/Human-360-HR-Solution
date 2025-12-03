/**
 * Dashboard Component
 *
 * Provides a comprehensive view of organizational KPIs, performance metrics,
 * and budget utilization across departments. It includes interactive filters,
 * summary statistics cards, and multiple charts visualizing KPI status,
 * budget utilization, average progress, and department performance.
 *
 * Features:
 * - Filters for Department and Year with Clear button.
 * - Summary StatsCards showing Total KPIs, Achieved, Ongoing, and At Risk counts.
 * - Doughnut chart displaying KPI status distribution.
 * - Horizontal bar charts for:
 *   - Budget utilization by department
 *   - Average KPI progress by department
 * - Multi-dataset bar chart summarizing department performance metrics:
 *   Delivery, Efficiency, Quality, Satisfaction
 * - Dynamic calculation of stats and charts based on active filters.
 *
 * Dependencies:
 * - React and React hooks (useState, useEffect, useMemo)
 * - Chart.js for rendering charts (Doughnut, Bar)
 * - Fluent UI Icon component
 * - StatsCard, Card, Button UI components
 * - Predefined mock data for budget and department performance
 *
 * @component
 * @returns {TSX.Element} The KPI Dashboard UI
 */

import * as React from "react";
import StatsCard from "../../../components/common/Card/StatsCard";
import { IStatsData } from "../../../../../shared/types/IStatsData";
import Card from "../../../components/common/Card/Card";
import Button from "../../../components/common/Button/Button";
import { Icon } from "@fluentui/react/lib/Icon";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  ArcElement,
  ChartData,
} from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";
import KPIs from "../../../../../shared/constant/kpis";
import { IKPI } from "../../../../../shared/types/IKPI";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

// --- MOCK DATA ---
const departmentBudgets: {
  [key: string]: { total: number; utilized: number };
} = {
  Marketing: { total: 4000000, utilized: 3800000 }, // 95%
  Finance: { total: 2500000, utilized: 2200000 }, // 88%
  Operations: { total: 8000000, utilized: 7800000 }, // 97.5%
  IT: { total: 3500000, utilized: 2500000 }, // 71.4%
  HR: { total: 2000000, utilized: 1900000 }, // 95%
  Sales: { total: 5000000, utilized: 4600000 }, // 92%
};

const departmentPerformance: {
  [key: string]: {
    delivery: number;
    efficiency: number;
    quality: number;
    satisfaction: number;
  };
} = {
  Marketing: { delivery: 85, efficiency: 90, quality: 88, satisfaction: 92 },
  Finance: { delivery: 95, efficiency: 92, quality: 94, satisfaction: 90 },
  Operations: { delivery: 82, efficiency: 85, quality: 88, satisfaction: 80 },
  IT: { delivery: 90, efficiency: 88, quality: 92, satisfaction: 85 },
  HR: { delivery: 88, efficiency: 84, quality: 90, satisfaction: 89 },
  Sales: { delivery: 93, efficiency: 91, quality: 95, satisfaction: 94 },
};

// --- INITIAL STATE & OPTIONS ---
const initialFilters = { department: "All Departments", year: "All Years" };

const initialStats: IStatsData[] = [
  {
    label: "Total KPIs",
    icon: "BulletedList2",
    value: 0,
    iconColour: "orange",
    change: { description: "All Departments", type: "neutral", icon: "" },
  },
  {
    label: "Achieved",
    icon: "Trophy2Solid",
    value: 0,
    iconColour: "success",
    change: {
      description: "Across all departments",
      type: "positive",
      icon: "",
    },
  },
  {
    label: "Ongoing",
    icon: "ProgressRingDots",
    value: 0,
    iconColour: "info",
    change: {
      description: "Awaiting completion",
      type: "neutral",
      icon: "SkypeCircleClock",
    },
  },
  {
    label: "At Risk",
    icon: "IncidentTriangle",
    value: 0,
    iconColour: "danger",
    change: { description: "All active", type: "negative", icon: "" },
  },
];

const initialDoughnutChartData = {
  labels: ["Achieved", "Ongoing", "At Risk"],
  datasets: [
    {
      label: "KPI Status",
      data: [0, 0, 0],
      backgroundColor: ["#10b981", "#3b82f6", "#ef4444"],
      borderColor: ["#ffffff", "#ffffff", "#ffffff"],
      borderWidth: 2,
    },
  ],
};

const doughnutChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "right" as const,
      labels: { boxWidth: 20, padding: 20 },
    },
    title: { display: false },
  },
  cutout: "60%",
};

const budgetBarOptions = {
  indexAxis: "y" as const,
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  scales: {
    x: {
      beginAtZero: true,
      max: 100,
      ticks: {
        callback: (value: number) => `${value}%`,
      },
    },
  },
};

const avgProgressBarOptions = {
  indexAxis: "y" as const,
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false }, title: { display: false } },
  scales: {
    x: {
      beginAtZero: true,
      max: 100,
      ticks: { callback: (value: number) => `${value}%` },
    },
  },
};

const multiDatasetBarOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { position: "top" as const }, title: { display: false } },
  scales: { y: { beginAtZero: true, max: 100 } },
};

const Dashboard: React.FC = () => {
  const [allKpis, setAllKpis] = React.useState<IKPI[]>([]);
  const [filteredKpis, setFilteredKpis] = React.useState<IKPI[]>([]);
  const [filters, setFilters] = React.useState(initialFilters);
  const [statsData, setStatsData] = React.useState<IStatsData[]>(initialStats);
  const [doughnutChartData, setDoughnutChartData] = React.useState(
    initialDoughnutChartData
  );

  const [budgetUtilChartData, setBudgetUtilChartData] = React.useState<
    ChartData<"bar">
  >({ labels: [], datasets: [] });
  const [avgProgressChartData, setAvgProgressChartData] = React.useState<
    ChartData<"bar">
  >({ labels: [], datasets: [] });
  const [performanceSummaryChartData, setPerformanceSummaryChartData] =
    React.useState<ChartData<"bar">>({ labels: [], datasets: [] });

  React.useEffect(() => {
    setAllKpis(KPIs);
  }, []);

  React.useEffect(() => {
    let tempKpis = [...allKpis];
    if (filters.department !== "All Departments") {
      tempKpis = tempKpis.filter(
        (kpi) => kpi.department === filters.department
      );
    }
    if (filters.year !== "All Years") {
      tempKpis = tempKpis.filter(
        (kpi) =>
          kpi.timelineStart &&
          new Date(kpi.timelineStart).getFullYear().toString() === filters.year
      );
    }
    setFilteredKpis(tempKpis);
  }, [allKpis, filters]);

  React.useEffect(() => {
    // Stats and Doughnut Chart calculation (unchanged)
    const total = filteredKpis.length;
    const achieved = filteredKpis.filter((k) => k.status === "Achieved").length;
    const atRisk = filteredKpis.filter((k) => k.status === "At Risk").length;
    const onTrack = filteredKpis.filter((k) => k.status === "Ongoing").length;
    setStatsData([
      { ...initialStats[0], value: total },
      { ...initialStats[1], value: achieved },
      { ...initialStats[2], value: onTrack },
      { ...initialStats[3], value: atRisk },
    ]);
    setDoughnutChartData((prev) => ({
      ...prev,
      datasets: [{ ...prev.datasets[0], data: [achieved, onTrack, atRisk] }],
    }));

    // Bar charts calculation
    const activeDepartments = Array.from(
      new Set(filteredKpis.map((kpi) => kpi.department))
    ).sort();
    if (activeDepartments.length === 0) {
      setBudgetUtilChartData({ labels: [], datasets: [] });
      setAvgProgressChartData({ labels: [], datasets: [] });
      setPerformanceSummaryChartData({ labels: [], datasets: [] });
      return;
    }

    const budgetData = activeDepartments.map((dept) => {
      const budget = departmentBudgets[dept] || { total: 0, utilized: 0 };
      return budget.total > 0
        ? Math.round((budget.utilized / budget.total) * 100)
        : 0;
    });
    const budgetColors = budgetData.map((val) => {
      if (val >= 90) return "#10b981";
      if (val >= 80) return "#3b82f6";
      return "#f59e0b";
    });
    setBudgetUtilChartData({
      labels: activeDepartments,
      datasets: [
        {
          label: "Budget Utilization",
          data: budgetData,
          backgroundColor: budgetColors,
          borderRadius: 4,
        },
      ],
    });

    const progressData = activeDepartments.map((dept) => {
      const deptKpis = filteredKpis.filter((kpi) => kpi.department === dept);
      if (deptKpis.length === 0) return 0;
      return Math.round(
        deptKpis.reduce((sum, kpi) => sum + kpi.progress, 0) / deptKpis.length
      );
    });

    const progressColors = progressData.map((val) => {
      if (val >= 90) return "#10b981"; // Green for >= 90% (Excellent)
      if (val >= 75) return "#3b82f6"; // Blue for 75-89% (On Track)
      return "#ef4444"; // Red for < 75% (At Risk)
    });

    setAvgProgressChartData({
      labels: activeDepartments,
      datasets: [
        {
          label: "Average Progress",
          data: progressData,
          backgroundColor: progressColors,
          borderRadius: 4,
        },
      ],
    });
    setPerformanceSummaryChartData({
      labels: activeDepartments,
      datasets: [
        {
          label: "Delivery",
          data: activeDepartments.map(
            (d) => departmentPerformance[d]?.delivery || 0
          ),
          backgroundColor: "#8B5CF6",
        },
        {
          label: "Efficiency",
          data: activeDepartments.map(
            (d) => departmentPerformance[d]?.efficiency || 0
          ),
          backgroundColor: "#3B82F6",
        },
        {
          label: "Quality",
          data: activeDepartments.map(
            (d) => departmentPerformance[d]?.quality || 0
          ),
          backgroundColor: "#10B981",
        },
        {
          label: "Satisfaction",
          data: activeDepartments.map(
            (d) => departmentPerformance[d]?.satisfaction || 0
          ),
          backgroundColor: "#F59E0B",
        },
      ],
    });
  }, [filteredKpis]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const handleClearFilters = () => setFilters(initialFilters);

  const uniqueDepartments = React.useMemo(
    () => Array.from(new Set(allKpis.map((kpi) => kpi.department))).sort(),
    [allKpis]
  );
  const uniqueYears = React.useMemo(
    () =>
      Array.from(
        new Set(
          allKpis
            .map((kpi) =>
              kpi.timelineStart
                ? new Date(kpi.timelineStart).getFullYear()
                : NaN
            )
            .filter((y) => !isNaN(y))
        )
      ).sort((a, b) => b - a),
    [allKpis]
  );

  return (
    <section>
      <h1>KPI Dashboard</h1>
      <p className="text-muted mb-3">
        Comprehensive view of organizational KPIs and performance metrics
      </p>

      <Card title="Filters">
        <div className="filters">
          <div className="filter-group">
            <label htmlFor="filterDept">Department</label>
            <select
              id="filterDept"
              name="department"
              className="form-control"
              value={filters.department}
              onChange={handleFilterChange}
            >
              <option>All Departments</option>
              {uniqueDepartments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label htmlFor="filterYear">Year</label>
            <select
              id="filterYear"
              name="year"
              className="form-control"
              value={filters.year}
              onChange={handleFilterChange}
            >
              <option>All Years</option>
              {uniqueYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <div className="filter-group" style={{ alignSelf: "flex-end" }}>
            <Button size="sm" variant="secondary" onClick={handleClearFilters}>
              <Icon iconName="Clear" /> Clear Filters
            </Button>
          </div>
        </div>
      </Card>

      <div className="stats-grid">
        {statsData.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      <div className="charts-grid">
        <Card title="KPI Status Distribution">
          <div className="chart-container">
            <Doughnut data={doughnutChartData} options={doughnutChartOptions} />
          </div>
        </Card>

        <Card title="Budget Utilization by Department">
          <div className="chart-container">
            <Bar data={budgetUtilChartData} options={budgetBarOptions} />
          </div>
          <div className="custom-legend">
            <span>
              <i
                className="legend-dot"
                style={{ backgroundColor: "#10b981" }}
              ></i>{" "}
              ≥90% Utilized
            </span>
            <span>
              <i
                className="legend-dot"
                style={{ backgroundColor: "#3b82f6" }}
              ></i>{" "}
              80-89% Utilized
            </span>
            <span>
              <i
                className={"legend-dot"}
                style={{ backgroundColor: "#f59e0b" }}
              ></i>{" "}
              &lt;80% Utilized
            </span>
          </div>
        </Card>

        <Card title="Average Progress by Department (%)">
          <div className="chart-container">
            <Bar data={avgProgressChartData} options={avgProgressBarOptions} />
          </div>
          <div className="custom-legend">
            <span>
              <i
                className="legend-dot"
                style={{ backgroundColor: "#10b981" }}
              ></i>{" "}
              ≥90% Progress
            </span>
            <span>
              <i
                className="legend-dot"
                style={{ backgroundColor: "#3b82f6" }}
              ></i>{" "}
              75-89% Progress
            </span>
            <span>
              <i
                className={"legend-dot"}
                style={{ backgroundColor: "#ef4444" }}
              ></i>{" "}
              &lt;75% Progress
            </span>
          </div>
        </Card>
        <Card title="Department Performance Summary">
          <div className="chart-container">
            <Bar
              data={performanceSummaryChartData}
              options={multiDatasetBarOptions}
            />
          </div>
        </Card>
      </div>
    </section>
  );
};

export default Dashboard;
