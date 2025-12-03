/**
 * Report component renders the Reports & Analytics page.
 *
 * Features:
 * - Header with page title and description.
 * - Action buttons for Print, Export Excel, and Export PDF.
 * - Filters for generating reports:
 *   - Report Type
 *   - Department
 *   - Period
 * - Generates a report based on selected filters and displays it in a card.
 * - Shows generated report title and timestamp when available.
 *
 * @returns {TSX.Element} The report section with filter controls and generated report display.
 */

import * as React from "react";
import { Icon } from "@fluentui/react/lib/Icon";
import Card from "../../../../components/common/Card/Card";
import Button from "../../../../components/common/Button/Button";

const initialReportFilters = {
  reportType: "kpi_progress",
  department: "all",
  period: "2025",
};

interface IReportData {
  title: string;
  generatedAt: string;
}

const Report: React.FC = () => {
  const [reportFilters, setReportFilters] =
    React.useState(initialReportFilters);

  const [reportData, setReportData] = React.useState<IReportData | null>(null);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setReportFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleGenerateReport = () => {
    console.log("Generating report with filters:", reportFilters);

    setReportData({
      title: "KPI Progress Report for All Departments (2025)",
      generatedAt: new Date().toLocaleString(),
    });
  };

  return (
    <section>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h1>Reports & Analytics</h1>
          <p className="text-muted mb-3">
            Comprehensive reporting and data analytics
          </p>
        </div>

        <div className="d-flex gap-2">
          <Button variant="secondary">
            <Icon iconName="Print" />
            Print
          </Button>
          <Button variant="success">
            <Icon iconName="ExcelDocument" />
            Export Excel
          </Button>
          <Button variant="danger">
            <Icon iconName="PDF" />
            Export PDF
          </Button>
        </div>
      </div>

      <Card title="">
        <div className="filters">
          <div className="filter-group">
            <label htmlFor="reportType">Report Type</label>
            <select
              id="reportType"
              name="reportType"
              className="form-control"
              value={reportFilters.reportType}
              onChange={handleFilterChange}
            >
              <option value="kpi_progress">KPI Progress Report</option>
              <option value="performance_review">
                Performance Review Summary
              </option>
              <option value="user_activity">User Activity Log</option>
            </select>
          </div>
          <div className="filter-group">
            <label htmlFor="department">Department</label>
            <select
              id="department"
              name="department"
              className="form-control"
              value={reportFilters.department}
              onChange={handleFilterChange}
            >
              <option value="all">All Departments</option>
              <option value="finance">Finance</option>
              <option value="hr">Human Resources</option>
              <option value="it">IT</option>
              <option value="sales">Sales & Marketing</option>
            </select>
          </div>
          <div className="filter-group">
            <label htmlFor="period">Period</label>
            <select
              id="period"
              name="period"
              className="form-control"
              value={reportFilters.period}
              onChange={handleFilterChange}
            >
              <option value="2025">2025</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
            </select>
          </div>
          <div className="filter-group" style={{ alignSelf: "flex-end" }}>
            <Button onClick={handleGenerateReport} variant="primary">
              <Icon iconName="ReportDocument" />
              Generate Report
            </Button>
          </div>
        </div>
      </Card>

      {reportData && (
        <Card title="Generated Report">
          <div className="chart-container">
            <h3>{reportData.title}</h3>
            <p>Report generated on: {reportData.generatedAt}</p>
          </div>
        </Card>
      )}
    </section>
  );
};

export default Report;
