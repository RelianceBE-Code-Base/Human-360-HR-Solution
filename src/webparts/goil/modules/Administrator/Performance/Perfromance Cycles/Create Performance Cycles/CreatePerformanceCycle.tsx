import * as React from "react";
import { Icon } from "@fluentui/react/lib/Icon";
import styles from "./CreatePerformanceCycle.module.scss";
import Card from "../../../../../components/common/Card/Card";
import Button from "../../../../../components/common/Button/Button";
import { classNames } from "../../../../../../../shared/utils/classnames";
import { useNavigate } from "react-router-dom";
import FeedbackModal from "../../../../../layout/FeedbackModal/FeedbackModal";

const BasicInfoTab = () => (
  <div className={"tab-content active"}>
    {/* Row 1 */}
    <div className={styles.gridTwo}>
      <div className={styles.formGroup}>
        <label htmlFor="cycleName">
          Cycle Name <span className="text-danger">*</span>
        </label>
        <input
          id="cycleName"
          className={styles.formControl}
          type="text"
          required
          placeholder="Q3 2025 Performance Review"
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="cycleType">
          Cycle Type <span className="text-danger">*</span>
        </label>
        <select id="cycleType" className={styles.formControl} required>
          <option value="Quarterly Review">Quarterly Review</option>
          <option value="Annual Review">Annual Review</option>
        </select>
      </div>
    </div>

    {/* Row 2 */}
    <div className={styles.gridTwo}>
      <div className={styles.formGroup}>
        <label htmlFor="startDate">
          Start Date <span className="text-danger">*</span>
        </label>
        <input
          id="startDate"
          type="date"
          className={styles.formControl}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="endDate">
          End Date <span className="text-danger">*</span>
        </label>
        <input
          id="endDate"
          type="date"
          className={styles.formControl}
          required
        />
      </div>
    </div>

    <div className={styles.formGroup}>
      <label>Applicable Departments</label>
      <div className={styles.gridThree}>
        {[
          "All Departments",
          "Engineering",
          "Marketing",
          "Sales",
          "Finance",
          "HR",
          "UI/UX Design",
          "Customer Support",
          "Product",
        ].map((dept) => (
          <label key={dept} className={styles.checkboxLabel}>
            <input type="checkbox" /> {dept}
          </label>
        ))}
      </div>
    </div>

    <div className={styles.formGroup}>
      <label htmlFor="reviewTemplate">
        Review Template <span className="text-danger">*</span>
      </label>
      <select id="reviewTemplate" className={styles.formControl} required>
        <option value="Standard Quarterly Review">
          Standard Quarterly Review
        </option>
      </select>
    </div>
  </div>
);
const FeedbackRequirementsTab = () => (
  <div className={"tab-content active"}>
    <div className={styles.formGroup}>
      <label>Feedback Requirements</label>
      <div className="dept-grid">
        {[
          { label: "Self Assessment", id: "self" },
          { label: "Manager Assessment", id: "manager" },
          { label: "Peer Feedback (min 3 peers)", id: "peer" },
          { label: "Direct Report Feedback (for managers)", id: "dr" },
          { label: "Skip-level Feedback", id: "skip" },
        ].map((item) => (
          <label key={item.id} className={styles.checkboxLabel}>
            <input type="checkbox" /> {item.label}
          </label>
        ))}
      </div>
    </div>

    <div className={styles.formGroup}>
      <label>Notifications & Reminders</label>
      <div className="dept-grid">
        {[
          "Send launch notification",
          "Weekly reminders for incomplete assessments",
          "Deadline approaching reminder (3 days before)",
          "Completion notification to managers",
        ].map((note) => (
          <label key={note} className={styles.checkboxLabel}>
            <input type="checkbox" defaultChecked /> {note}
          </label>
        ))}
      </div>
    </div>

    <div className={styles.formGroup}>
      <label htmlFor="additionalInstructions">Additional Instructions</label>
      <textarea
        id="additionalInstructions"
        className={styles.formControl}
        rows={3}
        placeholder="Enter any specific instructions for this review cycle..."
      ></textarea>
    </div>
  </div>
);
const tabs = [
  { id: "basicInfo", label: "Basic Information", component: <BasicInfoTab /> },
  {
    id: "feedback",
    label: "Feedback & Notifications",
    component: <FeedbackRequirementsTab />,
  },
];

const CreatePerformanceCycle: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = React.useState(tabs[0].id);
  const [showSuccessModal, setShowSuccessModal] = React.useState(false);
  const activeTabIndex = tabs.findIndex((tab) => tab.id === activeTab);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // prevent actual form submission
    // Service to save the KPI
    setShowSuccessModal(true);
  };

  const handleNext = () => {
    if (activeTabIndex < tabs.length - 1)
      setActiveTab(tabs[activeTabIndex + 1].id);
  };

  const handlePrevious = () => {
    if (activeTabIndex > 0) setActiveTab(tabs[activeTabIndex - 1].id);
  };

  const activeTabContent = tabs.find((tab) => tab.id === activeTab)?.component;

  return (
    <section>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h1>Create Performance Cycle</h1>
          <p className="text-muted">Set up a new performance review cycle</p>
        </div>
        <Button
          variant="secondary"
          onClick={() => navigate("/performance-cycles")}
        >
          {" "}
          <Icon iconName="Back" /> Back{" "}
        </Button>
      </div>

      <Card title="">
        <form onSubmit={handleSubmit}>
          <div className="tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                className={classNames("tab", {
                  ["active"]: activeTab === tab.id,
                })}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="tab-content active">{activeTabContent}</div>

          <div className="footer-controls d-flex justify-content-between align-items-center">
            <div>
              {activeTabIndex > 0 && (
                <Button
                  variant="secondary"
                  onClick={handlePrevious}
                  type="button"
                >
                  <Icon iconName="back" /> Previous
                </Button>
              )}
            </div>
            <div className="d-flex gap-2">
              {activeTabIndex < tabs.length - 1 && (
                <Button onClick={handleNext} type="button">
                  Next <Icon iconName="Forward" />
                </Button>
              )}
              {activeTabIndex === tabs.length - 1 && (
                <Button variant="success" type="submit">
                  <Icon iconName="Save" /> Create Cycle
                </Button>
              )}
            </div>
          </div>
        </form>

        <FeedbackModal
          visible={showSuccessModal}
          onClose={() => {
            setShowSuccessModal(false);
            navigate("/performance-cycles");
          }}
          title="Performance cycle created successfully"
          message="You can find the cycle on the Performance Cycles page."
          buttonText="Go to Performance Cycles"
        />
      </Card>
    </section>
  );
};

export default CreatePerformanceCycle;
