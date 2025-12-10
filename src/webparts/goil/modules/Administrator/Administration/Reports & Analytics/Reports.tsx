import * as React from "react";
import { Icon } from "@fluentui/react/lib/Icon";
import Card from "../../../../components/common/Card/Card";
import Button from "../../../../components/common/Button/Button";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  RadialLinearScale,
  Filler,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { Bar, Line, Radar } from "react-chartjs-2";
// import styles from "./Reports.module.scss";

// Register all necessary components for Bar, Line, and Radar charts
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  RadialLinearScale,
  Filler,
  Tooltip,
  Legend
);

const initialReportFilters = {
  reportType: "kpi_progress",
  department: "all",
  period: "2025",
};

// --- Chart Configurations ---

// 1. Performance Distribution (Vertical Bar)
const distData = {
  labels: ["3.0-3.5", "3.5-4.0", "4.0-4.5", "4.5-5.0"],
  datasets: [
    {
      label: "Employees",
      data: [10, 22, 45, 25],
      backgroundColor: ["#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b"],
      borderRadius: 4,
    },
  ],
};

const distOptions: ChartOptions<"bar"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: {
    y: { beginAtZero: true, max: 60 },
    x: { grid: { display: false } },
  },
};

// 2. Performance Trends (Line)
const trendData = {
  labels: ["Q1 2024", "Q2 2024", "Q3 2024", "Q4 2024"],
  datasets: [
    {
      label: "Average Score",
      data: [3.8, 3.9, 4.0, 4.3],
      borderColor: "#3b82f6",
      backgroundColor: "#3b82f6",
      tension: 0.4, // smooth curve
      pointRadius: 4,
    },
  ],
};

const trendOptions: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: {
    y: { min: 3.5, max: 4.5 },
  },
};

// 3. Department Comparison (Horizontal Bar)
const deptData = {
  labels: ["Engineering", "Sales", "Marketing", "Operations", "HR"],
  datasets: [
    {
      label: "Avg Performance",
      data: [4.3, 4.1, 3.9, 4.0, 4.2],
      backgroundColor: ["#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981"],
      borderRadius: 4,
    },
  ],
};

const deptOptions: ChartOptions<"bar"> = {
  indexAxis: "y" as const, // Makes it horizontal
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: {
    x: { max: 5 },
  },
};

// 4. Competency Breakdown (Radar) - The requested pink chart
const radarData = {
  labels: [
    "Technical Skills",
    "Teamwork",
    "Communication",
    "Problem Solving",
    "Innovation",
  ],
  datasets: [
    {
      label: "Score",
      data: [4.5, 3.8, 3.0, 3.5, 4.0],
      fill: true,
      backgroundColor: "rgba(236, 72, 153, 0.5)", // Pink fill
      borderColor: "rgb(236, 72, 153)", // Pink border
      pointBackgroundColor: "rgb(236, 72, 153)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgb(236, 72, 153)",
    },
  ],
};

const radarOptions: ChartOptions<"radar"> = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    r: {
      angleLines: { display: true },
      suggestedMin: 0,
      suggestedMax: 5,
      ticks: { backdropColor: "transparent" }, // cleaner look
    },
  },
  plugins: {
    legend: { display: false },
  },
};

const Report: React.FC = () => {
  const [reportFilters, setReportFilters] =
    React.useState(initialReportFilters);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setReportFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleGenerateReport = () => {
    console.log("Generating report with filters:", reportFilters);
  };

  return (
    <section>
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h1>Reports & Analytics</h1>
          <p className="text-muted mb-3">
            Comprehensive reporting and data analytics
          </p>
        </div>

        <div className="d-flex gap-2">
          <Button variant="secondary">
            <Icon iconName="Print" /> Print
          </Button>
          <Button variant="success">
            <Icon iconName="ExcelDocument" /> Export Excel
          </Button>
          <Button variant="danger">
            <Icon iconName="PDF" /> Export PDF
          </Button>
        </div>
      </div>

      {/* Filter Section */}
      <Card title="">
        <div className="filters d-flex gap-3 align-items-end flex-wrap">
          <div className="filter-group flex-grow-1">
            <label htmlFor="reportType" className="form-label fw-bold">
              Report Type
            </label>
            <select
              id="reportType"
              name="reportType"
              className="form-control"
              value={reportFilters.reportType}
              onChange={handleFilterChange}
            >
              <option value="kpi_progress">KPI Progress Report</option>
              <option value="performance_review">
                Performance Review Summary
              </option>
              <option value="user_activity">User Activity Log</option>
            </select>
          </div>
          <div className="filter-group">
            <label htmlFor="department" className="form-label fw-bold">
              Department
            </label>
            <select
              id="department"
              name="department"
              className="form-control"
              value={reportFilters.department}
              onChange={handleFilterChange}
            >
              <option value="all">All Departments</option>
              <option value="finance">Finance</option>
              <option value="hr">Human Resources</option>
              <option value="it">IT</option>
              <option value="sales">Sales & Marketing</option>
            </select>
          </div>
          <div className="filter-group">
            <label htmlFor="period" className="form-label fw-bold">
              Period
            </label>
            <select
              id="period"
              name="period"
              className="form-control"
              value={reportFilters.period}
              onChange={handleFilterChange}
            >
              <option value="2025">2025</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
            </select>
          </div>
          <div className="filter-group">
            <Button onClick={handleGenerateReport} variant="primary">
              <Icon iconName="ReportDocument" /> Generate Report
            </Button>
          </div>
        </div>
      </Card>

      <div className="mt-4">
        <h5 className="text-muted mb-3">
          Q4 2024 Employee Performance Analysis
        </h5>

        {/* Top Row: Distribution & Trends */}
        <div className="row g-3 mb-3">
          <div className="col-md-6">
            <Card title="Performance Distribution">
              <div style={{ height: "250px" }}>
                <Bar data={distData} options={distOptions} />
              </div>
              <small className="text-muted mt-2 d-block text-center">
                Most employees (45%) are rated between 4.0-4.5
              </small>
            </Card>
          </div>
          <div className="col-md-6">
            <Card title="Performance Trends">
              <div style={{ height: "250px" }}>
                <Line data={trendData} options={trendOptions} />
              </div>
              <small className="text-muted mt-2 d-block text-center">
                Average performance has increased by 0.3 points since last
                quarter
              </small>
            </Card>
          </div>
        </div>

        {/* Bottom Row: Dept Comparison & Radar */}
        <div className="row g-3">
          <div className="col-md-6">
            <Card title="Department Comparison">
              <div style={{ height: "300px" }}>
                <Bar data={deptData} options={deptOptions} />
              </div>
              <small className="text-muted mt-2 d-block text-center">
                Engineering department shows highest average performance (4.3)
              </small>
            </Card>
          </div>
          <div className="col-md-6">
            <Card title="Competency Breakdown">
              <div
                style={{
                  height: "300px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Radar data={radarData} options={radarOptions} />
              </div>
              <small className="text-muted mt-2 d-block text-center">
                Technical Skills and Teamwork are the highest-rated competencies
              </small>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Report;
