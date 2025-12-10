import * as React from "react";
import { Icon } from "@fluentui/react/lib/Icon";
import Card from "../../../components/common/Card/Card";
import Button from "../../../components/common/Button/Button";
import StatsCard from "../../../components/common/Card/StatsCard"; // Adjust import path as needed

const ApprovalQueue: React.FC = () => {
  return (
    <section>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h1>KPI Approval Queue</h1>
          <p className="text-muted">
            Review and approve KPIs submitted by department heads
          </p>
        </div>
        <div>
          <Button variant="secondary">
            <Icon iconName="Refresh" /> Refresh
          </Button>
        </div>
      </div>

      {/* Stats Cards using your Component */}
      <div
        className="stats-grid mb-3"
        style={{ gridTemplateColumns: "repeat(3, 1fr)" }}
      >
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

        <StatsCard
          label="APPROVED TODAY"
          value={0}
          icon="CheckboxComposite"
          iconColour="success"
          change={{
            type: "positive", // Makes text green
            description: "This session",
            icon: "CheckMark",
          }}
        />

        <StatsCard
          label="TOTAL APPROVED"
          value={0}
          icon="ClipboardList"
          iconColour="info"
          change={{
            type: "neutral",
            description: "All time",
            icon: "AllApps", // Or any 'list' icon
          }}
        />
      </div>

      {/* Pending KPI Approvals Section */}
      <div className="mb-3">
        <Card title="">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h3>Pending KPI Approvals</h3>
            <span
              className="statusTag ongoing"
              style={{
                backgroundColor: "#fff7ed",
                color: "#f97316",
                border: "1px solid #fdba74",
              }}
            >
              0 PENDING
            </span>
          </div>

          <div
            className="text-center p-5 text-muted"
            style={{
              backgroundColor: "#f9fafb",
              borderRadius: "8px",
              border: "1px dashed #e5e7eb",
            }}
          >
            <Icon
              iconName="InboxCheck"
              style={{
                fontSize: "2rem",
                marginBottom: "1rem",
                color: "#9ca3af",
              }}
            />
            <p>No pending approvals found.</p>
          </div>
        </Card>
      </div>

      {/* Recently Approved KPIs Section */}
      <div className="mb-3">
        <Card title="Recently Approved KPIs">
          <div
            className="text-center p-5 text-muted"
            style={{
              backgroundColor: "#f9fafb",
              borderRadius: "8px",
              border: "1px dashed #e5e7eb",
            }}
          >
            <p className="mb-0">No recently approved KPIs available.</p>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default ApprovalQueue;
