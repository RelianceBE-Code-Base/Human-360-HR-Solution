import * as React from "react";
import styles from "./ManagerTeamManagement.module.scss";
import Card from "../../../components/common/Card/Card";
import { Icon } from "@fluentui/react/lib/Icon";

const metricCards = [
  { label: "Total Feedback Request", value: 45, icon: "Clock", color: "#2563eb" },
  { label: "Pending Feedback Request", value: 15, icon: "ErrorBadge", color: "#dc2626" },
  { label: "Completed Feedback Request", value: 30, icon: "CheckMark", color: "#16a34a" }
];

const PAGE_SIZE = 3;

const TeamManagement: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState("feedback");
  const [showModal, setShowModal] = React.useState(false);

  const [teamData, setTeamData] = React.useState<any[]>([]);
  const [page, setPage] = React.useState(1);

  const [employees, setEmployees] = React.useState([]);
  const [cycles, setCycles] = React.useState([]);

  const [loadingDropdowns, setLoadingDropdowns] = React.useState(true);
  
  


  // --------------------------
  // 🔥 FETCH API DROPDOWNS HERE
  // --------------------------
  React.useEffect(() => {
    async function loadDropdowns() {
      try {
        setLoadingDropdowns(true);

        const [employeesRes, cyclesRes] = await Promise.all([
          fetch("/api/employees").then((r) => r.json()),
          fetch("/api/feedbackCycles").then((r) => r.json())
        ]);

        setEmployees(employeesRes);
        setCycles(cyclesRes);

      } catch (err) {
        console.error("Dropdown API error:", err);
      } finally {
        setLoadingDropdowns(false);
      }
    }

    loadDropdowns();
  }, []);

  // --------------------------
  // SAMPLE TEAM DATA (can be API)
  // --------------------------
  React.useEffect(() => {
    setTeamData([
      { name: "Priscilia Evbota", initials: "PE", received: 5, pending: 1, date: "Jul 2, 2025", action: "View" },
      { name: "Christabel Ukoh", initials: "CU", received: 3, pending: 2, date: "Jun 28, 2025", action: "Request" },
      { name: "Kehinde Adedeji", initials: "KA", received: 4, pending: 0, date: "Jul 1, 2025", action: "View" },
      { name: "Sara Uyi", initials: "SU", received: 2, pending: 2, date: "Jun 30, 2025", action: "Remind" },
      { name: "John Parker", initials: "JP", received: 6, pending: 1, date: "Jun 25, 2025", action: "View" }
    ]);
  }, []);

  const totalPages = Math.ceil(teamData.length / PAGE_SIZE);
  const paginated = teamData.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <section className={styles.wrapper}>
      {activeTab !== "createObjective" && (
  <div className={styles.tabs}>
    <button
      className={`${styles.tabButton} ${activeTab === "feedback" ? styles.activeTab : ""}`}
      onClick={() => {
        setActiveTab("feedback");
        setShowModal(true);
      }}
    >
      <Icon iconName="Feedback" className={styles.tabIcon} />
      Feedback Management
    </button>

    <button
      className={`${styles.tabButton} ${activeTab === "goals" ? styles.activeTab : ""}`}
      onClick={() => setActiveTab("goals")}
    >
      <Icon iconName="Bullseye" className={styles.tabIcon} />
      Goal Tracking
    </button>

    <button
      className={`${styles.tabButton} ${activeTab === "growth" ? styles.activeTab : ""}`}
      onClick={() => setActiveTab("growth")}
    >
      <Icon iconName="LearningTools" className={styles.tabIcon} />
      Development & Growth
    </button>
  </div>
)}


      {/* FEEDBACK CONTENT */}
      {activeTab === "feedback" && (
        <>
          {/* Metrics */}
          <div className={styles.metricsGrid}>
            {metricCards.map((m, i) => (
              <Card title= "" key={i}>
                <div className={styles.metricCard}>
                  <div className={styles.metricValue}>{m.value}</div>
                  <div className={styles.metricLabel}>{m.label}</div>
                  <Icon iconName={m.icon} className={styles.metricIcon} style={{ color: m.color }} />
                </div>
              </Card>
            ))}
          </div>

          {/* Team Feedback Table */}
          <Card title= "">
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>
                <Icon iconName="Megaphone" className={styles.titleIcon} />
                Team Feedback Management
              </h3>

              <button className={styles.requestFeedbackBtn}>
                <Icon iconName="AddFriend" />
                Request Feedback
              </button>
            </div>

            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Team Member</th>
                    <th>Received</th>
                    <th>Pending</th>
                    <th>Last Feedback</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {paginated.map((t, i) => (
                    <tr key={i}>
                      <td>
                        <div className={styles.memberCell}>
                          <div className={styles.initials}>{t.initials}</div>
                          {t.name}
                        </div>
                      </td>
                      <td>{t.received}</td>
                      <td className={t.pending > 0 ? styles.pending : ""}>{t.pending}</td>
                      <td>{t.date}</td>
                      <td>
                        <button
                          className={`${styles.actionBtn} ${t.action === "Remind" ? styles.remind : ""}`}
                        >
                          {t.action}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className={styles.pagination}>
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                Prev
              </button>

              <span>{page} / {totalPages}</span>

              <button
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
              >
                Next
              </button>
            </div>
          </Card>
        </>
      )}

      {/* GOALS Tracking tab */} 
{activeTab === "goals" && (
  <div className={styles.goalWrapper}>

    {/* ---- Goal Metric Cards WITH Icons ---- */}
    <div className={styles.goalMetricsGrid}>
      <Card title="">
        <div className={styles.goalMetricCard}>
          <div className={styles.goalMetricIcon} style={{ background: "#2563eb20", color: "#2563eb" }}>
            <Icon iconName="Bullseye" />
          </div>
          <div className={styles.goalMetricLabel}>Total Goals</div>
          <div className={styles.goalMetricValue}>45</div>
        </div>
      </Card>

      <Card title="">
        <div className={styles.goalMetricCard}>
          <div className={styles.goalMetricIcon} style={{ background: "#facc1520", color: "#facc15" }}>
            <Icon iconName="WaitlistConfirm" />
          </div>
          <div className={styles.goalMetricLabel}>Pending Goals</div>
          <div className={styles.goalMetricValue}>15</div>
        </div>
      </Card>

      <Card title="">
        <div className={styles.goalMetricCard}>
          <div className={styles.goalMetricIcon} style={{ background: "#16a34a20", color: "#16a34a" }}>
            <Icon iconName="Completed" />
          </div>
          <div className={styles.goalMetricLabel}>Completed Goals</div>
          <div className={styles.goalMetricValue}>22</div>
        </div>
      </Card>

      <Card title="">
        <div className={styles.goalMetricCard}>
          <div className={styles.goalMetricIcon} style={{ background: "#dc262620", color: "#dc2626" }}>
            <Icon iconName="Warning" />
          </div>
          <div className={styles.goalMetricLabel}>Overdue Goals</div>
          <div className={styles.goalMetricValue}>3</div>
        </div>
      </Card>
    </div>

    {/* Header Row */}
    <div className={styles.goalHeaderRow}>
      <h2 className={styles.goalHeader}>Goal</h2>

      <button className={styles.createObjectiveBtn}
       onClick={() => setActiveTab("createObjective")}
      >
      <Icon iconName="Add" />
        Create Objective
      </button>
    </div>

    {/* ---- Goals Table ---- */}
    <Card title="">
      <table className={styles.goalTable}>
        <thead>
          <tr>
            <th>Goal</th>
            <th>Owner</th>
            <th>Progress</th>
            <th>Due</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Implement new reporting system</td>
            <td>Priscilia Evbota</td>
            <td><span className={styles.statusDone}>Done</span></td>
            <td>20 Jun</td>
          </tr>

          <tr>
            <td>Improve code test coverage to 90%</td>
            <td>Christabel Ukoh</td>
            <td><span className={styles.statusProgress}>In Progress</span></td>
            <td>15 Jul</td>
          </tr>

          <tr>
            <td>Leadership training module</td>
            <td>Sara Uyi</td>
            <td><span className={styles.statusOverdue}>Overdue</span></td>
            <td>30 Jun</td>
          </tr>

          <tr>
            <td>Quarterly customer survey</td>
            <td>Kehinde Adedeji</td>
            <td><span className={styles.statusDone}>Done</span></td>
            <td>22 May</td>
          </tr>
        </tbody>
      </table>
    </Card>

  </div>
)}
  
  {activeTab === "createObjective" && (
  <div className={styles.pageWrapper}>
    <div className={styles.fullPageContent}>

      <div className={styles.fullPageHeader}>
        <h2>Create New Objective</h2>

        <button 
          className={styles.closeBtn} 
          onClick={() => setActiveTab("goals")}
        >
          <Icon iconName="ChromeClose" />
        </button>
      </div>

      <div className={styles.fullPageBody}>

        {/* Row 1 */}
        <div className={styles.formRow}>
          <div className={styles.formControl}>
            <label>Company Objectives</label>
            <select>
              <option>Reduce downtime and enhance operation</option>
            </select>
          </div>

          <div className={styles.formControl}>
            <label>Department Objective</label>
            <input type="text" placeholder="Monitor the equipments daily" />
          </div>
        </div>

        {/* Row 2 */}
        <div className={styles.formRow}>
          <div className={styles.formControl}>
            <label>Start Date</label>
            <input type="date" />
          </div>

          <div className={styles.formControl}>
            <label>Due Date</label>
            <input type="date" />
          </div>
        </div>

        {/* Description */}
        <div className={styles.formControl}>
          <label>Description</label>
          <textarea rows={3}></textarea>
        </div>

        {/* Add Goal */}
        <div className={styles.goalAddRow}>
          <button className={styles.cancelInline}>Cancel</button>
          <button className={styles.addGoalBtn}>
            <Icon iconName="Add" /> Add
          </button>
        </div>

        {/* Table */}
        <table className={styles.objectiveTable}>
          <thead>
            <tr>
              <th>Goal</th>
              <th>Target</th>
              <th>Start Date</th>
              <th>Due</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>

      <div className={styles.fullPageFooter}>
        <button className={styles.cancelBtn} onClick={() => setActiveTab("goals")}>
          Cancel
        </button>
        <button className={styles.sendBtn}>Submit</button>
      </div>

    </div>
  </div>
)}
   
{/* MODAL */}
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h2>Request Feedback</h2>
              <button className={styles.closeBtn} onClick={() => setShowModal(false)}>
                <Icon iconName="ChromeClose" />
              </button>
            </div>

            <div className={styles.modalBody}>
              
              {/* DROPDOWN ROW 1 */}
              <div className={styles.formRow}>
                <div className={styles.formControl}>
                  <label>Reviewee Name</label>
                  <select disabled={loadingDropdowns}>
                    {loadingDropdowns ? (
                      <option>Loading...</option>
                    ) : (
                      employees.map((e: any) => (
                        <option key={e.id}>{e.name}</option>
                      ))
                    )}
                  </select>
                </div>

                <div className={styles.formControl}>
                  <label>Reviewer Name</label>
                  <select disabled={loadingDropdowns}>
                    {loadingDropdowns ? (
                      <option>Loading...</option>
                    ) : (
                      employees.map((e: any) => (
                        <option key={e.id}>{e.name}</option>
                      ))
                    )}
                  </select>
                </div>
              </div>

              {/* DROPDOWN ROW 2 */}
              <div className={styles.formRow}>
                <div className={styles.formControl}>
                  <label>Feedback Cycle Name</label>
                  <select disabled={loadingDropdowns}>
                    {loadingDropdowns ? (
                      <option>Loading...</option>
                    ) : (
                      cycles.map((c: any) => (
                        <option key={c.id}>{c.title}</option>
                      ))
                    )}
                  </select>
                </div>

                <div className={styles.formControl}>
                  <label>Feedback Cycle Type</label>
                  <select disabled={loadingDropdowns}>
                    <option>Mid-Year</option>
                    <option>Annual</option>
                    <option>Quarterly</option>
                  </select>
                </div>
              </div>

            </div>

            <div className={styles.modalFooter}>
              <button className={styles.cancelBtn} onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button className={styles.sendBtn}>Send</button>
            </div>
          </div>
        </div>
      )}
 </section>
  );
};

export default TeamManagement;
