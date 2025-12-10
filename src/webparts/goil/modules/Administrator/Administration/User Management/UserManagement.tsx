/**
 * UserManagement component renders the User Management page.
 *
 * Features:
 * - Header with page title, description, and "Add User" button.
 * - Stats cards displaying key user metrics:
 *   - Total Users
 *   - Active Users
 *   - Administrators
 *   - Department Heads
 * - Lists all users with details:
 *   - Avatar, initials, name, and status
 *   - Contact information (email and phone)
 *   - Role and department
 *   - Actions menu for each user
 *
 * @returns {TSX.Element} The user management section with stats and user list.
 */

import * as React from "react";
import { Icon } from "@fluentui/react/lib/Icon";
import Card from "../../../../components/common/Card/Card";
import Button from "../../../../components/common/Button/Button";
import { IStatsData } from "../../../../../../shared/types/IStatsData";
import StatsCard from "../../../../components/common/Card/StatsCard";
import { useNavigate } from "react-router-dom";

const statsCards: IStatsData[] = [
  {
    label: "Total Users",
    icon: "group",
    value: 0,
    iconColour: "orange",
    change: {
      description: "",
      type: "neutral",
      icon: "",
    },
  },
  {
    label: "Active",
    icon: "ReminderPerson",
    value: 0,
    iconColour: "success",
    change: {
      description: "",
      type: "neutral",
      icon: "",
    },
  },
  {
    label: " Administrators",
    icon: "Signin",
    value: 6,
    iconColour: "danger",
    change: {
      description: "",
      type: "neutral",
      icon: "",
    },
  },
  {
    label: "Deparment Heads",
    icon: "PartyLeader",
    value: 0,
    iconColour: "info",
    change: {
      description: "",
      type: "neutral",
      icon: "",
    },
  },
];

const users = [
  {
    initials: "SJ",
    name: "Sarah Johnson",
    status: "Active",
    email: "sarah.johnson@company.com",
    phone: "+1 (555) 123-4567",
    role: "Administrator",
    department: "IT",
    avatarColor: "#e6a8de",
  },
  {
    initials: "MC",
    name: "Michael Chen",
    status: "Active",
    email: "michael.chen@company.com",
    phone: "+1 (555) 234-5678",
    role: "Department Head",
    department: "Engineering",
    avatarColor: "#82d6e7",
  },
  {
    initials: "ER",
    name: "Emily Rodriguez",
    status: "Active",
    email: "emily.rodriguez@company.com",
    phone: "+1 (555) 345-6789",
    role: "Team Member",
    department: "Design",
    avatarColor: "#f59a7a",
  },
  {
    initials: "JW",
    name: "James Wilson",
    status: "Active",
    email: "james.wilson@company.com",
    phone: "+1 (555) 456-7890",
    role: "Department Head",
    department: "Marketing",
    avatarColor: "#7de5b1",
  },
  {
    initials: "LA",
    name: "Lisa Anderson",
    status: "Active",
    email: "lisa.anderson@company.com",
    phone: "+1 (555) 567-8901",
    role: "Administrator",
    department: "HR",
    avatarColor: "#f7d57c",
  },
  {
    initials: "DK",
    name: "David Kim",
    status: "Inactive",
    email: "david.kim@company.com",
    phone: "+1 (555) 678-9012",
    role: "Team Member",
    department: "Sales",
    avatarColor: "#a9b1bd",
  },
];

const UserManagement: React.FC = () => {
  const navigate = useNavigate();
  return (
    <section>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h1>User Management </h1>
          <p className={`text-muted mb-3`}>
            Manage system users and their roles
          </p>
        </div>

        <Button onClick={() => navigate("/add-user")}>
          <Icon iconName="Add" />
          Add User
        </Button>
      </div>

      <div className="stats-grid">
        {statsCards.map((stat, index) => {
          return (
            <StatsCard
              key={index}
              icon={stat.icon}
              label={stat.label}
              value={stat.value}
              iconColour={stat.iconColour}
              change={stat.change}
            />
          );
        })}
      </div>

      <Card title="All Users">
        {/* 2. Map over the user data to render the list */}
        <div className="user-list">
          {users.map((user, index) => (
            <div className="user-item" key={index}>
              <div className="user-details">
                <div
                  className="user-avatar"
                  style={{ backgroundColor: user.avatarColor }}
                >
                  <span>{user.initials}</span>
                </div>
                <div className="user-info">
                  <div className="user-name-status">
                    <span className="user-name">{user.name}</span>
                    <span
                      className={`user-status status-${user.status.toLowerCase()}`}
                    >
                      {user.status}
                    </span>
                  </div>
                  <div className="user-contact">
                    <span>
                      <Icon iconName="Mail" /> {user.email}
                    </span>
                    <span>
                      <Icon iconName="Phone" /> {user.phone}
                    </span>
                  </div>
                </div>
              </div>

              <div className="user-role-actions">
                <div className="user-role">
                  <div>{user.role}</div>
                  <div className="department">{user.department}</div>
                </div>
                <button className="more-options-btn">
                  <Icon iconName="MoreVertical" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </section>
  );
};

export default UserManagement;
