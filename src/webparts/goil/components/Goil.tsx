import * as React from "react";
import styles from "./Goil.module.scss";
import type { IGoilProps } from "./IGoilProps";
import { escape } from "@microsoft/sp-lodash-subset";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { IKPI } from "./IKPI";
import { IKPIStats } from "./IKPIStats";
import Header from "./Header/Header";
import NavBar from "./NavBar/NavBar";
import Dashboard from "./Dashboard/Dashboard";
import KPIManagement from "./KPIManagement/KPIManagement";
import Notification from "./Notification/Notifications";
import Reports from "./Reports/Reports";
import AuditTrail from "./AuditTrail/AuditTrail";

// ADDED: Define the IKPIStats interface to provide type safety for your state.

interface IGoilState {
  KPIs: IKPI[];
  kpiStats: IKPIStats;
}

export default class Goil extends React.Component<IGoilProps, IGoilState> {
  constructor(props: IGoilProps) {
    super(props);
    this.state = {
      KPIs: [],
      // Initialize with a valid, empty structure
      kpiStats: {
        KPIStatusCounts: {
          achievedCount: 0,
          ongoingCount: 0,
          missedCount: 0,
        },
      },
    };
  }

  private getProgressPercentage() {
    const progress = Math.floor(Math.random() * 100);
    return progress;
  }

  // From Database (Mock)
  private fetchKPIs(): IKPI[] {
    const KPIs = [
      // Operations Department (6 KPIs)
      {
        id: 1,
        indicator: "Equipment Uptime Percentage",
        department: "Operations",
        objective:
          "Maintain optimal equipment performance and minimize downtime",
        target: "95%",
        baseline: "88%",
        status: "Ongoing",
        activities: "Regular maintenance, predictive analytics, staff training",
        verification: "Equipment logs, maintenance records",
        timelineStart: "2025-01-01",
        timelineEnd: "2025-07-31",
        budget: 150000,
        frequency: "Weekly",
        comments: "Tracking weekly maintenance schedules",
           progress: this.getProgressPercentage(),
      },
      {
        id: 2,
        indicator: "Safety Incident Rate",
        department: "Operations",
        objective: "Reduce workplace accidents and improve safety culture",
        target: "Zero incidents",
        baseline: "2 incidents/month",
        status: "Achieved",
        activities:
          "Safety training, hazard identification, equipment inspection",
        verification: "Incident reports, safety audits",
        timelineStart: "2025-01-01",
        timelineEnd: "2025-07-31",
        budget: 75000,
        frequency: "Monthly",
        comments: "Excellent safety record maintained",
        progress: this.getProgressPercentage(),
      },
      {
        id: 3,
        indicator: "Production Efficiency",
        department: "Operations",
        objective: "Optimize production processes and reduce waste",
        target: "90%",
        baseline: "82%",
        status: "Ongoing",
        activities: "Process optimization, lean manufacturing, automation",
        verification: "Production reports, efficiency metrics",
        timelineStart: "2025-01-01",
        timelineEnd: "2025-07-31",
        budget: 200000,
        frequency: "Weekly",
        comments: "Steady improvement in Q1",
        progress: this.getProgressPercentage(),
      },
      {
        id: 4,
        indicator: "Maintenance Cost Reduction",
        department: "Operations",
        objective: "Reduce maintenance costs through preventive measures",
        target: "15%",
        baseline: "Current costs",
        status: "Ongoing",
        activities: "Preventive maintenance, supplier negotiations",
        verification: "Cost reports, maintenance logs",
        timelineStart: "2025-01-01",
        timelineEnd: "2025-07-31",
        budget: 100000,
        frequency: "Monthly",
        comments: "Cost reduction initiatives in progress",
        progress: this.getProgressPercentage(),
      },
      {
        id: 5,
        indicator: "Quality Control Pass Rate",
        department: "Operations",
        objective: "Maintain high product quality standards",
        target: "98%",
        baseline: "94%",
        status: "Achieved",
        activities: "Quality inspections, process controls, staff training",
        verification: "Quality reports, inspection records",
        timelineStart: "2025-01-01",
        timelineEnd: "2025-07-31",
        budget: 80000,
        frequency: "Weekly",
        comments: "Exceeded quality targets",
        progress: this.getProgressPercentage(),
      },
      {
        id: 6,
        indicator: "Environmental Compliance Score",
        department: "Operations",
        objective: "Ensure full compliance with environmental regulations",
        target: "100%",
        baseline: "92%",
        status: "Ongoing",
        activities: "Environmental monitoring, compliance audits",
        verification: "Regulatory reports, audit findings",
        timelineStart: "2025-01-01",
        timelineEnd: "2025-07-31",
        budget: 120000,
        frequency: "Monthly",
        comments: "Working towards full compliance",
        progress: this.getProgressPercentage(),
      },

      // Sales Department (6 KPIs)
      {
        id: 7,
        indicator: "Monthly Revenue Growth",
        department: "Sales",
        objective: "Achieve consistent revenue growth across all regions",
        target: "12%",
        baseline: "8%",
        status: "Achieved",
        activities:
          "Market expansion, customer acquisition, pricing optimization",
        verification: "Sales reports, financial statements",
        timelineStart: "2025-01-01",
        timelineEnd: "2025-07-31",
        budget: 300000,
        frequency: "Monthly",
        comments: "Strong Q1 performance",
        progress: this.getProgressPercentage(),
      },
      {
        id: 8,
        indicator: "Customer Acquisition Rate",
        department: "Sales",
        objective: "Expand customer base and market reach",
        target: "100 new customers",
        baseline: "65 customers",
        status: "Ongoing",
        activities: "Marketing campaigns, referral programs, partnerships",
        verification: "Customer database, acquisition reports",
        timelineStart: "2025-01-01",
        timelineEnd: "2025-07-31",
        budget: 180000,
        frequency: "Monthly",
        comments: "On track to meet targets",
        progress: this.getProgressPercentage(),
      },
      {
        id: 9,
        indicator: "Market Share Expansion",
        department: "Sales",
        objective: "Increase market presence in key segments",
        target: "5%",
        baseline: "18%",
        status: "Ongoing",
        activities:
          "Competitive analysis, product positioning, strategic partnerships",
        verification: "Market research reports, competitor analysis",
        timelineStart: "2025-01-01",
        timelineEnd: "2025-07-31",
        budget: 250000,
        frequency: "Custom",
        comments: "Market research in progress",
        progress: this.getProgressPercentage(),
      },
      {
        id: 10,
        indicator: "Customer Retention Rate",
        department: "Sales",
        objective: "Maintain high customer loyalty and satisfaction",
        target: "95%",
        baseline: "89%",
        status: "Achieved",
        activities: "Customer service excellence, loyalty programs",
        verification: "Customer surveys, retention analytics",
        timelineStart: "2025-01-01",
        timelineEnd: "2025-07-31",
        budget: 150000,
        frequency: "Monthly",
        comments: "Excellent customer satisfaction",
        progress: this.getProgressPercentage(),
      },
      {
        id: 11,
        indicator: "Average Transaction Value",
        department: "Sales",
        objective: "Increase per-transaction revenue through upselling",
        target: "GHS 2,500",
        baseline: "GHS 2,100",
        status: "Ongoing",
        activities: "Upselling training, product bundling, premium services",
        verification: "Transaction reports, sales analytics",
        timelineStart: "2025-01-01",
        timelineEnd: "2025-07-31",
        budget: 100000,
        frequency: "Weekly",
        comments: "Gradual improvement noted",
        progress: this.getProgressPercentage(),
      },
      {
        id: 12,
        indicator: "Sales Team Performance",
        department: "Sales",
        objective: "Optimize individual and team sales performance",
        target: "110% of quota",
        baseline: "98% of quota",
        status: "Ongoing",
        activities: "Sales training, performance coaching, incentive programs",
        verification: "Sales performance reports, individual metrics",
        timelineStart: "2025-01-01",
        timelineEnd: "2025-07-31",
        budget: 200000,
        frequency: "Monthly",
        comments: "Team performance improving",
        progress: this.getProgressPercentage(),
      },

      // Finance Department (6 KPIs)
      {
        id: 13,
        indicator: "Cost Reduction Initiatives",
        department: "Finance",
        objective: "Identify and implement cost-saving measures",
        target: "10%",
        baseline: "Current costs",
        status: "Ongoing",
        activities: "Cost analysis, vendor negotiations, process optimization",
        verification: "Financial reports, cost analysis documents",
        timelineStart: "2025-01-01",
        timelineEnd: "2025-07-31",
        budget: 50000,
        frequency: "Monthly",
        comments: "Several initiatives identified",
        progress: this.getProgressPercentage(),
      },
      {
        id: 14,
        indicator: "Budget Variance Analysis",
        department: "Finance",
        objective: "Maintain accurate budget forecasting and control",
        target: "±5%",
        baseline: "±8%",
        status: "Achieved",
        activities: "Regular budget reviews, variance analysis, forecasting",
        verification: "Budget reports, variance analysis documents",
        timelineStart: "2025-01-01",
        timelineEnd: "2025-07-31",
        budget: 30000,
        frequency: "Monthly",
        comments: "Improved budget accuracy",
        progress: this.getProgressPercentage(),
      },
      {
        id: 15,
        indicator: "Cash Flow Management",
        department: "Finance",
        objective: "Optimize cash flow and working capital management",
        target: "30 days",
        baseline: "45 days",
        status: "Ongoing",
        activities: "Receivables management, payment optimization",
        verification: "Cash flow statements, working capital reports",
        timelineStart: "2025-01-01",
        timelineEnd: "2025-07-31",
        budget: 40000,
        frequency: "Weekly",
        comments: "Cash flow improving",
        progress: this.getProgressPercentage(),
      },
      {
        id: 16,
        indicator: "Return on Investment",
        department: "Finance",
        objective: "Maximize return on strategic investments",
        target: "15%",
        baseline: "12%",
        status: "Achieved",
        activities: "Investment analysis, performance monitoring",
        verification: "ROI calculations, investment reports",
        timelineStart: "2025-01-01",
        timelineEnd: "2025-07-31",
        budget: 25000,
        frequency: "Custom",
        comments: "Strong investment returns",
        progress: this.getProgressPercentage(),
      },
      {
        id: 17,
        indicator: "Accounts Receivable Turnover",
        department: "Finance",
        objective: "Improve collection efficiency and reduce bad debt",
        target: "8 times/year",
        baseline: "6 times/year",
        status: "Ongoing",
        activities: "Credit policy review, collection procedures",
        verification: "AR aging reports, collection statistics",
        timelineStart: "2025-01-01",
        timelineEnd: "2025-07-31",
        budget: 35000,
        frequency: "Monthly",
        comments: "Collection processes improved",
        progress: this.getProgressPercentage(),
      },
      {
        id: 18,
        indicator: "Financial Reporting Accuracy",
        department: "Finance",
        objective: "Ensure timely and accurate financial reporting",
        target: "100%",
        baseline: "95%",
        status: "Missed",
        activities: "Process improvements, staff training, system upgrades",
        verification: "Audit reports, accuracy metrics",
        timelineStart: "2025-01-01",
        timelineEnd: "2025-07-31",
        budget: 60000,
        frequency: "Monthly",
        comments: "Working on process improvements",
        progress: this.getProgressPercentage(),
      },

      // IT Department (6 KPIs)
      {
        id: 19,
        indicator: "System Uptime Percentage",
        department: "IT",
        objective: "Maintain high system availability and reliability",
        target: "99.9%",
        baseline: "99.2%",
        status: "Achieved",
        activities: "Infrastructure monitoring, preventive maintenance",
        verification: "System logs, uptime reports",
        timelineStart: "2025-01-01",
        timelineEnd: "2025-07-31",
        budget: 180000,
        frequency: "Weekly",
        comments: "Excellent system reliability",
        progress: this.getProgressPercentage(),
      },
      {
        id: 20,
        indicator: "Cybersecurity Incident Response",
        department: "IT",
        objective: "Rapid response to security threats and incidents",
        target: "< 2 hours",
        baseline: "4 hours",
        status: "Ongoing",
        activities: "Security monitoring, incident response training",
        verification: "Incident logs, response time reports",
        timelineStart: "2025-01-01",
        timelineEnd: "2025-07-31",
        budget: 120000,
        frequency: "Weekly",
        comments: "Response times improving",
        progress: this.getProgressPercentage(),
      },
      {
        id: 21,
        indicator: "Digital Transformation Progress",
        department: "IT",
        objective: "Accelerate digital transformation initiatives",
        target: "80%",
        baseline: "45%",
        status: "Ongoing",
        activities: "System modernization, process automation",
        verification: "Project reports, milestone tracking",
        timelineStart: "2025-01-01",
        timelineEnd: "2025-07-31",
        budget: 500000,
        frequency: "Monthly",
        comments: "Major projects underway",
        progress: this.getProgressPercentage(),
      },
      {
        id: 22,
        indicator: "IT Support Response Time",
        department: "IT",
        objective: "Provide rapid IT support to all departments",
        target: "< 30 minutes",
        baseline: "1 hour",
        status: "Achieved",
        activities: "Support process optimization, staff training",
        verification: "Support tickets, response time logs",
        timelineStart: "2025-01-01",
        timelineEnd: "2025-07-31",
        budget: 80000,
        frequency: "Weekly",
        comments: "Support efficiency improved",
        progress: this.getProgressPercentage(),
      },
      {
        id: 23,
        indicator: "Data Backup Success Rate",
        department: "IT",
        objective: "Ensure reliable data backup and recovery",
        target: "100%",
        baseline: "98%",
        status: "Ongoing",
        activities: "Backup system monitoring, recovery testing",
        verification: "Backup logs, recovery test reports",
        timelineStart: "2025-01-01",
        timelineEnd: "2025-07-31",
        budget: 90000,
        frequency: "Weekly",
        comments: "Backup reliability high",
        progress: this.getProgressPercentage(),
      },
      {
        id: 24,
        indicator: "Technology Innovation Index",
        department: "IT",
        objective: "Drive innovation through technology adoption",
        target: "75",
        baseline: "60",
        status: "Ongoing",
        activities: "Research, pilot projects, technology evaluation",
        verification: "Innovation reports, project outcomes",
        timelineStart: "2025-01-01",
        timelineEnd: "2025-07-31",
        budget: 200000,
        frequency: "Custom",
        comments: "Innovation projects progressing",
        progress: this.getProgressPercentage(),
      },

      // HR Department (6 KPIs)
      {
        id: 25,
        indicator: "Employee Satisfaction Score",
        department: "HR",
        objective: "Maintain high employee satisfaction and engagement",
        target: "85%",
        baseline: "78%",
        status: "Achieved",
        activities: "Employee surveys, feedback implementation",
        verification: "Survey results, engagement metrics",
        timelineStart: "2025-01-01",
        timelineEnd: "2025-07-31",
        budget: 60000,
        frequency: "Monthly",
        comments: "Strong employee satisfaction",
        progress: this.getProgressPercentage(),
      },
      {
        id: 26,
        indicator: "Training Program Effectiveness",
        department: "HR",
        objective: "Improve employee skills through effective training",
        target: "90%",
        baseline: "82%",
        status: "Ongoing",
        activities: "Training needs analysis, program development",
        verification: "Training evaluations, skill assessments",
        timelineStart: "2025-01-01",
        timelineEnd: "2025-07-31",
        budget: 150000,
        frequency: "Monthly",
        comments: "Training programs enhanced",
        progress: this.getProgressPercentage(),
      },
      {
        id: 27,
        indicator: "Talent Retention Rate",
        department: "HR",
        objective: "Retain top talent and reduce turnover",
        target: "95%",
        baseline: "88%",
        status: "Ongoing",
        activities: "Career development, competitive compensation",
        verification: "Turnover reports, exit interviews",
        timelineStart: "2025-01-01",
        timelineEnd: "2025-07-31",
        budget: 100000,
        frequency: "Monthly",
        comments: "Retention strategies working",
        progress: this.getProgressPercentage(),
      },
      {
        id: 28,
        indicator: "Recruitment Success Rate",
        department: "HR",
        objective: "Efficient recruitment of qualified candidates",
        target: "80%",
        baseline: "70%",
        status: "Achieved",
        activities: "Recruitment process optimization, employer branding",
        verification: "Recruitment metrics, hiring success rates",
        timelineStart: "2025-01-01",
        timelineEnd: "2025-07-31",
        budget: 120000,
        frequency: "Monthly",
        comments: "Recruitment process improved",
        progress: this.getProgressPercentage(),
      },
      {
        id: 29,
        indicator: "Performance Management Compliance",
        department: "HR",
        objective: "Ensure consistent performance management practices",
        target: "100%",
        baseline: "92%",
        status: "Ongoing",
        activities: "Performance review training, system implementation",
        verification: "Performance review completion rates",
        timelineStart: "2025-01-01",
        timelineEnd: "2025-07-31",
        budget: 40000,
        frequency: "Monthly",
        comments: "Performance management improving",
        progress: this.getProgressPercentage(),
      },
      {
        id: 30,
        indicator: "Workplace Diversity Index",
        department: "HR",
        objective: "Promote diversity and inclusion in the workplace",
        target: "80",
        baseline: "65",
        status: "Missed",
        activities: "Diversity programs, inclusive hiring practices",
        verification: "Diversity reports, inclusion metrics",
        timelineStart: "2025-01-01",
        timelineEnd: "2025-07-31",
        budget: 80000,
        frequency: "Custom",
        comments: "Diversity initiatives needed",
        progress: this.getProgressPercentage(),
      },
    ];

    return KPIs;
  }

  public componentDidMount(): void {
    const KPIs = this.fetchKPIs();

    // FIXED: Correctly call computeStats and update state
    const kpiStats = this.computeStats(KPIs);
    this.setState({ KPIs, kpiStats });
  }

  // FIXED: This function is now a pure function.
  // It takes data as input and returns a new computed value without side effects.
  // It no longer mutates the component's state directly.
  private computeStats(KPIs: IKPI[]): IKPIStats {
    const stats: IKPIStats = {
      KPIStatusCounts: {
        achievedCount: 0,
        ongoingCount: 0,
        missedCount: 0,
      },
    };

    KPIs.forEach((kpi) => {
      switch (kpi.status) {
        case "Achieved":
          stats.KPIStatusCounts.achievedCount++;
          break;
        case "Ongoing":
          stats.KPIStatusCounts.ongoingCount++;
          break;
        case "Missed":
          stats.KPIStatusCounts.missedCount++;
          break;
        default:
          break;
      }
    });

    return stats;
  }

  public render(): React.ReactElement<IGoilProps> {
    const { description, isDarkTheme, environmentMessage, hasTeamsContext } =
      this.props;

    // Destructure state for cleaner access in JSX
    const { KPIs, kpiStats } = this.state;

    return (
      <Router basename="/">
        <section
          className={`${styles.goil} ${hasTeamsContext ? styles.teams : ""}`}
        >
          <Header
            title={"Goil KPI Monitor"}
            subtitle={"Ghana Oil Company Limited"}
            userName={"Kamil Alhassan"}
            userRole={"Department Head"}
            onLogout={() => {
              console.log("Logout");
            }}
          />

          <NavBar />

          <main>
            <Routes>
              {/* IMPROVEMENT: Pass kpiStats to the Dashboard as it will likely need it */}
              <Route
                path="/"
                element={<Dashboard KPIs={KPIs} KPIStats={kpiStats} />}
              />
              <Route path="/kpi" element={<KPIManagement KPIs={KPIs} />} />
              <Route path="/notifications" element={<Notification />} />
              <Route path="/audit" element={<AuditTrail />} />
              <Route path="reports" element={<Reports />} />
              <Route path="*" element={<h2>Coming Soon</h2>} />
            </Routes>

            {/* Note: This welcome message will appear on ALL routes because it is outside the <Routes> component */}
            <div className={styles.welcome}>
              <img
                alt=""
                src={
                  isDarkTheme
                    ? require("../assets/welcome-dark.png")
                    : require("../assets/welcome-light.png")
                }
                className={styles.welcomeImage}
              />
              <h2>Welcome to GOIL KPI Management Tracker!</h2>
              <div>{environmentMessage}</div>
              <div>
                Web part property value: <strong>{escape(description)}</strong>
              </div>
            </div>
          </main>
        </section>
      </Router>
    );
  }
}
