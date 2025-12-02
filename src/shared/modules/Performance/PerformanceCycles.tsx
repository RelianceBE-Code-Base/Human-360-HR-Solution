import * as React from "react";
import { Icon } from "@fluentui/react/lib/Icon";
// import styles from "./PerformanceCycles.module.scss
import Card from "../../common/Card/Card";
import performanceCyclesData from "../../constant/performanceCycles";
import Button from "../../common/Button/Button";
import { IStatsData } from "../../types/IStatsData";
import StatsCard from "../../common/Card/StatsCard";
import { Modal } from "../../common/Modal/Modal";

interface IPerformanceCycle {
  id: number;
  name: string;
  type: string;
  startDate: string;
  endDate: string;
  status: string;
  participants: number;
  progress: number;
}

// --- MODIFIED SECTION: 'change' property has been added back ---
// The initial structure for the stats cards now includes the static 'change' property.
const initialStats: IStatsData[] = [
  {
    label: "Total Cycles",
    icon: "EventAccepted",
    value: 0,
    iconColour: "orange",
    change: {
      description: "All created cycles",
      type: "neutral",
      icon: "",
    },
  },
  {
    label: "Active Cycles",
    icon: "PlaybackRate1x",
    value: 0,
    iconColour: "success",
    change: {
      description: "Currently running",
      type: "neutral",
      icon: "",
    },
  },
  {
    label: "Active Participants",
    icon: "Group",
    value: 0,
    iconColour: "info",
    change: {
      description: "In all active cycles",
      type: "neutral",
      icon: "",
    },
  },
  {
    label: "Avg. Completion",
    icon: "CalculatorPercentage",
    value: 0,
    iconColour: "warning",
    change: {
      description: "Across all cycles",
      type: "neutral",
      icon: "",
    },
  },
];

const PerformanceCycles: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [allCycles, setAllCycles] = React.useState<IPerformanceCycle[]>([]);
  const [statsData, setStatsData] = React.useState<IStatsData[]>(initialStats);

  React.useEffect(() => {
    setAllCycles(performanceCyclesData);
  }, []);

  React.useEffect(() => {
    if (allCycles.length > 0) {
      const totalCycles = allCycles.length;
      const activeCycles = allCycles.filter(
        (cycle) => cycle.status === "Active"
      );
      const activeCycleCount = activeCycles.length;
      const activeParticipants = activeCycles.reduce(
        (sum, cycle) => sum + cycle.participants,
        0
      );
      const totalProgress = allCycles.reduce(
        (sum, cycle) => sum + cycle.progress,
        0
      );
      const averageCompletion =
        totalCycles > 0 ? Math.round(totalProgress / totalCycles) : 0;

      // The spread syntax preserves the 'change' object from initialStats
      setStatsData([
        { ...initialStats[0], value: totalCycles },
        { ...initialStats[1], value: activeCycleCount },
        { ...initialStats[2], value: activeParticipants },
        { ...initialStats[3], value: averageCompletion },
      ]);
    } else {
      setStatsData(initialStats);
    }
  }, [allCycles]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSaveChanges = () => {
    console.log("Changes saved!");
    closeModal();
  };

  const getStatusColor = (status: string): string => {
    switch (status.toLowerCase()) {
      case "active":
        return "#3b82f6";
      case "completed":
        return "#10b981";
      case "draft":
        return "#f59e0b";
      default:
        return "#6b7280";
    }
  };

  return (
    <section>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h1>Performance Cycles</h1>
          <p className="text-muted mb-3">
            Manage performance review cycles and periods
          </p>
        </div>
        <Button onClick={openModal}>
          <Icon iconName="add" />
          Create New Cycle
        </Button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Create New Performance Cycle"
        footer={
          <>
            <Button onClick={closeModal} variant="secondary">
              <Icon iconName="Cancel" />
              Cancel
            </Button>
            <Button onClick={handleSaveChanges}>
              <Icon iconName="Accept" />
              Confirm
            </Button>
          </>
        }
      >
        Comming soon ...
        <form id="cycleForm">{/* ... form content ... */}</form>
      </Modal>

      <div className="stats-grid">
        {/* --- MODIFIED SECTION: 'change' prop is now passed to StatsCard --- */}
        {statsData.map((stat, index) => (
          <StatsCard
            key={index}
            icon={stat.icon}
            label={stat.label}
            value={stat.value}
            iconColour={stat.iconColour}
            change={stat.change} // The change object is now passed to the component
            // suffix={stat.suffix}
          />
        ))}
      </div>

      <Card title="All Performance Cycles">
        <div className="chart-container">
          <table className="table">
            <thead>
              <tr>
                <th>Cycle Name</th>
                <th>Type</th>
                <th>Period</th>
                <th>Status</th>
                <th>Participants</th>
                <th>Completion</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {allCycles.map((cycle) => (
                <tr key={cycle.id}>
                  <td>
                    <div style={{ color: "#111827", fontWeight: 500 }}>
                      {cycle.name}
                    </div>
                  </td>
                  <td>{cycle.type}</td>
                  <td>{`${cycle.startDate} - ${cycle.endDate}`}</td>
                  <td>
                    <span
                      className="statusTag"
                      style={{ backgroundColor: getStatusColor(cycle.status) }}
                    >
                      {cycle.status}
                    </span>
                  </td>
                  <td>{`${cycle.participants} People`}</td>
                  <td>{`${cycle.progress}%`}</td>
                  <td className="actions">
                    <Icon iconName="SingleColumnEdit" className="editIcon" />
                    <Icon iconName="Delete" className="deleteIcon" />
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

export default PerformanceCycles;
