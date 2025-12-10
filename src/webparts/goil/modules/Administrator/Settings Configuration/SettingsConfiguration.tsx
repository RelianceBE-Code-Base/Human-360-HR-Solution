/**
 * SystemConfigurations Component
 *
 * Manages global system settings including:
 * 1. General: Company info, Performance settings, Categories, and System Preferences.
 * 2. Email Notifications: SMTP config, Templates, and Notification triggers.
 *
 * Features:
 * - Tabbed interface navigation.
 * - Dynamic list management for "Performance Categories".
 * - Form layouts matching the provided design.
 */
import * as React from "react";
import { Icon } from "@fluentui/react/lib/Icon";
import Button from "../../../components/common/Button/Button";
// Note: Ensure your global CSS file is imported at the App level or imported here if necessary
import styles from "./SettingsConfiguration.module.scss";

// --- Types ---
interface IGeneralSettings {
  companyName: string;
  industry: string;
  adminEmail: string;
  companySize: string;
  ratingScale: string;
  reviewFrequency: string;
  preferences: { [key: string]: boolean };
}

interface IEmailSettings {
  fromName: string;
  fromEmail: string;
  replyTo: string;
  footerText: string;
  events: { [key: string]: boolean };
}

const SystemConfigurations: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<"General" | "Email">(
    "General"
  );

  // --- State: General Tab ---
  const [generalData, setGeneralData] = React.useState<IGeneralSettings>({
    companyName: "Reliance Infosystems",
    industry: "Information Technology",
    adminEmail: "admin@relianceinfo.com",
    companySize: "201-500 employees",
    ratingScale: "1-5 Scale",
    reviewFrequency: "Quarterly",
    preferences: {
      anonymousFeedback: true,
      continuousFeedback: true,
      managerApproval: true,
      lockCompleted: false,
      employeeRequest: true,
    },
  });

  const [categories, setCategories] = React.useState<string[]>([
    "Technical Skills",
    "Communication",
    "Teamwork",
    "Leadership",
    "Problem Solving",
  ]);
  const [newCategory, setNewCategory] = React.useState("");

  // --- State: Email Tab ---
  const [emailData, setEmailData] = React.useState<IEmailSettings>({
    fromName: "Reliance Performance Hub",
    fromEmail: "performance@relianceinfo.com",
    replyTo: "no-reply@relianceinfo.com",
    footerText: "© 2025 Reliance Infosystems",
    events: {
      cycleLaunch: true,
      feedbackRequest: true,
      deadlineReminder: true,
      feedbackReceived: true,
      reviewCompletion: true,
    },
  });

  // --- Handlers ---
  const handleGeneralChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setGeneralData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePreferenceChange = (key: string) => {
    setGeneralData((prev) => ({
      ...prev,
      preferences: { ...prev.preferences, [key]: !prev.preferences[key] },
    }));
  };

  const addCategory = () => {
    if (newCategory.trim()) {
      setCategories([...categories, newCategory]);
      setNewCategory("");
    }
  };

  const removeCategory = (index: number) => {
    const newCats = [...categories];
    newCats.splice(index, 1);
    setCategories(newCats);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmailData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEventToggle = (key: string) => {
    setEmailData((prev) => ({
      ...prev,
      events: { ...prev.events, [key]: !prev.events[key] },
    }));
  };

  // --- Render Functions ---

  const renderGeneralTab = () => (
    <div className={styles.layoutGrid}>
      {/* Left Column */}
      <div>
        <h4 className={styles.sectionHeader}>Company Information</h4>

        {/* Using CSS Grid from module for form layout */}
        <div className={styles.formGrid}>
          <div className="form-group">
            <label>Company Name</label>
            <input
              type="text"
              name="companyName"
              className="form-control"
              value={generalData.companyName}
              onChange={handleGeneralChange}
            />
          </div>
          <div className="form-group">
            <label>Industry</label>
            <select
              name="industry"
              className="form-control"
              value={generalData.industry}
              onChange={handleGeneralChange}
            >
              <option>Information Technology</option>
              <option>Finance</option>
              <option>Healthcare</option>
            </select>
          </div>
          <div className="form-group">
            <label>Admin Email</label>
            <input
              type="text"
              name="adminEmail"
              className="form-control"
              value={generalData.adminEmail}
              onChange={handleGeneralChange}
            />
          </div>
          <div className="form-group">
            <label>Company Size</label>
            <select
              name="companySize"
              className="form-control"
              value={generalData.companySize}
              onChange={handleGeneralChange}
            >
              <option>1-50 employees</option>
              <option>51-200 employees</option>
              <option>201-500 employees</option>
            </select>
          </div>
        </div>

        <h4 className={styles.sectionHeader}>Performance Settings</h4>
        <div className={styles.formGrid}>
          <div className="form-group">
            <label>Rating Scale</label>
            <select
              name="ratingScale"
              className="form-control"
              value={generalData.ratingScale}
              onChange={handleGeneralChange}
            >
              <option>1-5 Scale</option>
              <option>1-10 Scale</option>
              <option>Star Rating</option>
            </select>
          </div>
          <div className="form-group">
            <label>Default Review Frequency</label>
            <select
              name="reviewFrequency"
              className="form-control"
              value={generalData.reviewFrequency}
              onChange={handleGeneralChange}
            >
              <option>Quarterly</option>
              <option>Biannual</option>
              <option>Annual</option>
            </select>
          </div>
        </div>

        {/* Categories List */}
        <div className="form-group mt-3">
          <label>Performance Categories</label>
          <div className={styles.categoryListContainer}>
            {categories.map((cat, index) => (
              <div key={index} className={styles.categoryItem}>
                <span>{cat}</span>
                <Icon iconName="Cancel" onClick={() => removeCategory(index)} />
              </div>
            ))}
          </div>
          <div className="d-flex gap-2">
            <input
              type="text"
              className="form-control"
              placeholder="Add new category..."
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
            <Button onClick={addCategory}>Add</Button>
          </div>
        </div>
      </div>

      {/* Right Column: System Preferences */}
      <div>
        <h4 className={styles.sectionHeader}>System Preferences</h4>
        <div className={styles.preferencesContainer}>
          <div className={styles.checkboxRow}>
            <input
              type="checkbox"
              checked={generalData.preferences.anonymousFeedback}
              onChange={() => handlePreferenceChange("anonymousFeedback")}
            />
            <span>Allow anonymous feedback</span>
          </div>
          <div className={styles.checkboxRow}>
            <input
              type="checkbox"
              checked={generalData.preferences.continuousFeedback}
              onChange={() => handlePreferenceChange("continuousFeedback")}
            />
            <span>Enable continuous feedback outside review cycles</span>
          </div>
          <div className={styles.checkboxRow}>
            <input
              type="checkbox"
              checked={generalData.preferences.managerApproval}
              onChange={() => handlePreferenceChange("managerApproval")}
            />
            <span>Require manager approval for peer selection</span>
          </div>
          <div className={styles.checkboxRow}>
            <input
              type="checkbox"
              checked={generalData.preferences.lockCompleted}
              onChange={() => handlePreferenceChange("lockCompleted")}
            />
            <span>Lock completed reviews from further edits</span>
          </div>
          <div className={styles.checkboxRow}>
            <input
              type="checkbox"
              checked={generalData.preferences.employeeRequest}
              onChange={() => handlePreferenceChange("employeeRequest")}
            />
            <span>Allow employees to request feedback</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderEmailTab = () => (
    <div>
      <div className={styles.layoutGrid}>
        {/* Top Left: Configuration */}
        <div>
          <h4 className={styles.sectionHeader}>Email Configuration</h4>
          <div className={styles.formGrid}>
            <div className="form-group">
              <label>From Name</label>
              <input
                type="text"
                name="fromName"
                className="form-control"
                value={emailData.fromName}
                onChange={handleEmailChange}
              />
            </div>
            <div className="form-group">
              <label>From Email</label>
              <input
                type="text"
                name="fromEmail"
                className="form-control"
                value={emailData.fromEmail}
                onChange={handleEmailChange}
              />
            </div>
            <div className="form-group">
              <label>Reply-To Email</label>
              <input
                type="text"
                name="replyTo"
                className="form-control"
                value={emailData.replyTo}
                onChange={handleEmailChange}
              />
            </div>
            <div className="form-group">
              <label>Email Footer Text</label>
              <input
                type="text"
                name="footerText"
                className="form-control"
                value={emailData.footerText}
                onChange={handleEmailChange}
              />
            </div>
          </div>

          {/* Logo Upload */}
          <div className="form-group mt-3">
            <label>Logo (for emails)</label>
            <div className={styles.logoUploadArea}>
              <div className={styles.logoPlaceholder}>
                <Icon iconName="Photo2" />
              </div>
              <Button>Upload Logo</Button>
            </div>
          </div>
        </div>

        {/* Top Right: Email Templates */}
        <div>
          <h4 className={styles.sectionHeader}>Email Templates</h4>
          <div className={styles.templateList}>
            {[
              "Welcome Email",
              "Review Cycle Launch",
              "Feedback Request",
              "Review Reminder",
              "Review Complete",
            ].map((template, idx) => (
              <div key={idx} className={styles.templateItem}>
                <span>{template}</span>
                <span className={styles.editLink}>Edit</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom: Notification Events */}
      <div>
        <h4 className={styles.sectionHeader}>Notification Events</h4>
        <div className={styles.notificationList}>
          {[
            {
              key: "cycleLaunch",
              title: "Review Cycle Launch",
              desc: "Sent when a new review cycle begins",
            },
            {
              key: "feedbackRequest",
              title: "Feedback Request",
              desc: "Sent when feedback is requested from a colleague",
            },
            {
              key: "deadlineReminder",
              title: "Review Deadline Reminder",
              desc: "Reminder about upcoming review deadline",
            },
            {
              key: "feedbackReceived",
              title: "Feedback Received",
              desc: "Notification when new feedback is received",
            },
            {
              key: "reviewCompletion",
              title: "Review Completion",
              desc: "Sent when a performance review is completed",
            },
          ].map((item) => (
            <div key={item.key} className={styles.notificationRow}>
              <div>
                <div className={styles.notificationTitle}>{item.title}</div>
                <div className={styles.notificationDesc}>{item.desc}</div>
              </div>
              <input
                type="checkbox"
                checked={
                  emailData.events[item.key as keyof typeof emailData.events]
                }
                onChange={() => handleEventToggle(item.key)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <section className={styles.container}>
      <div className="mb-3">
        <h2>System Settings</h2>

        {/* Navigation Tabs - Using Global classes .tabs and .tab */}
        <div className="tabs">
          <button
            className={`tab ${activeTab === "General" ? "active" : ""}`}
            onClick={() => setActiveTab("General")}
          >
            General
          </button>
          <button
            className={`tab ${activeTab === "Email" ? "active" : ""}`}
            onClick={() => setActiveTab("Email")}
          >
            Email Notifications
          </button>
          <button
            className="tab"
            disabled
            style={{ opacity: 0.5, cursor: "not-allowed" }}
          >
            Integrations
          </button>
          <button
            className="tab"
            disabled
            style={{ opacity: 0.5, cursor: "not-allowed" }}
          >
            Security
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="config-content mb-3">
        {activeTab === "General" ? renderGeneralTab() : renderEmailTab()}
      </div>

      {/* Footer Actions */}
      <div className={styles.footerActions}>
        <Button variant="secondary" onClick={() => console.log("Cancel")}>
          Cancel
        </Button>
        <Button
          onClick={() =>
            console.log("Saving...", { generalData, emailData, categories })
          }
        >
          Save Changes
        </Button>
      </div>
    </section>
  );
};

export default SystemConfigurations;
