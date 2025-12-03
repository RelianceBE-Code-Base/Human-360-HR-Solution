/**
 * UserManagement component renders the Department Management page.
 *
 * Features:
 * - Displays a header with page title and description.
 * - Provides an "Add" button for creating new departments.
 * - Renders a grid of statistics cards showing key department metrics.
 * - Includes two charts:
 *   - Department Budget Distribution (Bar chart)
 *   - Staff Distribution (Doughnut chart)
 * - Renders a table listing all departments with details:
 *   - Department name, head, staff count, budget, description
 *   - Edit action button for each department
 *
 * @returns {TSX.Element} The department management section with stats, charts, and table.
 */

import * as React from "react";
import { Icon } from "@fluentui/react/lib/Icon";
import Card from "../../../../components/common/Card/Card";
import Button from "../../../../components/common/Button/Button";
import { IStatsData } from "../../../../../../shared/types/IStatsData";
import StatsCard from "../../../../components/common/Card/StatsCard";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const statsCards: IStatsData[] = [
  {
    label: "Total Departments",
    icon: "group",
    value: 0,
    iconColour: "orange",
    change: {
      description: "EMI",
      type: "neutral",
      icon: "",
    },
  },
  {
    label: "Total Staff",
    icon: "group",
    value: 0,
    iconColour: "success",
    change: {
      description: "",
      type: "neutral",
      icon: "",
    },
  },
  {
    label: " Total Budget",
    icon: "PaymentCard",
    value: 6,
    iconColour: "danger",
    change: {
      description: "",
      type: "neutral",
      icon: "",
    },
  },
  {
    label: "Avg Staff/Dept",
    icon: "BarChartHorizontal",
    value: 0,
    iconColour: "info",
    change: {
      description: "",
      type: "neutral",
      icon: "",
    },
  },
];

const barChartData = {
  labels: ["Finance", "Operations", "Marketing", "HR", "IT", "Sales"],
  datasets: [
    {
      label: "Budget",
      // Data from the table in the image
      data: [2500000, 8000000, 4000000, 2000000, 3500000, 5000000],
      backgroundColor: "#F47B20", // Orange color from the chart
      borderRadius: 5,
      barThickness: 60,
    },
  ],
};

const barChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top" as const,
      align: "end" as const,
      labels: {
        boxWidth: 15,
        usePointStyle: true,
        pointStyle: "rect",
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        // Format y-axis labels for readability
        callback: function (value: string | number) {
          if (typeof value === "number") {
            return value / 1000000 + "M"; // e.g., 2M, 4M
          }
          return value;
        },
      },
    },
    x: {
      grid: {
        display: false, // Hide vertical grid lines
      },
    },
  },
};

// --- Data for Staff Distribution Doughnut Chart ---
const doughnutChartData = {
  labels: ["Finance", "Operations", "Marketing", "HR", "IT", "Sales"],
  datasets: [
    {
      label: "Staff Count",
      // Data from the table in the image
      data: [7, 20, 10, 6, 8, 12],
      backgroundColor: [
        "#F47B20", // Finance (Orange)
        "#00A79D", // Operations (Teal)
        "#3498DB", // Marketing (Blue)
        "#FDC702", // HR (Yellow)
        "#E74C3C", // IT (Red)
        "#566573", // Sales (Gray)
      ],
      borderColor: "#FFFFFF",
      borderWidth: 2,
    },
  ],
};

const doughnutChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom" as const,
      labels: {
        usePointStyle: true,
        pointStyle: "rect",
        padding: 20,
      },
    },
  },
  cutout: "50%",
};

// --- Data for the All Departments table ---
const departmentsData = [
  {
    department: "Finance",
    head: "Akosua Osei",
    staffCount: 7,
    budget: "GHS 2,500,000.00",
    description: "Finance and Accounting",
  },
  {
    department: "Operations",
    head: "Kojo Adjei",
    staffCount: 20,
    budget: "GHS 8,000,000.00",
    description: "Operations and Logistics",
  },
  {
    department: "Marketing",
    head: "Kofi Antwi",
    staffCount: 10,
    budget: "GHS 4,000,000.00",
    description: "Marketing and Communications",
  },
  {
    department: "HR",
    head: "Akua Frimpong",
    staffCount: 6,
    budget: "GHS 2,000,000.00",
    description: "Human Resources Management",
  },
  {
    department: "IT",
    head: "Yaw Boateng",
    staffCount: 8,
    budget: "GHS 3,500,000.00",
    description: "Information Technology Services",
  },
  {
    department: "Sales",
    head: "Kwame Asante",
    staffCount: 12,
    budget: "GHS 5,000,000.00",
    description: "Sales and Business Development",
  },
];

const UserManagement: React.FC = () => {
  return (
    <section>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h1>Department Management </h1>
          <p className={`text-muted mb-3`}>
            Manage organizational departments and their performance
          </p>
        </div>

        <Button>
          <Icon iconName="add" />
          {/* Add User */}
          Add
        </Button>
      </div>

      <div className="stats-grid">
        {statsCards.map((stat, index) => {
          return (
            <StatsCard
              key={index}
              icon={stat.icon}
              label={stat.label}
              value={stat.value}
              iconColour={stat.iconColour}
              change={stat.change}
            />
          );
        })}
      </div>

      <div className="row">
        <div className="col-lg-6 mb-4">
          <Card title="Department Budget Distribution">
            <div className="chart-container" style={{ height: "300px" }}>
              <Bar options={barChartOptions} data={barChartData} />
            </div>
          </Card>
        </div>
        <div className="col-lg-6 mb-4">
          <Card title="Staff Distribution">
            <div className="chart-container" style={{ height: "300px" }}>
              <Doughnut
                options={doughnutChartOptions}
                data={doughnutChartData}
              />
            </div>
          </Card>
        </div>
      </div>

      <Card title="All Departments">
        <div className="table-responsive">
          <table className="table table-hover">
            <thead style={{ backgroundColor: "#f8f9fa" }}>
              <tr>
                <th scope="col">DEPARTMENT</th>
                <th scope="col">HEAD</th>
                <th scope="col">STAFF COUNT</th>
                <th scope="col">BUDGET</th>
                <th scope="col">DESCRIPTION</th>
                <th scope="col">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {departmentsData.map((dept, index) => (
                <tr key={index}>
                  <td>
                    <strong>{dept.department}</strong>
                  </td>
                  <td>{dept.head}</td>
                  <td>{dept.staffCount}</td>
                  <td>{dept.budget}</td>
                  <td>{dept.description}</td>
                  <td>
                    <Button variant="secondary" size="sm">
                      <Icon iconName="Edit" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </section>
  );
};

export default UserManagement;
