import * as React from "react";
// import { Icon } from "@fluentui/react/lib/Icon";
import Card from "../../../components/common/Card/Card";
import StatsCard from "../../../components/common/Card/StatsCard"; // Adjust import path
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// --- Chart Data (Same as before) ---
const deptDistData: ChartData<"bar"> = {
  labels: ["Sales", "Marketing", "IT", "HR", "Finance"],
  datasets: [
    {
      label: "KPIs",
      data: [12, 19, 8, 15, 10],
      backgroundColor: "#ea580c",
      borderRadius: 4,
      barThickness: 30,
    },
  ],
};

const deptDistOptions: ChartOptions<"bar"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: {
    y: { beginAtZero: true, grid: { color: "#f3f4f6" }, ticks: { stepSize: 5 } },
    x: { grid: { display: false } },
  },
};

const statusData: ChartData<"doughnut"> = {
  labels: ["Completed", "On Track", "At Risk", "Behind"],
  datasets: [
    {
      data: [35, 45, 15, 5],
      backgroundColor: ["#10b981", "#3b82f6", "#f59e0b", "#ef4444"],
      borderWidth: 0,
      hoverOffset: 4,
    },
  ],
};

const statusOptions: ChartOptions<"doughnut"> = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: "70%",
  plugins: {
    legend: { position: "right", labels: { usePointStyle: true, boxWidth: 8 } },
  },
};

const BDEDashboard: React.FC = () => {
  return (
    <section>
      <div className="mb-3">
        <h1>Business Development Executive Dashboard</h1>
        <p className="text-muted">Review and approve organizational KPIs.</p>
      </div>

      <div className="stats-grid mb-3">
        {/* Card 1 */}
        <StatsCard
          label="PENDING APPROVALS"
          value={0}
          icon="HourGlass"
          iconColour="orange"
          change={{
            type: "neutral",
            description: "Awaiting your review",
            icon: "Clock",
          }}
        />

        {/* Card 2 */}
        <StatsCard
          label="APPROVED KPIS"
          value={0}
          icon="CheckboxComposite"
          iconColour="success"
          change={{
            type: "positive",
            description: "This month",
            icon: "CheckMark",
          }}
        />

        {/* Card 3 - Using 'info' for dark/neutral look */}
        <StatsCard
          label="ACTIVE KPIS"
          value={0}
          icon="BullseyeTarget"
          iconColour="info" 
          change={{
            type: "neutral",
            description: "Across organization",
            icon: "Globe",
          }}
        />

        {/* Card 4 */}
        <StatsCard
          label="AVERAGE PROGRESS"
          value={0} // Interface requires number. Update Component if you need "0%"
          icon="LineChart"
          iconColour="info"
          change={{
            type: "positive",
            description: "Organization-wide",
            icon: "TrendingUp",
          }}
        />
      </div>

      <div className="stats-grid">
        <Card title="Department KPI Distribution">
          <div className="chart-container" style={{ height: "300px" }}>
            <Bar data={deptDistData} options={deptDistOptions} />
          </div>
        </Card>

        <Card title="Overall KPI Status">
          <div className="chart-container" style={{ height: "300px" }}>
            <Doughnut data={statusData} options={statusOptions} />
          </div>
        </Card>
      </div>
    </section>
  );
};

export default BDEDashboard;