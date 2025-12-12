/**
 * PerformanceCycles Component
 *
 * ... (existing comments) ...
 */

import * as React from "react";
import { Icon } from "@fluentui/react/lib/Icon";
import performanceCyclesData from "../../../../../../shared/constant/performanceCycles";
import Card from "../../../../components/common/Card/Card";
import Button from "../../../../components/common/Button/Button";
import { IStatsData } from "../../../../../../shared/types/IStatsData";
import StatsCard from "../../../../components/common/Card/StatsCard";
import { Modal } from "../../../../components/common/Modal/Modal";
import FeedbackModal from "../../../../layout/FeedbackModal/FeedbackModal";

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

type CheckboxGroup = { [key: string]: boolean };

interface IFormData {
  cycleName: string;
  cycleType: string;
  startDate: string;
  endDate: string;
  template: string;
  departments: CheckboxGroup; // Uses the flexible type
  requirements: CheckboxGroup; // Uses the flexible type
  notifications: CheckboxGroup;
  instructions: string;
}

const initialStats: IStatsData[] = [
  {
    label: "Total Cycles",
    icon: "EventAccepted",
    value: 0,
    iconColour: "orange",
    change: { description: "All created cycles", type: "neutral", icon: "" },
  },
  {
    label: "Active Cycles",
    icon: "PlaybackRate1x",
    value: 0,
    iconColour: "success",
    change: { description: "Currently running", type: "neutral", icon: "" },
  },
  {
    label: "Active Participants",
    icon: "Group",
    value: 0,
    iconColour: "info",
    change: { description: "In all active cycles", type: "neutral", icon: "" },
  },
  {
    label: "Avg. Completion",
    icon: "CalculatorPercentage",
    value: 0,
    iconColour: "warning",
    change: { description: "Across all cycles", type: "neutral", icon: "" },
  },
];

const PerformanceCycles: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [allCycles, setAllCycles] = React.useState<IPerformanceCycle[]>([]);
  const [statsData, setStatsData] = React.useState<IStatsData[]>(initialStats);
  const [showSuccess, setShowSuccess] = React.useState(false);

  // Form State to match the image
  const [formData, setFormData] = React.useState<IFormData>({
    cycleName: "Q3 2025 performance Review",
    cycleType: "Quarterly Review",
    startDate: "2025-07-01",
    endDate: "2025-09-01",
    template: "Standard Quarterly Review",
    departments: {
      all: false,
      sales: false,
      uiux: false,
      engineering: false,
      finance: false,
      support: false,
      marketing: false,
      hr: false,
      product: false,
    },
    requirements: {
      self: true,
      manager: true,
      peer: true,
      directReport: false,
      skipLevel: false,
    },
    notifications: {
      launch: true,
      weekly: true,
      deadline: true,
      completion: true,
    },
    instructions: "",
  });

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
    // 1. Create a "fake" new ID based on length
    const newId = allCycles.length + 1;

    // 2. Create the new cycle object from your form data
    const newCycle: IPerformanceCycle = {
      id: newId,
      name: formData.cycleName,
      type: formData.cycleType,
      startDate: formData.startDate, // "2025-07-01"
      endDate: formData.endDate, // "2025-09-01"
      status: "Draft", // Default status for new items
      participants: 0, // Default
      progress: 0, // Default
    };

    // 3. Update the list of cycles
    setAllCycles([...allCycles, newCycle]);

    // 4. Close modal and Show Success Screen
    setIsModalOpen(false);
    setShowSuccess(true);
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (
    category: "departments" | "requirements" | "notifications",
    key: string
  ) => {
    setFormData((prev) => {
      // We still need a type assertion here because 'key' could theoretically
      // be a requirement key while category is 'departments'
      const currentCategory = prev[category] as Record<string, boolean>;

      return {
        ...prev,
        [category]: {
          ...currentCategory,
          [key]: !currentCategory[key as string],
        },
      };
    });
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

  const labelStyle = {
    fontWeight: 600,
    fontSize: "0.9rem",
    marginBottom: "0.5rem",
    display: "block",
    color: "#374151",
  };

  const inputStyle = {
    width: "100%",
    padding: "0.5rem",
    border: "1px solid #d1d5db",
    borderRadius: "0.375rem",
    color: "#111827",
  };

  const checkboxRowStyle = {
    marginBottom: "0.5rem",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  };

  return showSuccess ? (
    <FeedbackModal
      visible={true}
      type="success"
      title="New Cycle Created Successfully"
      message="You can find the KPI on the 'performance cycle' page."
      onClose={() => setShowSuccess(false)}
    ></FeedbackModal>
  ) : (
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
        <form id="cycleForm" style={{ padding: "0 0.5rem" }}>
          {/* Row 1: Name and Type */}
          <div className="row mb-3">
            <div className="col-md-6 mb-2">
              <label style={labelStyle}>Cycle Name</label>
              <input
                type="text"
                name="cycleName"
                value={formData.cycleName}
                onChange={handleInputChange}
                style={inputStyle}
                placeholder="e.g. Q3 2025 Performance Review"
              />
            </div>
            <div className="col-md-6 mb-2">
              <label style={labelStyle}>Cycle Type</label>
              <select
                name="cycleType"
                value={formData.cycleType}
                onChange={handleInputChange}
                style={inputStyle}
              >
                <option>Quarterly Review</option>
                <option>Annual Review</option>
                <option>Probation Review</option>
              </select>
            </div>
          </div>

          {/* Row 2: Dates */}
          <div className="row mb-3">
            <div className="col-md-6 mb-2">
              <label style={labelStyle}>Start Date</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                style={inputStyle}
              />
            </div>
            <div className="col-md-6 mb-2">
              <label style={labelStyle}>End Date</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
                style={inputStyle}
              />
            </div>
          </div>

          {/* Row 3: Departments */}
          <div className="mb-3 ">
            <label style={labelStyle}>Applicable Departments</label>
            <div className="row d-flex justify-content-between">
              {/* Col 1 */}
              <div className="col-4">
                <div style={checkboxRowStyle}>
                  <input
                    type="checkbox"
                    checked={formData.departments.all}
                    onChange={() => handleCheckboxChange("departments", "all")}
                  />
                  <span>All Departments</span>
                </div>
                <div style={checkboxRowStyle}>
                  <input
                    type="checkbox"
                    checked={formData.departments.sales}
                    onChange={() =>
                      handleCheckboxChange("departments", "sales")
                    }
                  />
                  <span>Sales</span>
                </div>
                <div style={checkboxRowStyle}>
                  <input
                    type="checkbox"
                    checked={formData.departments.uiux}
                    onChange={() => handleCheckboxChange("departments", "uiux")}
                  />
                  <span>UI/UX Design</span>
                </div>
              </div>
              {/* Col 2 */}
              <div className="col-4">
                <div style={checkboxRowStyle}>
                  <input
                    type="checkbox"
                    checked={formData.departments.engineering}
                    onChange={() =>
                      handleCheckboxChange("departments", "engineering")
                    }
                  />
                  <span>Engineering</span>
                </div>
                <div style={checkboxRowStyle}>
                  <input
                    type="checkbox"
                    checked={formData.departments.finance}
                    onChange={() =>
                      handleCheckboxChange("departments", "finance")
                    }
                  />
                  <span>Finance</span>
                </div>
                <div style={checkboxRowStyle}>
                  <input
                    type="checkbox"
                    checked={formData.departments.support}
                    onChange={() =>
                      handleCheckboxChange("departments", "support")
                    }
                  />
                  <span>Customer Support</span>
                </div>
              </div>
              {/* Col 3 */}
              <div className="col-4">
                <div style={checkboxRowStyle}>
                  <input
                    type="checkbox"
                    checked={formData.departments.marketing}
                    onChange={() =>
                      handleCheckboxChange("departments", "marketing")
                    }
                  />
                  <span>Marketing</span>
                </div>
                <div style={checkboxRowStyle}>
                  <input
                    type="checkbox"
                    checked={formData.departments.hr}
                    onChange={() => handleCheckboxChange("departments", "hr")}
                  />
                  <span>HR</span>
                </div>
                <div style={checkboxRowStyle}>
                  <input
                    type="checkbox"
                    checked={formData.departments.product}
                    onChange={() =>
                      handleCheckboxChange("departments", "product")
                    }
                  />
                  <span>Product</span>
                </div>
              </div>
            </div>
          </div>

          {/* Row 4: Template */}
          <div className="mb-3">
            <label style={labelStyle}>Review Template</label>
            <select
              name="template"
              value={formData.template}
              onChange={handleInputChange}
              style={inputStyle}
            >
              <option>Standard Quarterly Review</option>
              <option>Leadership Review</option>
              <option>Peer Only Review</option>
            </select>
          </div>

          {/* Row 5: Requirements */}
          <div className="mb-3">
            <label style={labelStyle}>Feedback Requirements</label>
            <div style={checkboxRowStyle}>
              <input
                type="checkbox"
                checked={formData.requirements.self}
                onChange={() => handleCheckboxChange("requirements", "self")}
              />
              <span>Self Assessment</span>
            </div>
            <div style={checkboxRowStyle}>
              <input
                type="checkbox"
                checked={formData.requirements.manager}
                onChange={() => handleCheckboxChange("requirements", "manager")}
              />
              <span>Manager Assessment</span>
            </div>
            <div style={checkboxRowStyle}>
              <input
                type="checkbox"
                checked={formData.requirements.peer}
                onChange={() => handleCheckboxChange("requirements", "peer")}
              />
              <span>Peer Feedback (min 3 peers)</span>
            </div>
            <div style={checkboxRowStyle}>
              <input
                type="checkbox"
                checked={formData.requirements.directReport}
                onChange={() =>
                  handleCheckboxChange("requirements", "directReport")
                }
              />
              <span>Direct Report Feedback (for managers)</span>
            </div>
            <div style={checkboxRowStyle}>
              <input
                type="checkbox"
                checked={formData.requirements.skipLevel}
                onChange={() =>
                  handleCheckboxChange("requirements", "skipLevel")
                }
              />
              <span>Skip-level Feedback</span>
            </div>
          </div>
          {/* Row 6: Notifications & Reminders */}
          <div className="mb-3">
            <label style={labelStyle}>Notifications & Reminders</label>
            <div style={checkboxRowStyle}>
              <input
                type="checkbox"
                checked={formData.notifications.launch}
                onChange={() => handleCheckboxChange("notifications", "launch")}
              />
              <span>Send launch notification</span>
            </div>
            <div style={checkboxRowStyle}>
              <input
                type="checkbox"
                checked={formData.notifications.weekly}
                onChange={() => handleCheckboxChange("notifications", "weekly")}
              />
              <span>Weekly reminders for incomplete assessments</span>
            </div>
            <div style={checkboxRowStyle}>
              <input
                type="checkbox"
                checked={formData.notifications.deadline}
                onChange={() =>
                  handleCheckboxChange("notifications", "deadline")
                }
              />
              <span>Deadline approaching reminder (3 days before)</span>
            </div>
            <div style={checkboxRowStyle}>
              <input
                type="checkbox"
                checked={formData.notifications.completion}
                onChange={() =>
                  handleCheckboxChange("notifications", "completion")
                }
              />
              <span>Completion notification to managers</span>
            </div>
            <div className={"mb-3"}>
              <label style={labelStyle}>Additional Instructions</label>
              <textarea
                name="instructions"
                value={formData.instructions}
                onChange={handleInputChange} // Uses the standard input change handler
                rows={4}
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  border: "1px solid #d1d5db",
                  borderRadius: "0.375rem",
                  color: "#111827",
                  resize: "vertical", // Allows user to resize height only
                  fontFamily: "inherit",
                }}
                placeholder="Enter any specific instructions for this review cycle..."
              />
            </div>
          </div>
        </form>
      </Modal>

      <div className="stats-grid">
        {statsData.map((stat, index) => (
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
