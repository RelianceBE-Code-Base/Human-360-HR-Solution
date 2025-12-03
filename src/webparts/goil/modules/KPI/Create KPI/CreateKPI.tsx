/**
 * createKPI Component
 *
 * This component provides a multi-step form for creating a new Key Performance Indicator (KPI).
 * It is divided into three tabs:
 * 1. Basic Information - Captures the KPI objectives, performance indicator, department, year, and reporting frequency.
 * 2. Targets & Metrics - Captures baseline, target, current values, timeline, budget, and weight/priority.
 * 3. Implementation - Captures activities, means of verification, risks & mitigation, and additional comments.
 *
 * Features:
 * - Tab navigation with "Next" and "Previous" buttons.
 * - Dynamic tab content based on the currently active tab.
 * - "Back" button to navigate to the All KPIs page.
 * - Final tab includes a "Create KPI" submit button.
 *
 * Dependencies:
 * - React and React hooks (useState)
 * - `useNavigate` from react-router-dom for navigation
 * - `Button` and `Card` UI components
 * - `classNames` utility for conditional class assignment
 *
 * @component
 * @returns {TSX.Element} The KPI creation form UI
 */

import * as React from "react";
import { Icon } from "@fluentui/react/lib/Icon";
import styles from "./CreateKPI.module.scss";
import Card from "../../../components/common/Card/Card";
import Button from "../../../components/common/Button/Button";
import { classNames } from "../../../../../shared/utils/classnames";
import { useNavigate } from "react-router-dom";

const TargetsMetricsTab = () => (
  <div id="targetMetrics" className="tab-content active">
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "1rem",
      }}
    >
      <div className={styles.formGroup}>
        <label htmlFor="baseline">
          Baseline <span className="text-danger">*</span>
        </label>
        <input
          id="baseline"
          className={styles.formControl}
          type="text"
          required
          placeholder="Starting Value"
        ></input>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="target">
          Target <span className="text-danger">*</span>
        </label>
        <input
          type="text"
          id="target"
          className={styles.formControl}
          required
          placeholder="Target Value"
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="current">Current Value</label>
        <input
          type="text"
          id="current"
          className={styles.formControl}
          placeholder="Current Progress"
        />
      </div>
    </div>

    <div
      style={{
        display: "grid",
        gap: "1rem",
        gridTemplateColumns: "repeat(2, 1fr)",
      }}
    >
      <div className={styles.formGroup}>
        <label htmlFor="timelineStart">
          Start Date <span className="text-danger">*</span>
        </label>
        <input
          type="date"
          id="timelineStart"
          className={styles.formControl}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="timelineEnd">
          End Date <span className="text-danger">*</span>
        </label>
        <input
          type="date"
          id="timelineEnd"
          className={styles.formControl}
          required
        />
      </div>
    </div>
    <div
      style={{
        display: "grid",
        gap: "1rem",
        gridTemplateColumns: "repeat(2, 1fr)",
      }}
    >
      <div className={styles.formGroup}>
        <label htmlFor="budget">
          Budget(GHS) <span className="text-danger">*</span>
        </label>
        <input
          type="number"
          id="budget"
          className={styles.formControl}
          placeholder="50"
          min={1}
          max={100}
          value={50}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="budget">
          Weight/Priority(1-100) <span className="text-danger">*</span>
        </label>
        <input
          type="number"
          id="budget"
          className={styles.formControl}
          placeholder="0.00"
          step={0.01}
          required
        />
      </div>
    </div>
  </div>
);
const BasicInfoTab = () => (
  <div id="basicInfo" className="tab-content active">
    <div className={styles.formGroup}>
      <label htmlFor="objectives">
        Objectives <span className="text-danger">*</span>
      </label>
      <textarea
        id="objectives"
        className={styles.formControl}
        rows={3}
        required
        placeholder="Describe the main objective of this KPI"
      ></textarea>
    </div>

    <div className={styles.formGroup}>
      <label htmlFor="indicator">
        Performance Indicator <span className="text-danger">*</span>
      </label>
      <input
        type="text"
        id="indicator"
        className={styles.formControl}
        required
        placeholder="e.g., Market share percentage, Revenue growth rate"
      />
    </div>

    <div
      style={{
        display: "grid",
        gap: "1rem",
        gridTemplateColumns: "repeat(2, 1fr)",
      }}
    >
      <div className={styles.formGroup}>
        <label htmlFor="department">
          Department <span className="text-danger">*</span>
        </label>
        <select id="department" className={styles.formControl} required>
          <option value="">Select Department</option>
        </select>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="year">
          Year <span className="text-danger">*</span>
        </label>
        <select id="year" className={styles.formControl} required>
          <option value="2025">2025</option>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
        </select>
      </div>
    </div>

    <div className={styles.formGroup}>
      <label htmlFor="frequency">
        Reporting Frequency <span className="text-danger">*</span>
      </label>
      <select id="frequency" className={styles.formControl} required>
        <option value="Monthly">Monthly</option>
        <option value="Quarterly">Quarterly</option>
        <option value="Bi-annual">Bi-annual</option>
        <option value="Annual">Annual</option>
      </select>
    </div>
  </div>
);
const ImplementationTab = () => (
  <div id="implementation" className="tab-content active">
    <div className={styles.formGroup}>
      <label htmlFor="activities">
        Activities <span className="text-danger">*</span>
      </label>
      <textarea
        id="activities"
        className={styles.formControl}
        rows={4}
        required
        placeholder="List the main activities required to achieve this KPI"
      ></textarea>
    </div>
    <div className={styles.formGroup}>
      <label htmlFor="verification">
        Means of Verification <span className="text-danger">*</span>
      </label>
      <textarea
        id="verification"
        className={styles.formControl}
        rows={3}
        required
        placeholder="How will progress be measured and verified?"
      ></textarea>
    </div>
    <div className={styles.formGroup}>
      <label htmlFor="risks">Risks & Mitigation</label>
      <textarea
        id="risks"
        className={styles.formControl}
        rows={3}
        required
        placeholder="Identify potential risks and mitigation strategies"
      ></textarea>
    </div>
    <div className={styles.formGroup}>
      <label htmlFor="comments">Additional Comments</label>
      <textarea
        id="comments"
        className={styles.formControl}
        rows={3}
        required
        placeholder="Any additional information"
      ></textarea>
    </div>
  </div>
);

const tabs = [
  { id: "basicInfo", label: "Basic Information", component: <BasicInfoTab /> },
  {
    id: "targetsMetrics",
    label: "Targets & Metrics",
    component: <TargetsMetricsTab />,
  },
  {
    id: "implementation",
    label: "Implementation",
    component: <ImplementationTab />,
  },
];

const createKPI: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = React.useState(tabs[0].id);

  const activeTabIndex = tabs.findIndex((tab) => tab.id === activeTab);

  const handleNext = () => {
    if (activeTabIndex < tabs.length - 1) {
      const nextTabId = tabs[activeTabIndex + 1].id;
      setActiveTab(nextTabId);
    }
  };

  const handlePrevious = () => {
    if (activeTabIndex > 0) {
      const prevTabId = tabs[activeTabIndex - 1].id;
      setActiveTab(prevTabId);
    }
  };

  const activeTabContent = tabs.find((tab) => tab.id === activeTab)?.component;

  return (
    <section>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h1>Create New KPI</h1>
          <p className="text-muted">Define a new Key Performance Indicator</p>
        </div>
        <Button variant="secondary" onClick={() => navigate("/all-kpis")}>
          <Icon iconName="Back" />
          Back
        </Button>
      </div>
      <Card title="">
        <form action="" id="">
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

          <div
            style={{
              marginTop: "2rem",
              paddingTop: "1.5rem",
              borderTop: "1px solid var(--gray-200)",
            }}
          >
            <div className="d-flex gap-2 justify-content-between">
              <div>
                {activeTabIndex > 0 && (
                  <Button
                    variant="secondary"
                    onClick={handlePrevious}
                    type="button"
                  >
                    <Icon iconName="back" />
                    Previous
                  </Button>
                )}
              </div>

              <div className="d-flex gap-2">
                {activeTabIndex < tabs.length - 1 && (
                  <Button onClick={handleNext} type="button">
                    Next
                    <Icon iconName="Forward" />
                  </Button>
                )}

                {activeTabIndex === tabs.length - 1 && (
                  <Button variant="success" type="submit">
                    <Icon iconName="Save" />
                    Create KPI
                  </Button>
                )}
              </div>
            </div>
          </div>
        </form>
      </Card>
    </section>
  );
};

export default createKPI;
