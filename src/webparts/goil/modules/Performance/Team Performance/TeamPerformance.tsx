/**
 * TeamPerformance Component
 *
 * Provides an overview of team-level performance metrics.
 * Users can:
 * - Filter by performance cycle and status
 * - View summary statistics for the team
 * - Monitor performance trends via a line chart
 *
 * Features:
 * - Stats cards: Team Members, Reviews Complete, Pending Reviews, Avg Team Rating
 * - Filters for performance cycle and review status
 * - Line chart showing performance score trends over months
 *
 * Chart Config:
 * - Chart.js Line chart with gradient fill
 * - Custom tooltips displaying "Performance Score"
 *
 * State / Data:
 * - Uses static `statsCards` array for stats card values (mock data)
 * - Uses static `lineChartData` for chart (mock performance trend data)
 *
 * @component
 * @returns {JSX.Element} Team Performance dashboard section
 */

import * as React from "react";
import { Icon } from "@fluentui/react/lib/Icon";
import Card from "../../../components/common/Card/Card";
import Button from "../../../components/common/Button/Button";
import { IStatsData } from "../../../../../shared/types/IStatsData";
import StatsCard from "../../../components/common/Card/StatsCard";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const statsCards: IStatsData[] = [
  {
    label: "Team Members",
    icon: "group",
    value: 0,
    iconColour: "orange",
    change: {
      description: "",
      type: "neutral",
      icon: "",
    },
  },
  {
    label: "Reviews Complete",
    icon: "CompletedSolid",
    value: 0,
    iconColour: "success",
    change: {
      description: "",
      type: "neutral",
      icon: "",
    },
  },
  {
    label: " Pending Reviews",
    icon: "SkypeCircleClock",
    value: 6,
    iconColour: "danger",
    change: {
      description: "",
      type: "neutral",
      icon: "",
    },
  },
  {
    label: "Avg Team Rating",
    icon: "FavoriteStarFill",
    value: 0,
    iconColour: "info",
    change: {
      description: "",
      type: "neutral",
      icon: "",
    },
  },
];

export const lineChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: "#fff",
      titleColor: "#333",
      bodyColor: "#666",
      borderWidth: 1,
      borderColor: "#ddd",
      cornerRadius: 8,
      padding: 12,
      callbacks: {
        title: function (context: any) {
          return context[0].label;
        },
        label: function (context: any) {
          return `Performance Score : ${context.parsed.y}`;
        },
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      max: 100,
      ticks: {
        stepSize: 25,
      },
      border: {
        display: false,
      },
    },
    x: {
      grid: {
        display: false,
      },
    },
  },
  elements: {
    line: {
      tension: 0.4,
    },
    point: {
      radius: 4,
      hoverRadius: 6,
    },
  },
};

const labels = [
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
];

export const lineChartData = {
  labels,
  datasets: [
    {
      fill: true,
      label: "Performance Score",
      data: [65, 72, 70, 80, 85, 83, 88, 92, 95, 98, 100],
      borderColor: "rgb(129, 93, 252)",
      backgroundColor: "rgba(129, 93, 252, 0.2)",
      pointBackgroundColor: "#fff",
      pointBorderColor: "rgb(129, 93, 252)",
      pointBorderWidth: 2,
    },
  ],
};

const TeamPerformance: React.FC = () => {
  return (
    <section>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h1>Team Performance </h1>
          <p className={`text-muted mb-3`}>
            Monitor and manage your team's performance reviews and development
          </p>
        </div>
      </div>

      <Card title="">
        <div className="filters">
          <div className="filter-group">
            <label htmlFor="">Performance Cycle</label>
            <select id="cycleFilter" className="form-control">
              <option value="">2025 Annual Performance Review</option>
              <option value="">2024 Annual Performance Review</option>
              <option value="">2023 Annual Performance Review</option>
            </select>
          </div>
          <div className="filter-group">
            <label htmlFor="filterDept">Status</label>
            <select id="filterDept" className="form-control">
              <option value="">All Status</option>
              <option value="">Completed</option>
              <option value="">In Progress</option>
              <option value="">Pending</option>
            </select>
          </div>

          <div className="filter-group" style={{ alignSelf: "flex-end" }}>
            <Button htmlId="applyFilters" size="sm">
              <Icon iconName="FilterSolid"></Icon>
              Filter
            </Button>
          </div>
        </div>
      </Card>

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

      <Card title="Team Performance Overview">
        <div
          className="chart-container"
          style={{ height: "350px", position: "relative" }}
        >
          <Line options={lineChartOptions} data={lineChartData} />
        </div>
      </Card>
    </section>
  );
};

export default TeamPerformance;
