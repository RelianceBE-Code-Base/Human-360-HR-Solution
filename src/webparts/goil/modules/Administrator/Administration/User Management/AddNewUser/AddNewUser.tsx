import * as React from "react";
import { Icon } from "@fluentui/react/lib/Icon";
import styles from "./AddNewUser.module.scss";
import Button from "../../../../../components/common/Button/Button";
import Card from "../../../../../components/common/Card/Card";
import { classNames } from "../../../../../../../shared/utils/classnames";
import { useNavigate } from "react-router-dom";

/* -------------------------------------------------------------------------- */
/*                              TAB COMPONENTS                                */
/* -------------------------------------------------------------------------- */

const AddEmployeeTab = () => (
  <div className="tab-content active">
    <div className={styles.formContainer}>
      <div className={styles.leftColumn}>
        <div className={styles.gridTwo}>
          <div className={styles.formGroup}>
            <label htmlFor="firstName">First Name</label>
            <input id="firstName" className={styles.formControl} type="text" />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="lastName">Last Name</label>
            <input id="lastName" className={styles.formControl} type="text" />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">Email Address</label>
            <input id="email" className={styles.formControl} type="email" />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="employeeId">Employee ID</label>
            <input id="employeeId" className={styles.formControl} type="text" />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="department">Department</label>
            <select id="department" className={styles.formControl}>
              <option>Select Department</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="position">Position</label>
            <input id="position" className={styles.formControl} type="text" />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="manager">Manager</label>
            <select id="manager" className={styles.formControl}>
              <option>Select Manager</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="startDate">Start Date</label>
            <input id="startDate" className={styles.formControl} type="date" />
          </div>

          <div className={styles.formGroup}>
            <label>Access Level</label>
            <div className={styles.radioGroup}>
              <label>
                <input type="radio" name="accessLevel" /> Employee
              </label>
              <label>
                <input type="radio" name="accessLevel" /> Manager
              </label>
              <label>
                <input type="radio" name="accessLevel" /> Admin
              </label>
            </div>
          </div>

          <div className={styles.formGroupFull}>
            <label htmlFor="notes">Notes</label>
            <textarea
              id="notes"
              className={styles.formControl}
              rows={3}
            ></textarea>
          </div>
        </div>
      </div>

      <div className={styles.rightColumn}>
        <label>Upload Employee Image</label>
        <div className={styles.uploadBox}>
          <Icon iconName="Add" style={{ fontSize: 28, color: "#0078D4" }} />
          <p>
            Click To Upload
            <br />
            Or Drag And Drop
          </p>
          <p className={styles.smallText}>Max File Size: 15 MB</p>
        </div>
      </div>
    </div>
  </div>
);

const ImportUsersTab = () => (
  <div className="tab-content active">
    <div className={styles.uploadCsvBox}>
      <Icon iconName="Upload" style={{ fontSize: 40, color: "#0078D4" }} />
      <p>Drag and drop CSV file here</p>
      <p>or</p>
      <button className={styles.browseBtn}>Browse Files</button>
    </div>

    <div className={styles.csvInstructions}>
      <h3>CSV Format Instructions</h3>
      <p>Your CSV file should include the following columns:</p>
      <div className={styles.codeBlock}>
        first_name,last_name,email,employee_id,department,position,manager_email,start_date
      </div>
    </div>

    <div className={styles.importOptions}>
      <label>
        <input type="checkbox" /> Skip header row
      </label>
      <label>
        <input type="checkbox" /> Update existing employees (match by email)
      </label>
      <label>
        <input type="checkbox" /> Send welcome emails to new employees
      </label>
    </div>
  </div>
);

/* -------------------------------------------------------------------------- */
/*                                    TABS                                    */
/* -------------------------------------------------------------------------- */

const tabs = [
  { id: "addEmployee", label: "Add Employee", component: <AddEmployeeTab /> },
  { id: "importUsers", label: "Import Users", component: <ImportUsersTab /> },
];

/* -------------------------------------------------------------------------- */
/*                          MAIN COMPONENT (MATCHES CPC)                      */
/* -------------------------------------------------------------------------- */

const AddNewUser: React.FC = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = React.useState(tabs[0].id);
  const activeTabIndex = tabs.findIndex((t) => t.id === activeTab);

  const handleNext = () => {
    if (activeTabIndex < tabs.length - 1)
      setActiveTab(tabs[activeTabIndex + 1].id);
  };

  const handlePrevious = () => {
    if (activeTabIndex > 0) setActiveTab(tabs[activeTabIndex - 1].id);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle save
  };

  const activeContent = tabs.find((t) => t.id === activeTab)?.component;

  return (
    <section>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h1>Add New User</h1>
          <p className="text-muted">Create a new employee or import multiple</p>
        </div>

        <Button variant="secondary" onClick={() => navigate("/users")}>
          <Icon iconName="Back" /> Back
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
                  ["active"]: tab.id === activeTab,
                })}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="tab-content active">{activeContent}</div>

          <div className="footer-controls d-flex justify-content-between align-items-center">
            <div>
              {activeTabIndex > 0 && (
                <Button
                  variant="secondary"
                  type="button"
                  onClick={handlePrevious}
                >
                  <Icon iconName="Back" /> Previous
                </Button>
              )}
            </div>

            <div className="d-flex gap-2">
              {activeTabIndex < tabs.length - 1 && (
                <Button type="button" onClick={handleNext}>
                  Next <Icon iconName="Forward" />
                </Button>
              )}

              {activeTabIndex === tabs.length - 1 && (
                <Button variant="primary" type="submit">
                  <Icon iconName="Save" /> Save User(s)
                </Button>
              )}
            </div>
          </div>
        </form>
      </Card>
    </section>
  );
};

export default AddNewUser;
